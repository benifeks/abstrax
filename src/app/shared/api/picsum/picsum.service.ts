import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PicsumImage } from './picsum.model';

@Injectable({ providedIn: 'root' })
export class PicsumService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://picsum.photos';

  // --- Приватные сигналы (управление состоянием внутри сервиса) ---
  private _currentId = signal<number | null>(null);
  private _isLoading = signal<boolean>(false);
  private _currentBatch = signal<PicsumImage[] | null>(null);
  private _error = signal<string | null>(null);

  // --- Публичные Readonly сигналы (для безопасного чтения в компонентах) ---
  public currentId = this._currentId.asReadonly();
  public isLoading = this._isLoading.asReadonly();
  public currentBatch = this._currentBatch.asReadonly();
  public error = this._error.asReadonly();

  /**
   * 1. Быстрое получение случайной ссылки (слепой метод для фонов)
   */
  getRandom(width = 800, height = 600): string {
    return `${this.baseUrl}/${width}/${height}?random=${Date.now()}`;
  }

  /**
   * 2. Умное получение случайной картинки с перехватом её ID через RxJS
   */
  getRandomWithId(width = 800, height = 600): Observable<string> {
    this._isLoading.set(true);
    this._error.set(null);

    const url = `${this.baseUrl}/${width}/${height}`;

    // observe: 'response' позволяет прочитать финальный url после редиректов
    return this.http
      .get(url, { observe: 'response', responseType: 'blob' })
      .pipe(
        tap((response) => {
          const finalUrl = response.url || '';
          // Вытаскиваем ID регулярным выражением из структуры /id/123/
          const match = finalUrl.match(/\/id\/(\d+)\//);

          if (match && match[1]) {
            this._currentId.set(parseInt(match[1], 10));
          }
          this._isLoading.set(false);
        }),
        map((response) => response.url || url),
        catchError((err) => {
          this._error.set('Не удалось загрузить абстрактную картинку');
          this._isLoading.set(false);
          // Возвращаем фолбэк-ссылку, чтобы UI не падал
          return of(this.getRandom(width, height));
        }),
      );
  }

  /**
   * 3. Получение картинки по конкретному ID (для избранного или слайдера)
   */
  getById(id: number, width = 800, height = 600): string {
    return `${this.baseUrl}/id/${id}/${width}/${height}`;
  }

  /**
   * 4. Получение пачки (массива) картинок для карточных игр или таблиц
   */
  getBatch(page = 1, limit = 30): Observable<PicsumImage[]> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.http
      .get<PicsumImage[]>(`${this.baseUrl}/v2/list?page=${page}&limit=${limit}`)
      .pipe(
        tap((batch) => {
          this._currentBatch.set(batch);
          this._isLoading.set(false);
        }),
        catchError((err) => {
          this._error.set('Не удалось загрузить список изображений');
          this._isLoading.set(false);
          return of([]);
        }),
      );
  }

  /**
   * 5. Получение картинки со спецэффектами (размытие или ч/б)
   */
  getAdvanced(
    id: number,
    width = 800,
    height = 600,
    options: { blur?: number; grayscale?: boolean } = {},
  ): string {
    let url = `${this.baseUrl}/id/${id}/${width}/${height}?`;
    const params: string[] = [];

    if (options.grayscale) params.push('grayscale');
    if (options.blur) params.push(`blur=${options.blur}`);

    return url + params.join('&');
  }
}
