import { Component, inject, signal } from '@angular/core';
import { PicsumService } from '../../../shared/api/picsum.service';

@Component({
  selector: 'app-random-image',
  imports: [],
  templateUrl: './random-image.component.html',
  styleUrl: './random-image.component.scss',
})
export class RandomImageComponent {
  private picsum = inject(PicsumService);

  // Сигнал для текущей картинки
  public imageUrl = signal<string | null>(null);

  // Обновление картинки
  public refresh() {
    const url = this.picsum.getRandom(600, 400);
    this.imageUrl.set(url);
  }
}
