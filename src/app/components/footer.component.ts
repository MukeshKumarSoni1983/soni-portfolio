import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { VisitorService } from '../visitor.service';
@Component({ selector: 'app-footer', standalone: true, imports: [DecimalPipe], template: `
<footer id="contact"><div class="wrap"><div class="label">06 — Contact</div>
<h2>Let’s build something reliable, refined, and worth architecting properly.</h2>
<div class="links"><a href="mailto:mk_soni&#64;hotmail.com">mk_soni&#64;hotmail.com</a><a href="tel:+923342616900">+92 334 261 6900</a><a href="https://www.linkedin.com/in/mukesh-kumar-3211701b/" target="_blank" rel="noopener">LinkedIn ↗</a></div>
<div class="vc"><div class="lab">Total visitors</div><div class="num">{{ v.display() === null ? '—' : (v.display() | number) }}</div></div>
<div class="fb"><span>© 2026 Mukesh Kumar. Karachi, Pakistan. · build 3</span><span>Visit analytics (IP-based, approximate location) are recorded.</span></div></div></footer>` })
export class FooterComponent { v = inject(VisitorService); }
