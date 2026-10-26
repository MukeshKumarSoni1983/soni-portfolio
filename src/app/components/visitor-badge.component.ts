import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { VisitorService } from '../visitor.service';
@Component({ selector: 'app-visitor-badge', standalone: true, imports: [DecimalPipe], template: `
<a class="badge" href="#contact" style="text-decoration:none" (click)="go($event)"><i></i>{{ v.display() === null ? '…' : (v.display() | number) }} visitors</a>` })
export class VisitorBadgeComponent { v = inject(VisitorService);
  go(e: Event) { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }
}
