import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { GoogleAuthButtonComponent } from '../google-auth-button/google-auth-button.component';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [GoogleAuthButtonComponent],
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.scss',
})
export class AuthStatusComponent {
  authService = inject(AuthService);
}
