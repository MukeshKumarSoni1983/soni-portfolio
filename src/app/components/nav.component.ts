import { Component } from '@angular/core';
@Component({ selector: 'app-nav', standalone: true, template: `
<nav class="nav"><div class="wrap"><a class="brand" href="#top" (click)="go($event,'top')">Mukesh Kumar</a>
<ul>
<li><a href="#profile" (click)="go($event,'profile')">Profile</a></li>
<li><a href="#skills" (click)="go($event,'skills')">Skills</a></li>
<li><a href="#experience" (click)="go($event,'experience')">Experience</a></li>
<li><a href="#project" (click)="go($event,'project')">Project</a></li>
<li><a href="#credentials" (click)="go($event,'credentials')">Credentials</a></li>
<li><a href="#contact" (click)="go($event,'contact')">Contact</a></li></ul></div></nav>` })
export class NavComponent {
  go(e: Event, id: string) { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
