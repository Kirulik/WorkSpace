# Документация разработчика скриптов UniServer AUTO

## Назначение

Материалы предназначены для разработчиков плагинов платформы **UniServer AUTO** (VesySoft): как пользоваться встроенным скриптовым API (PascalScript / FastScript) при написании логики плагинов.

## Состав комплекта

| Файл | Содержание |
|------|------------|
| [01-Script-API-Reference.md](UniServer-Script-Docs/01-Script-API-Reference.md) | **Основной мануал:** подробный справочник всех функций и объектов из `functions.txt` |
| [02-Typical-Scenarios.md](UniServer-Script-Docs/02-Typical-Scenarios.md) | Примеры типовых задач (HTTP-страница, сообщения, журналы, JSON) |
| [sources/EventScript_desc-extract.md](UniServer-Script-Docs/sources/EventScript_desc-extract.md) | Очищенная выдержка из EventScript_desc.odt |
| [sources/PluginAPI_desc-extract.md](UniServer-Script-Docs/sources/PluginAPI_desc-extract.md) | Очищенная выдержка из PluginAPI_desc.odt (заготовка под том Plugin API) |

## Источники

| Материал | Путь | Использование |
|----------|------|---------------|
| `functions.txt` | корень материалов | полный список RTTI API скриптов |
| `fsCommon.pas` / `fsCoreScript.pas` / `fsJsonVar.pas` | `source/` | фактическая реализация |
| `PluginAPI_TLB.pas` | `source/` | COM-контракты ядра |
| `EventScript_desc.odt` | `source/` | сырое описание скриптов (JSON, журналы, примеры) |
| `PluginAPI_desc.odt` | `source/` | сырое описание архитектуры плагинов (DLL, сообщения, веб, потоки) |

Очищенные выдержки из ODT: папка [`sources/`](UniServer-Script-Docs/sources/).

## Стек

- Движок скриптов: **FastScript** (FastReport), язык **PascalScript**
- JSON-значения в скриптах: обёртка `IScriptJsonVar` / `TScriptJsonVar` (mORMot DocVariant)
- Межплагинное взаимодействие: шина сообщений ядра (`NewMessage` / `SendMsg` / `PostMsg`)

## Как пользоваться мануалом

1. Начать с разделов 1–3 в [`01-Script-API-Reference.md`](UniServer-Script-Docs/01-Script-API-Reference.md), затем перейти к [`02-Typical-Scenarios.md`](UniServer-Script-Docs/02-Typical-Scenarios.md).
2. Поиск функции — **алфавитный указатель** в конце справочника или оглавление по группам.
3. Правка скриптов в рабочей системе — конструктор плагина (SMC): написать код → **Компилировать** → **Сохранить**.
