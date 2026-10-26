import { Component } from '@angular/core';
@Component({ selector: 'app-project', standalone: true, template: `
<section id="project"><div class="wrap"><div class="label">04 — Case Study</div><h2>Personal Project</h2>
<div class="case"><h3>Support Ticket Management System</h3><div class="meta">ElectroPi technical assessment · 2026 · 2-day take-home build</div>
<div class="cols"><ul><li>Full-stack ticketing platform built in two days, applying 16+ years of .NET and 4 years of Angular experience.</li><li>JWT authentication with Admin / Support Agent / Customer roles and server-side data isolation.</li><li>Validated ticket lifecycle, comment and activity timelines, work-time logging and a charted dashboard.</li></ul>
<ul><li>Clean Architecture, DTO-based API contracts, centralized exception handling, structured logging.</li><li>Used AI-assisted tooling to move faster, while owning architecture, security design and code review.</li><li>Backend unit and integration tests, data-isolation tests, Angular unit tests.</li></ul></div>
<div class="pills"><span>ASP.NET Core 10 Web API</span><span>EF Core</span><span>SQL Server</span><span>Angular 17</span><span>JWT</span><span>xUnit</span><span>Jasmine/Karma</span><span class="ai">AI-assisted</span></div></div></div></section>` })
export class ProjectComponent {}
