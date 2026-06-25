import { Component, inject, OnInit, signal } from '@angular/core';
import { take } from 'rxjs/operators';
import { PicsumService } from '../../shared/api/picsum/picsum.service';

@Component({
  selector: 'app-picsum-test',
  standalone: true,
  imports: [],
  templateUrl: './picsum-test.component.html',
  styleUrl: './picsum-test.component.scss',
})
export class PicsumTestComponent implements OnInit {
  // 1. Внедряем наш реактивный сервис по конвенции inject()
  protected picsumService = inject(PicsumService);

  // 2. Локальный сигнал для хранения URL картинки, отображаемой в данный момент
  public currentImageUrl = signal<string | null>(null);

  ngOnInit(): void {
    // Загружаем первую абстракцию при старте страницы
    this.loadNextImage();
  }

  /**
   * Запрашивает у сервиса новую картинку с перехватом ID
   */
  public loadNextImage(): void {
    this.picsumService
      .getRandomWithId(1024, 768)
      .pipe(take(1)) // Пакт чистоты: взяли 1 значение и поток закрылся (никаких утечек!)
      .subscribe({
        next: (url) => {
          this.currentImageUrl.set(url); // Записываем URL в сигнал
        },
        error: (err) => {
          console.error('Ошибка в нашей песочнице:', err);
        },
      });
  }
}
