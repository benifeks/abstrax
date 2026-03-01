import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-google-auth-button',
  imports: [],
  templateUrl: './google-auth-button.component.html',
  styleUrl: './google-auth-button.component.scss',
})
export class GoogleAuthButtonComponent {
  protected authService = inject(AuthService);

  protected async onLogin(): Promise<void> {
    await this.authService.loginWithGoogle();
  }

  protected async onLogout(): Promise<void> {
    await this.authService.logout();
  }
}
