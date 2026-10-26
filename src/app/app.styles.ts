// Global theme, bundled with the app so it always loads, whatever the hosting path.
export const GLOBAL_CSS = `
:root{--bg:#f6f1e9;--fg:#111;--mu:#55524c;--ac:#e8501c;--fh:Fraunces,Georgia,serif;--fb:Inter,system-ui,sans-serif}
*{box-sizing:border-box;margin:0}html{scroll-behavior:smooth;scroll-padding-top:70px}
body{background:var(--bg);color:var(--fg);font:16px/1.6 var(--fb)}a{color:inherit}
.wrap{max-width:1100px;margin:0 auto;padding:0 22px}
.nav{position:sticky;top:0;z-index:20;background:var(--bg);border-bottom:2px solid var(--fg)}
.nav .wrap{display:flex;justify-content:space-between;align-items:center;height:56px}
.brand{font:700 18px var(--fh);text-decoration:none}.nav ul{display:flex;gap:22px;list-style:none;padding:0;font-size:14px;font-weight:500}
.nav a{text-decoration:none}.nav a:hover{color:var(--ac)}
.hero{padding:44px 0 56px}
.hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center}
.portrait{position:relative;margin:0 14px 14px 0}
.portrait::before{content:"";position:absolute;inset:14px -14px -14px 14px;background:var(--ac)}
.portrait img{position:relative;display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border:2px solid var(--fg)}
.hero h1{font:700 clamp(54px,8.5vw,112px)/.92 var(--fh);letter-spacing:-.035em;margin:0 0 18px}
.role{font-size:19px;color:var(--mu);max-width:760px}.role b{color:var(--ac)}
.links{display:flex;gap:20px;flex-wrap:wrap;margin:18px 0;font-weight:600}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:22px}
.stats div{border-bottom:2px solid var(--fg);padding-bottom:10px;font-size:13px;color:var(--mu)}.stats b{display:block;font:700 24px var(--fh);color:var(--fg)}
section{border-top:2px solid var(--fg);padding:44px 0}
.label{font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:var(--ac)}
h2{font:700 clamp(32px,5vw,48px)/1.1 var(--fh);margin:6px 0 24px;letter-spacing:-.02em}
.lead{font:500 21px/1.55 var(--fh);max-width:860px}
.skills{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
.skill{border-bottom:2px solid var(--fg);padding-bottom:16px}.skill h3{font:700 20px var(--fh);margin-bottom:6px}.skill p{color:var(--mu);font-size:15px}
.skill.ai{border-color:var(--ac)}.tag{display:inline-block;background:var(--ac);color:#fff;font:700 11px var(--fb);letter-spacing:.08em;padding:2px 8px;margin-left:8px;vertical-align:middle}
.job{display:grid;grid-template-columns:170px 1fr;gap:24px;padding:22px 0;border-bottom:1px solid var(--fg)}
.job small{color:var(--mu);font-weight:600}.job h3{font:700 22px var(--fh)}.co{color:var(--ac);font-weight:600;margin-bottom:8px}
.job ul{padding-left:18px;color:var(--mu)}.job li{margin-bottom:6px}summary{cursor:pointer;font-weight:600;margin-top:8px}
.case{background:var(--fg);color:var(--bg);padding:32px}.case h3{font:700 28px var(--fh)}.case .meta{opacity:.7;margin-bottom:14px}
.case .cols{display:grid;grid-template-columns:1fr 1fr;gap:10px 36px}.case ul{padding-left:18px}.case li{margin-bottom:8px}
.pills{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}.pills span{border:1px solid var(--bg);padding:3px 10px;font-size:13px}.pills .ai{background:var(--ac);border-color:var(--ac)}
.creds{display:grid;grid-template-columns:1fr 1fr;gap:30px}.creds h3{font:700 20px var(--fh);border-bottom:2px solid var(--fg);padding-bottom:6px;margin-bottom:12px}.creds p{margin-bottom:10px}.creds small{color:var(--mu);display:block}
footer{background:var(--fg);color:var(--bg);padding:56px 0 32px}footer h2{max-width:800px}footer .links a{color:var(--bg)}
.vc{border-top:1px solid #555;margin-top:30px;padding-top:26px;text-align:center}
.vc .lab{letter-spacing:.24em;text-transform:uppercase;font-weight:700;font-size:13px;color:#bbb}
.vc .num{font:700 clamp(72px,19vw,200px)/1 var(--fh);color:var(--ac);font-variant-numeric:tabular-nums;letter-spacing:-.04em}
.fb{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:13px;opacity:.7;margin-top:20px}
.badge{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:30;background:var(--ac);color:#fff;padding:9px 16px;font-weight:700;box-shadow:4px 4px 0 var(--fg);border:2px solid var(--fg)}
.badge i{display:inline-block;width:9px;height:9px;border-radius:50%;background:#fff;margin-right:8px;animation:p 1.4s infinite}@keyframes p{50%{opacity:.25}}
@media(max-width:860px){.hero-grid{grid-template-columns:1fr;gap:34px}.portrait{order:-1;max-width:420px}}
@media(max-width:760px){.nav ul{display:none}.stats{grid-template-columns:1fr 1fr}.skills,.creds,.case .cols{grid-template-columns:1fr}.job{grid-template-columns:1fr;gap:4px}}
app-root,app-hero,app-skills,app-experience,app-project,app-credentials,app-footer{display:block}app-nav{display:contents}
`;
