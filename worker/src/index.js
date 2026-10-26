const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const total = async env => (await env.DB.prepare('SELECT COUNT(*) n FROM visits').first()).n;
const clip = (s, n) => String(s ?? '').slice(0, n);

function device(u = '') {
  const b = /Edg\//.test(u) ? 'Edge' : /OPR\//.test(u) ? 'Opera' : /Chrome\//.test(u) ? 'Chrome' : /Firefox\//.test(u) ? 'Firefox' : /Safari\//.test(u) ? 'Safari' : 'Unknown browser';
  const o = /Windows/.test(u) ? 'Windows' : /Android/.test(u) ? 'Android' : /iPhone|iPad/.test(u) ? 'iOS' : /Mac OS/.test(u) ? 'macOS' : /Linux/.test(u) ? 'Linux' : 'Unknown OS';
  const k = /bot|crawl|spider|preview|curl|wget|headless/i.test(u) ? 'BOT' : /Mobi/.test(u) ? 'Mobile' : 'Desktop';
  return `${b} · ${o} · ${k}`;
}

export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    const allowed = [env.ALLOWED_ORIGIN, 'http://localhost:4200'];
    const origin = req.headers.get('Origin');
    const cors = { 'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : env.ALLOWED_ORIGIN, 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' };
    const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

    if (u.pathname === '/api/count') return json({ total: await total(env) });

    if (u.pathname === '/api/hit' && req.method === 'POST') {
      if (!allowed.includes(origin)) return json({ error: 'forbidden' }, 403);
      const b = await req.json().catch(() => ({}));
      const c = req.cf || {}, h = req.headers, ua = h.get('User-Agent') || '';
      const row = [new Date().toISOString(), clip(b.vid, 64), h.get('CF-Connecting-IP'),
        c.country, c.region, c.regionCode, c.city, c.postalCode, c.metroCode, c.continent, c.isEUCountry,
        c.timezone, c.latitude, c.longitude, c.asn, c.asOrganization, c.colo, c.httpProtocol, c.tlsVersion,
        clip(ua, 300), device(ua), clip(b.lang || h.get('Accept-Language'), 40), clip(b.langs, 120),
        clip(h.get('Sec-CH-UA-Platform'), 30).replace(/"/g, ''), clip(b.screen, 30), clip(b.btz, 60), clip(b.referrer, 300), clip(b.path, 100)]
        .map(v => (v === undefined || v === null || v === '') ? null : String(v));
      await env.DB.prepare(`INSERT INTO visits(ts,vid,ip,country,region,region_code,city,postal,metro,continent,eu,tz,lat,lon,asn,org,colo,proto,tls,ua,device,lang,langs,plat,screen,btz,ref,path) VALUES(${row.map(() => '?').join(',')})`).bind(...row).run();
      return json({ total: await total(env) });
    }

    if (u.pathname === '/admin') return admin(req, env);
    return new Response('Not found', { status: 404 });
  },
};

