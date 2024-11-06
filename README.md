# Шаблон виджета для AmoCrm на Vue3

## Структура

- /dist — Папка с собранными файлами
- /public — Папка со статичисикими файлами
  - /assets — Папка с вложениями
  - /i18n — Папка с локализацией
  - /images — Папка с лого виджета
  - manifest.json — Настройки виджета (версия патча меняется автоматически)
  - script.js — Файл входа Амо
- /src — Основная папка Vue
  - /api — Папка для апи
    - axiosConfig.ts — Конфиг для апи
  - /assets — Папка с вложениями
  - /components — Папка с компонентами vue
  - /entry — Папка для файлов вхождения vue
  - /store — Папка для хранилища состояний
  - /templates — Папка для twig шаблонов амо
  - /types — Папка для типов TS. Содежрит типы для амовских переменных
  - /utils — Папка для вспомогательных функций
  - /views — Папка с основными компонентами отображения vue
  - initApp.ts — Функция для инициализации приложений
  - widget.ts — Основной файл виджета
- /widget — Папка с файлами, аналогичными текущему архиву
- .env.development — Файл констант для дева
- .env.production — Файл констант для прода
- .gitignore
- bumpVersion.js — Файл для автоматического обновления версии виджета
- jsconfig.json
- package.json
- README.md
- replaceWidgetPath.js — Файл для автоматического подставления пути для дева/прода
- vite.config.js
- widget.zip — Архив для AmoCrm

_Структура папок внутри /src может быть любой_

## Команды

- build — Сборка прод
- build-dev — Сборка дев
- build-watch — Сборка дев с автоматическим отслеживанием изменений
- replace-widget-path — Замена пути для прода
- replace-widget-path-dev — Замена пути для дева
- server — Запуск локального сервера для папки dist
- dev — Режим разработки
- bump-version — Обновление версии виджета
- cp-widget — Копирование файлов в папку widget для понимания, какие файлы находятся в архиве
- zip — Сборка архива
- zip-widget — Общая команда для сборки архива
- **widget — Общая команда сборки архива для прода**
- **widget-dev — Общая команда сборки архива для дева и запуск среды разработки**

## Общий принцип работы

Весь Vue код собирается в один файл widget.js, в формате, поддерживаемым Амо (AMD). widget.js подключается к script.js, как обычный скрипт.

Код пишется, как обычный проект на Vue. Отличие только в том, что mount() надо вызывать ни к #app, а к определенным местам на странице (то, где будет отображаться виджет). Для этого есть функция initApp

### Порядок команд

1. Установка зависимостей — `npm i`
2. Для разработки — `npm run widget-dev` (Обновляется версия виджета, Виджет собирается в архив, Запускается локальный сервер)

- Файл widget.zip необходимо загрузить в амо
- Вся разработка будет автоматически обновляться в амо, без перезагрузки виджета (старницу надо обновлять)

3. Для прода — `npm run widget` (Обновляется версия виджета, Виджет собирается в архив)

- Файл widget.zip необходимо загрузить в амо

## Глобальные переменные

Доступные через inject в компонентах vue

- widget — объект амо с информацией о виджете (Для указания типа использовать `import { WidgetAmo } from "@/types/widget"`)
- isDev — true/false, дев или прод
- w_path — путь до папки с виджетом. Если дев, то localhost

Глобальная переменная APP доступна везде без объявлений

## Вывод изображений

Чтобы была возможность видеть изображения сразу, без повторной загузки виджета, изображения стоит помещать в папку /public/assets/images.

Пример получения динамического пути

```vue
<script setup>
import { inject } from "vue";
const wPath = inject("w_path");
</script>

<template>
  <img :src="wPath + '/assets/img/logo.png'" alt="Logo" />
</template>
```

## Сторонние библиотеки

Сторонние библиотеки можно скачивать как обычно через npm install

## Как использовать встроенные библиотеки

В амо есть много [встренных библиотек](https://www.amocrm.ru/developers/content/web_sdk/system_modules)

Пример их использования в файле /src/widget.js

```ts
// импорт
import Modal from "lib/components/base/modal";
import moment from "moment";

export default function() {
  ...
  init: function() {
    // moment
    console.log(moment().format("DD-MM-YYYY"));

    // Modal
    var data = "<h1>Test</h1><p>Some text</p>";
    cosnt modal = new Modal({
      class_name: "modal-window",
      init: function($modal_body: any) {
        $modal_body
          .trigger("modal:loaded")
          .html(data)
          .trigger("modal:centrify")
          .append("");
      },
      destroy: function() {},
    });

    return true;
  },
  ...
  return this;
}
```

Также в файле vite.config.ts необходимо добавить библиотеку 

```
build.rollupOptions.external: ["lib/components/base/modal", "moment"]
```

И в папку @/types добавить файл *.d.ts, описывающий библиотеку. Например, modal.d.ts

```
declare module "lib/components/base/modal";
```



## Цвета

В Амо есть переменные для цветов, благодаря которым интерфейс будет хорошо выглдять и в темной, и в светлой теме. [Figma](<https://www.figma.com/design/McUonLMFEayitn5xNqMsqz/amoCRM-Colors-(Public)?node-id=0-1&node-type=canvas&t=XQBxfzN6cE2jGDxT-0>)

## Лишние dist

Из-за компиляции появляются вложенные папки dist с \*.dev.js файлами. На них внимание обращать не нужно. Удалять можно, но они потом снова появятся
