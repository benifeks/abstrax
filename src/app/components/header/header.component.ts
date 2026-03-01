import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { GoogleAuthButtonComponent } from '../../shared/firebase/google-auth-button/google-auth-button.component';
import { ThemeToggleComponent } from '../../shared/ui/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeToggleComponent, GoogleAuthButtonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public spritePath = 'assets/images/svg/social-icons/symbol-defs.svg#icon-';
}
