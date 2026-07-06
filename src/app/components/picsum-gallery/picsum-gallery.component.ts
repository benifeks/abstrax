import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PicsumStateService } from '../../shared/services/picsum/picsumState.service';

@Component({
  selector: 'app-picsum-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './picsum-gallery.component.html',
  styleUrl: './picsum-gallery.component.scss',
})
export class PicsumGalleryComponent {
  // Внедряем наш синглтон-стейт. Компонент просто "стримит" сигналы на экран
  protected readonly state = inject(PicsumStateService);
}
