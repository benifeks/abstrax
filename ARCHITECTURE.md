# Abstrax - Архитектура проекта

## Обзор
Angular 19 приложение с интеграцией Firebase (Auth + Firestore) и системой тем.

## Технологический стек
- **Framework**: Angular 19.2.0 (Standalone Components)
- **Backend**: Firebase (Authentication, Firestore)
- **Language**: TypeScript 5.7.2
- **Styling**: SCSS
- **Build**: Angular CLI 19.2.21

## Структура проекта

```
abstrax/
├── src/
│   ├── app/
│   │   ├── components/          # UI компоненты макета
│   │   │   ├── header/         # Шапка сайта
│   │   │   └── footer/         # Подвал сайта
│   │   ├── pages/              # Страницы приложения
│   │   │   └── home/           # Главная страница
│   │   ├── shared/             # Общие модули
│   │   │   ├── firebase/       # Firebase интеграция
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── firestore.service.ts
│   │   │   │   ├── firebase.config.ts
│   │   │   │   ├── add-document/      # Компонент добавления документов
│   │   │   │   ├── auth-status/       # Компонент статуса авторизации
│   │   │   │   └── google-auth-button/# Кнопка Google Auth
│   │   │   ├── api/            # API сервисы
│   │   │   │   └── picsum.service.ts  # Сервис изображений
│   │   │   └── ui/             # UI компоненты
│   │   │       └── theme-toggle/      # Переключатель тем
│   │   ├── app.component.ts    # Корневой компонент
│   │   ├── app.config.ts       # Конфигурация приложения
│   │   └── app.routes.ts       # Маршрутизация
│   ├── assets/                 # Статические ресурсы
│   ├── styles/                 # Глобальные стили
│   ├── index.html              # HTML entry point
│   └── main.ts                 # Bootstrap
├── public/                     # Публичные файлы
└── angular.json                # Angular конфигурация
```

## Архитектура компонентов

### Корневой уровень
```
AppComponent
├── RouterOutlet (маршрутизация)
├── HeaderComponent (шапка)
└── FooterComponent (подвал)
```

### Маршрутизация
```
/ (root) → HomeComponent
** → redirectTo: ''
```

### Дерево компонентов

```
AppComponent
├── HeaderComponent
│   ├── ThemeToggleComponent
│   └── GoogleAuthButtonComponent
├── RouterOutlet
│   └── HomeComponent
│       ├── AddDocumentComponent
│       └── AuthStatusComponent
│           └── GoogleAuthButtonComponent
└── FooterComponent
```

## Сервисы и зависимости

### AuthService (Firebase Authentication)
**Расположение**: `shared/firebase/auth.service.ts`

**Ответственности**:
- Google OAuth аутентификация
- Управление состоянием пользователя (Signals)
- Проверка прав администратора
- Автоматическое добавление пользователей в Firestore

**Signals**:
- `firebaseUser`: User | null
- `appUser`: AppUser | null
- `uid`: string | null
- `isAdmin`: boolean

**Зависимости**:
- Auth (Firebase)
- Firestore (Firebase)

**Используется в**:
- AppComponent
- GoogleAuthButtonComponent
- AuthStatusComponent
- AddDocumentComponent

### FirestoreService (Firestore Database)
**Расположение**: `shared/firebase/firestore.service.ts`

**Ответственности**:
- Добавление документов в коллекции Firestore

**Методы**:
- `addDocument(collectionName, data)`

**Используется в**:
- AddDocumentComponent

### PicsumService (External API)
**Расположение**: `shared/api/picsum.service.ts`

**Ответственности**:
- Генерация URL для случайных изображений (Picsum Photos API)

**Методы**:
- `getRandom(width, height)`: string
- `getById(id, width, height)`: string

## Поток данных

### Аутентификация
```
User → GoogleAuthButtonComponent 
      → AuthService.loginWithGoogle()
      → Firebase Auth
      → Firestore (abstractUsers collection)
      → Signals update (firebaseUser, appUser, uid, isAdmin)
      → UI обновляется через AuthStatusComponent
```

### Добавление документов
```
User → AddDocumentComponent
      → FirestoreService.addDocument()
      → Firestore (указанная коллекция)
```

### Управление темами
```
User → ThemeToggleComponent
      → localStorage (сохранение темы)
      → document.documentElement (CSS классы)
      → CSS переменные для тем (light, dark, synth)
```

## Firebase Collections

### abstractUsers
Хранит информацию о пользователях:
```typescript
{
  uid: string,
  displayName: string | null
}
```

### admins
Хранит UID администраторов для проверки прав доступа.

### Динамические коллекции
Создаются через AddDocumentComponent для хранения пользовательских данных.

## Конфигурация

### app.config.ts
Глобальные провайдеры:
- `provideRouter` - маршрутизация с in-memory scrolling
- `provideFirebaseApp` - инициализация Firebase
- `provideFirestore` - Firestore
- `provideAuth` - Firebase Authentication

### Angular Configuration
- Standalone components (no modules)
- SCSS для стилей
- Zone.js с event coalescing
- Budgets: 500kB (warning), 1MB (error)

## Ключевые паттерны

1. **Standalone Components** - все компоненты самодостаточны
2. **Signals** - реактивное состояние (Angular 19)
3. **Dependency Injection** - inject() функция
4. **Service Layer** - логика вынесена в сервисы
5. **Firebase Integration** - @angular/fire для типизации

## Поток запроса

```
Browser → index.html → main.ts → AppComponent
                                    ↓
                            Router (app.routes.ts)
                                    ↓
                            HomeComponent
                                    ↓
                    ┌───────────────┴───────────────┐
                    ↓                               ↓
        AddDocumentComponent              AuthStatusComponent
                    ↓                               ↓
        FirestoreService                   AuthService
                    ↓                               ↓
            Firestore                    Firebase Auth
```
