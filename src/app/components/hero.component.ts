import { Component } from '@angular/core';
@Component({ selector: 'app-hero', standalone: true, template: `
<header class="hero" id="top"><div class="wrap">
<div class="hero-grid">
<div><h1>Mukesh Kumar</h1>
<p class="role">Software Architect · Senior Full Stack Developer · <b>Angular</b> Developer, exploring <b>React</b> with AI-assisted development.</p>
<div class="links"><a href="mailto:mk_soni&#64;hotmail.com">mk_soni&#64;hotmail.com</a><a href="tel:+923342616900">+92 334 261 6900</a><a href="https://www.linkedin.com/in/mukesh-kumar-3211701b/" target="_blank" rel="noopener">LinkedIn ↗</a></div></div>
<figure class="portrait"><img src="assets/profile.jpg" alt="Portrait of Mukesh Kumar"></figure>
</div>
<div class="stats"><div><b>19+ Years</b>.NET &amp; web architecture</div><div><b>Karachi, PK</b>Available remote</div><div><b>MCTS</b>Microsoft certified</div><div><b>Angular .NET</b>Core disciplines</div></div>
</div></header>
<section id="profile"><div class="wrap"><div class="label">01 — Profile</div><h2>Summary</h2>
<p class="lead">Microsoft Certified Technology Specialist with over 16 years of experience architecting and delivering high-performance, scalable web applications and business platforms using .NET, Angular and cloud-ready solutions. A proven leader in cross-functional projects, performance optimization and data-driven solutions, now extending into React with AI-assisted development.</p></div></section>` })
export class HeroComponent {}
