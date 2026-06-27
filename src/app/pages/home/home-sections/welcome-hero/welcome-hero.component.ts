import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../shared/firebase/auth.service';
import { OverlayService } from '../../../../shared/services/overlay/overlay.service';

@Component({
  selector: 'app-welcome-hero',
  standalone: true,
  imports: [],
  templateUrl: './welcome-hero.component.html',
  styleUrl: './welcome-hero.component.scss',
})
export class WelcomeHeroComponent {
  protected overlayService = inject(OverlayService);
  protected authService = inject(AuthService);
}
