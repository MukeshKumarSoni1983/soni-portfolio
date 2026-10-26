import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './config';

@Injectable({ providedIn: 'root' })
export class VisitorService {
  private http = inject(HttpClient);
  /** Number shown on screen (animates up to the real total). null = not loaded yet. */
  readonly display = signal<number | null>(null);

  constructor() {
    if (API_URL.includes('YOUR-SUBDOMAIN')) {
      console.warn('[visitors] Set API_URL in src/app/config.ts to your deployed Worker URL.');
      return;
    }
    let counted = false;
    try { counted = !!sessionStorage.getItem('hit'); } catch {}
    const req = counted
      ? this.http.get<{ total: number }>(`${API_URL}/api/count`)
      : this.http.post<{ total: number }>(`${API_URL}/api/hit`, this.info());
    req.subscribe({
      next: r => { try { sessionStorage.setItem('hit', '1'); } catch {} this.animate(r.total); },
      error: e => console.warn('[visitors] Worker request failed. Check API_URL and ALLOWED_ORIGIN.', e),
    });
  }

  /** Extra, non-sensitive browser details sent with each visit. */
  private info() {
    let vid = '';
    try { vid = localStorage.getItem('vid') || crypto.randomUUID(); localStorage.setItem('vid', vid); } catch {}
    return {
      vid, path: location.pathname, referrer: document.referrer,
      lang: navigator.language, langs: (navigator.languages || []).join(','),
      screen: `${screen.width}x${screen.height}@${devicePixelRatio}`,
      btz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  private animate(total: number) {
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1400);
      this.display.set(Math.round(total * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
