import { Component } from '@angular/core';
import { JOBS } from '../data';
@Component({ selector: 'app-experience', standalone: true, template: `
<section id="experience"><div class="wrap"><div class="label">03 — Record</div><h2>Experience</h2>
@for (j of jobs; track j.dates) {<div class="job"><small>{{ j.dates }}</small><div><h3>{{ j.role }}</h3><div class="co">{{ j.co }} · Karachi, Pakistan</div>
<ul>@for (p of j.pts; track p) {<li>{{ p }}</li>}</ul>
@if (j.more) {<details><summary>Show full record ({{ j.more.length }} more)</summary><ul>@for (p of j.more; track p) {<li>{{ p }}</li>}</ul></details>}</div></div>}
</div></section>` })
export class ExperienceComponent { jobs = JOBS as { role: string; co: string; dates: string; pts: string[]; more?: string[] }[]; }
