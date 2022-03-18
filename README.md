# openapi-workshop
Workshop по инструментам для работы с OpenAPI Specification

### Полезные ссылки
1. [Stoplight Studio](https://stoplight.io/studio/) - IDE для проектирования API
1. [Spectral](https://stoplight.io/open-source/spectral/) - линтен для проверки качества написанных спецификаций
1. [Prism CLI](https://stoplight.io/open-source/prism/) - Mock-сервер
1. [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) - code-generator из спецификаций OpenAPI
1. [Документация Stoplight](https://meta.stoplight.io/docs/platform/ZG9jOjIwNjk2MQ-welcome-to-the-stoplight-docs)
1. [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) - расширение для Google Chrome для отправки кастомных заголовков
1. [Конфиги генератора для Typescript](https://openapi-generator.tech/docs/generators/typescript-axios/)


### Необходимые технологии для запуска

1. [Java 1.8](https://openjdk.java.net/install/)
1. [NodeJS](https://nodejs.org/en/)

### Скрипты для запуска 

```bash
npm run lint            # запуск линтера
npm run mock            # запуск мок-сервера
npm run openapi:gen     # запуск генерации фронтенда
npm run openapi:ruby    # запуск генерации руби-кода 
npm run openapi:rails   # запуск генерации RoR-gem 
npm run openapi:mysql   # запуск генерации RoR-gem 
npm run generate        # запуск генерации npm-пакета 
    
```