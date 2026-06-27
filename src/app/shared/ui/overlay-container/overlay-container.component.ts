import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PicsumGalleryComponent } from '../../../components/picsum-gallery/picsum-gallery.component';
import { AuthStatusComponent } from '../../firebase/auth-status/auth-status.component';
import { OverlayService } from '../../services/overlay/overlay.service';

@Component({
  selector: 'app-overlay-container',
  imports: [CommonModule, PicsumGalleryComponent, AuthStatusComponent],
  templateUrl: './overlay-container.component.html',
  styleUrl: './overlay-container.component.scss',
})
export class OverlayContainerComponent {
  // Внедряем наш пульт управления оверлеями
  protected overlayService = inject(OverlayService);

  /**
   * Закрыть оверлей при клике на крестик или бэкдроп
   */
  protected onClose(): void {
    this.overlayService.close();
  }
}
