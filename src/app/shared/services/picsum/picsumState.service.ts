import { Injectable, inject, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { PicsumService } from './picsum.service';

@Injectable({ providedIn: 'root' })
export class PicsumStateService {
  private readonly picsumService = inject(PicsumService);
  private readonly defaultStartId = 230;

  // --- Приватное реактивное состояние одной абстракции ---
  private readonly _currentId = signal<number | null>(null);
  private readonly _currentUrl = signal<string | null>(null);
  private readonly _isLoading = signal<boolean>(false);

  // --- Публичный Readonly интерфейс ---
  public readonly currentId = this._currentId.asReadonly();
  public readonly currentUrl = this._currentUrl.asReadonly();
  public readonly isLoading = this._isLoading.asReadonly();

  constructor() {
    this.initDefaultVisual(this.defaultStartId, 500, 375);
  }

  /**
   * Инициализация приложения красивым дефолтным кадром
   */
  private initDefaultVisual(id: number, width: number, height: number): void {
    this._isLoading.set(true);
    const url = this.picsumService.getById(id, width, height);
    this._currentId.set(id);
    this._currentUrl.set(url);
    this._isLoading.set(false);
  }

  /**
   * Триггер генерации случайного визуала
   */
  public generateRandomVisual(width: number, height: number): void {
    this._isLoading.set(true);

    this.picsumService
      .getRandomWithId(width, height)
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe(({ id, url }) => {
        this._currentId.set(id);
        this._currentUrl.set(url);
      });
  }

  /**
   * Полный сброс визуала
   */
  public clear(): void {
    this._currentId.set(null);
    this._currentUrl.set(null);
  }
}