async function admin(req, env) {
  const deny = () => new Response('Authentication required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Visitors"' } });
  let pw = '';
  try { pw = atob((req.headers.get('Authorization') || '').slice(6)).split(':').slice(1).join(':'); } catch {}
  const expected = env.ADMIN_PASSWORD || '';
  let diff = pw.length ^ expected.length;
  for (let i = 0; i < expected.length; i++) diff |= (pw.charCodeAt(i) || 0) ^ expected.charCodeAt(i);
  if (!expected || diff !== 0) return deny();

  const q = async sql => (await env.DB.prepare(sql).all()).results;
  const one = async sql => (await env.DB.prepare(sql).first()).n;
  const rows = await q(`SELECT v.*, (SELECT COUNT(*) FROM visits x WHERE x.vid=v.vid AND v.vid IS NOT NULL) vc FROM visits v ORDER BY v.id DESC LIMIT 500`);
  const [uv, uip, today] = [await one('SELECT COUNT(DISTINCT vid) n FROM visits'), await one('SELECT COUNT(DISTINCT ip) n FROM visits'), await one(`SELECT COUNT(*) n FROM visits WHERE ts >= date('now')`)];
  const list = (arr, k) => arr.map(t => `${esc(t[k] || 'Unknown')} <b>${t.n}</b>`).join(' · ') || '—';
  const tc = await q('SELECT country, COUNT(*) n FROM visits GROUP BY country ORDER BY n DESC LIMIT 10');
  const tci = await q(`SELECT city||', '||COALESCE(country,'') city, COUNT(*) n FROM visits WHERE city IS NOT NULL GROUP BY city, country ORDER BY n DESC LIMIT 10`);
  const tr = await q(`SELECT ref, COUNT(*) n FROM visits WHERE ref IS NOT NULL GROUP BY ref ORDER BY n DESC LIMIT 8`);
  const td = await q('SELECT device, COUNT(*) n FROM visits GROUP BY device ORDER BY n DESC LIMIT 8');

  const tr_ = rows.map(r => `<tr>
<td>${esc(r.ts?.replace('T', ' ').slice(0, 19))}</td>
<td><a href="https://ipinfo.io/${encodeURIComponent(r.ip || '')}" target=_blank rel=noopener>${esc(r.ip)}</a></td>
<td>${esc(r.country)} (${esc(r.continent)}${r.eu === '1' ? ', EU' : ''})</td><td>${esc(r.region)} ${esc(r.region_code)}</td><td>${esc(r.city)}</td><td>${esc(r.postal)}</td>
<td>${r.lat ? `<a href="https://www.google.com/maps?q=${encodeURIComponent(r.lat + ',' + r.lon)}" target=_blank rel=noopener>${esc(r.lat)}, ${esc(r.lon)}</a>` : ''}</td>
<td>${esc(r.tz)}<br><small>browser: ${esc(r.btz)}</small></td>
<td>${esc(r.org)}<br><small>AS${esc(r.asn)} · ${esc(r.colo)}</small></td>
<td>${esc(r.device)}<br><small>${esc(r.plat)} · ${esc(r.screen)}</small></td>
<td>${esc(r.lang)}<br><small>${esc(r.langs)}</small></td>
<td>${r.vc > 1 ? `<b>Returning</b> (${r.vc} visits)` : 'New'}<br><small>${esc((r.vid || '').slice(0, 8))}</small></td>
<td>${esc(r.ref)}</td><td><small>${esc(r.proto)} ${esc(r.tls)}</small></td></tr>`).join('');

  const html = `<!doctype html><meta charset=utf-8><meta name=robots content="noindex,nofollow"><meta name=viewport content="width=device-width,initial-scale=1"><title>Visitors</title>
<style>body{font:13px system-ui;margin:18px;background:#f6f1e9;color:#111}h1{font:700 26px Georgia,serif;margin:0 0 12px}
.k{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px}.k div{background:#111;color:#f6f1e9;padding:10px 16px}.k b{display:block;font:700 28px Georgia,serif;color:#e8501c}
p{margin:6px 0}table{border-collapse:collapse;background:#fff}td,th{border:1px solid #ccc;padding:5px 8px;text-align:left;vertical-align:top}th{background:#111;color:#fff;position:sticky;top:0}small{color:#666}a{color:#c2410c}</style>
<h1>Visitor intelligence</h1>
<div class=k><div><b>${await total(env)}</b>total visits</div><div><b>${today}</b>today (UTC)</div><div><b>${uv}</b>unique browsers</div><div><b>${uip}</b>unique IPs</div></div>
<p><b>Countries:</b> ${list(tc, 'country')}</p><p><b>Cities:</b> ${list(tci, 'city')}</p><p><b>Devices:</b> ${list(td, 'device')}</p><p><b>Referrers:</b> ${list(tr, 'ref')}</p>
<p><small>Location is approximate (derived from IP). Click an IP for owner/ISP details, coordinates for a map. Latest 500 visits.</small></p>
<div style="overflow:auto"><table><tr><th>Time (UTC)<th>IP<th>Country<th>Region<th>City<th>Postal<th>Map<th>Timezone<th>Network / ISP<th>Device<th>Language<th>Visitor<th>Referrer<th>Conn</tr>${tr_}</table></div>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
}
