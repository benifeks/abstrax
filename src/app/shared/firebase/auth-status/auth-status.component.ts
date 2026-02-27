import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [],
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.scss',
})
export class AuthStatusComponent {
  authService = inject(AuthService);
}
