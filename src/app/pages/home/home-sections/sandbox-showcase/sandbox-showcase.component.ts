import { Component, inject } from '@angular/core';
import { PicsumGalleryComponent } from '../../../../components/picsum-gallery/picsum-gallery.component';
import { OverlayService } from '../../../../shared/services/overlay/overlay.service';

@Component({
  selector: 'app-sandbox-showcase',
  standalone: true,
  imports: [PicsumGalleryComponent],
  templateUrl: './sandbox-showcase.component.html',
  styleUrl: './sandbox-showcase.component.scss',
})
export class SandboxShowcaseComponent {
  protected overlayService = inject(OverlayService);
}
