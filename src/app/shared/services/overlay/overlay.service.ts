import { effect, Injectable, signal } from '@angular/core';

// Четкий тип для модулей, которые могут открываться в оверлее
export type OverlayModule = 'picsum' | 'auth' | 'add' | null;

@Injectable({
  providedIn: 'root', // Синглтон, доступный во всем приложении
})
export class OverlayService {
  // Наш реактивный пульт управления оверлеями
  public activeOverlay = signal<OverlayModule>(null);

  constructor() {
    // Автоматический контроль скролла страницы в зависимости от состояния оверлея
    effect(() => {
      const current = this.activeOverlay();

      if (typeof document !== 'undefined') {
        // Защита для безопасной сборки на Vercel (SSR)
        if (current !== null) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });
  }

  /**
   * Открыть конкретный модуль в оверлее
   */
  public open(moduleName: OverlayModule): void {
    this.activeOverlay.set(moduleName);
  }

  /**
   * Закрыть текущий оверлей
   */
  public close(): void {
    this.activeOverlay.set(null);
  }
}
