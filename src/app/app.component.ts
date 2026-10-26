import { Component, ViewEncapsulation } from '@angular/core';
import { GLOBAL_CSS } from './app.styles';
import { NavComponent } from './components/nav.component';
import { HeroComponent } from './components/hero.component';
import { SkillsComponent } from './components/skills.component';
import { ExperienceComponent } from './components/experience.component';
import { ProjectComponent } from './components/project.component';
import { CredentialsComponent } from './components/credentials.component';
import { FooterComponent } from './components/footer.component';
import { VisitorBadgeComponent } from './components/visitor-badge.component';

@Component({
  selector: 'app-root', standalone: true, encapsulation: ViewEncapsulation.None, styles: [GLOBAL_CSS],
  imports: [NavComponent, HeroComponent, SkillsComponent, ExperienceComponent, ProjectComponent, CredentialsComponent, FooterComponent, VisitorBadgeComponent],
  template: `<app-nav/><app-hero/><main><app-skills/><app-experience/><app-project/><app-credentials/></main><app-footer/><app-visitor-badge/>`,
})
export class AppComponent {}
