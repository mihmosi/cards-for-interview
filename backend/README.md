# cards-backend

Минимальный Java Spring Boot 1.5 backend для загрузки категорий и вопросов из Postgres.

## Структура

- `pom.xml` — Maven-проекты, зависимости Spring Boot 1.5 + Spring Data JPA + Flyway.
- `src/main/java/com/example/cards` — точка входа и контроллеры/сервисы.
- `src/main/resources/application.properties` — настройки подключения к БД.
- `src/main/resources/db/migration/V1__create_questions_categories.sql` — миграция Postgres.

## Как использовать

1. Импортируйте папку `backend` как Maven-проект в IntelliJ.
2. Установите JDK 1.8.
3. Настройте `src/main/resources/application.properties`:
   - `spring.datasource.url`
   - `spring.datasource.username`
   - `spring.datasource.password`
4. Запустите `com.example.cards.Application`.

## API

- `GET /api/categories` — возвращает список категорий.
- `GET /api/questions` — возвращает все вопросы.
- `GET /api/questions?category=HTML` — возвращает вопросы по категории.

## Миграция

Миграция создаёт таблицы `categories` и `questions` и вставляет данные.
Файл: `src/main/resources/db/migration/V1__create_questions_categories.sql`.

## Примечания

- `spring.jpa.hibernate.ddl-auto=validate` используется для проверки схемы.
- Если нужно обновить данные, добавляйте новую миграцию Flyway с новым именем.
