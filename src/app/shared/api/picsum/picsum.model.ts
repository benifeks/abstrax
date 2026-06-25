export interface PicsumImage {
  id: string; // Picsum возвращает ID строкой в списке
  author: string; // Автор фотографии
  width: number; // Оригинальная ширина
  height: number; // Оригинальная высота
  url: string; // Ссылка на страницу автора
  download_url: string; // Прямая ссылка на скачивание картинки
}
