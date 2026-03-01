import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PicsumService {
  private base = 'https://picsum.photos';

  /**
   * Возвращает случайную картинку нужного размера
   * @param width ширина в px
   * @param height высота в px
   */
  getRandom(width = 800, height = 600): string {
    // ?random=Date.now() чтобы браузер не кэшировал одну и ту же картинку
    return `${this.base}/${width}/${height}?random=${Date.now()}`;
  }

  /**
   * Возвращает картинку по ID
   * @param id идентификатор картинки
   * @param width ширина
   * @param height высота
   */
  getById(id: number, width = 800, height = 600): string {
    return `${this.base}/id/${id}/${width}/${height}`;
  }
}
