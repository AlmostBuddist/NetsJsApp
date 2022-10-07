<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Содержание
1. [Описание](#описание)
2. [Требования](#требования)
3. [Стек](#стек)
4. [Подключение к БД](#подключение-к-бд)
5. [Работа с миграциями TypeORM](#работа-с-миграциями-typeorm)
6. [Запуск проекта](#запуск-проекта)
7. [Структура проекта](#структура-проекта)
8. [Тестирование функционала](#тестирование-функционала)

## Описание
Шаблон проекта основанный на фреймворке [Nest.JS](https://github.com/nestjs/nest).

## Требования
Необходимая версия Node JS >= 16.13.0

## Стек:

```
— NodeJS
— NestJS
— TypeScript
— PostgreSQL
— TypeORM
```

## Подключение к БД:
Необходимо установить локально или запустить СУБД PostgreSQL используя _/.docker/docker-compose.yml_. Для подключения к СУБД из приложения необходимо заполнить следующие переменные окружения:

```
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
```

Или необходимо в директории _/config_ создать файл local.js и в формате JSON заполнить необходимые перменные.

## Работа с миграциями TypeORM:
Запуск процесса “заливки” миграций в БД:
```sh
npm run migration:up
```

Запуск процесса "отката" миграций в БД:
```sh
npm run migration:down
```

Автоматическая генерация миграции на основе изменения в сущностях в коде:
```sh
npm run migration:generate --name=migration-name
```
Новая миграция будет создана в директории _/src/data/postgres/migrations_

## Запуск проекта:
Установка зависимостей приложения:
```sh
yarn install
```

Сборка приложения (билд):
```sh
npm run build
```
Запуск приложения в режиме production:
```sh
npm run start:prod
```

Запуск приложения в режиме development:
```sh
npm run start:dev
```

## Структура проекта:
### Директория _/.docker_ содержит:
— Конфигурационные файлы для работы с Docker/docker-compose.

### Директория _/configs_ содержит:
— Конфигурации для подключения различных адаптеров в приложение: СУБД, Redis (key-value-storage);

— Конфигурации для интеграции со сторонним API (S3, Mail service и т.д.);

— Общая конфигурация настроек приложения.

### Директория _/src/adapters_ (слой интерфейсов и адаптеров) содержит:

— Модули-адаптеры для подключения и работы с API СУБД (TypeORM), интеграции со сторонним API (S3, Mail service и т.д.);

— Необходимые константы, списки (enums), dto, абстрактные классы, интерфейсы, типы и структуры используемые в данном слое приложения.

### Директория _/src/application_ (слой приложения) содержит:

— Корневой API модуль, который импортирует в себя все необходимые модули приложения (use-cases) для создания полного графа зависимостей;

— Main файл для финальной конфигурации работы приложения и его запуска;

— Сборку модулей приложения (dependency injection);

— Конфигурации для http роутинга и наборы контроллеров;

— Конфигурации для документирования API;

— Наборы middlewares (interceprots, pipes, guards);

— Наборы http exception filters;

— DTO для определения объектов для приема/возврата в контроллерах;

— Декораторы для контроллеров;

— Наборы утилит для слоя приложения;

— Необходимые константы, списки (enums), dto, абстрактные классы, интерфейсы, типы и структуры используемые в данном слое приложения.

### Директория _/src/data_ (слой хранения данных/драйверов) содержит:

— Модуль для работы с СУБД PostgreSQL;

— Наборы моделей для БД;

— Наборы репозиториев для работы с моделями БД;

— Наборы миграция для БД;

— Наборы скриптов для БД;

— Наборы сидов для БД;

— Наборы фикстур для БД;

— Необходимые константы, списки (enums), dto, абстрактные классы, интерфейсы, типы и структуры используемые в данном слое приложения.

### Директория _/src/domain_ (слой бизнес-привил) содержит:

— Наборы бизнес-моделей (бизнес-сущностей) для работы с логикой приложения (use-cases);

— Наборы бизнес-правил (use-cases) для реализации логики работы приложения;

— Наборы библиотек (libs);

— Наборы утилит (utils);

— Наборы исключений (exceptions);

— Необходимые константы, списки (enums), dto, абстрактные классы, интерфейсы, типы и структуры используемые в данном слое приложения.

## Тестирование функционала:
### Unit
Сервисы в директории _/src/domain_ (слой бизнес-привил) покрываются модульными _(*.unit.ts)_ тестами с созданием тестовых (Mock) сервисов для зависимых модулей.

### Integration
Сервисы в директории _/src/data_ (слой хранения данных/драйверов) покрываются интеграционными _(*.integration.ts)_ тестами для тестирования интеграции с СУБД, Redis и т.д.

Сервисы в директории _/src/adapters_ (слой интерфейсов и адаптеров) покрываются интеграционными _(*.integration.ts)_ тестами для тестирования интеграции со сторонним API (S3, Mail service и т.д.).

### End-to-end
Сервисы в директории _/src/application_ (слой приложения) покрываются end-to-end _(*e2e.ts)_ тестами для тестирования API приложения.
