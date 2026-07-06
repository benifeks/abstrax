import { Component } from '@angular/core';
import { AddDocumentComponent } from '../../shared/firebase/add-document/add-document.component';
import { AuthStatusComponent } from '../../shared/firebase/auth-status/auth-status.component';

import { SandboxShowcaseComponent } from './home-sections/sandbox-showcase/sandbox-showcase.component';
import { WelcomeHeroComponent } from './home-sections/welcome-hero/welcome-hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AddDocumentComponent,
    AuthStatusComponent,
    WelcomeHeroComponent,
    SandboxShowcaseComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
