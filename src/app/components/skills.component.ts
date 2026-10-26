import { Component } from '@angular/core';
import { SKILLS } from '../data';
@Component({ selector: 'app-skills', standalone: true, template: `
<section id="skills"><div class="wrap"><div class="label">02 — Specification</div><h2>Skills &amp; Stack</h2>
<div class="skills">@for (s of skills; track s.t) {
<div class="skill" [class.ai]="s.ai"><h3>{{ s.t }}@if (s.ai) {<span class="tag">AI-ASSISTED</span>}</h3><p>{{ s.d }}</p></div>}</div></div></section>` })
export class SkillsComponent { skills = SKILLS as { t: string; d: string; ai?: boolean }[]; }
