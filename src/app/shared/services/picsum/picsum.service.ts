import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PicsumService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://picsum.photos';

  /**
   * 1. Получение случайной картинки с перехватом её ID через заголовки/редирект RxJS
   */
  public getRandomWithId(
    width = 800,
    height = 600,
  ): Observable<{ id: number; url: string }> {
    const url = `${this.baseUrl}/${width}/${height}`;

    return this.http
      .get(url, { observe: 'response', responseType: 'blob' })
      .pipe(
        map((response) => {
          const finalUrl = response.url || '';
          const match = finalUrl.match(/\/id\/(\d+)\//);
          const id = match && match[1] ? parseInt(match[1], 10) : 0;
          return { id, url: finalUrl || url };
        }),
        catchError(() => {
          // Фолбэк: если API штормит, отдаем фиксированный красивый ID (например, 10 - туманный лес)
          return of({
            id: 10,
            url: `${this.baseUrl}/id/10/${width}/${height}`,
          });
        }),
      );
  }

  /**
   * 2. Получение ссылки на картинку по конкретному ID (для восстановления из Firebase)
   */
  public getById(id: number, width = 800, height = 600): string {
    return `${this.baseUrl}/id/${id}/${width}/${height}`;
  }
}
