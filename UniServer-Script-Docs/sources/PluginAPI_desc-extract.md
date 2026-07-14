# PluginAPI_desc.odt — извлечённый текст (очищенный)

Источник: `Материалы для документации/source/PluginAPI_desc.odt`  
Назначение: сырое описание **архитектуры плагинов** (DLL/COM), не справочник скриптовых функций. Для тома «Plugin API» / разработчик нативных плагинов.

---

## Суть

- Плагин = **DLL**, экспортирует функцию → `IPluginInfo`.
- Через `QueryInterface` запрашиваются остальные интерфейсы.
- `IPluginSetup` — параметры конфигурации плагина.
- До трёх ролей: `IMessagePlugin`, `IRestServerPlugin`, `IWebServerPlugin`.
- Старт/стоп: `StartMessages` / `StartRestServer` / `StartWebServer` (и парные `Stop*`).
- Долгая работа вне `HandleMessage`/`URI`/`HandleRequest` — свой рабочий поток, старт в `Start*`, стоп в `Stop*`.

## Сообщения

- Имя: `ИмяПлагина.ИмяСообщения` (пример: `Camera1.FrameJpg`).
- `IMessage`: Value, Blob (`IBlob`), Timestamp, Expired, Result (для SendMsg), User.
- `PostMsg` — асинхронно в очереди обработчиков; `False`, если нет подписчиков.
- `SendMsg` — ждёт всех обработчиков; Timeout мс или `-1` (бесконечно); ответ в `Result`.
- `RegisterHandler` / `HasHandlerFor`.
- На каждый `IMessageHandler` — один поток; `HandleMessage` только из него.

## Веб

- URL: `/core/plugins/ИмяПлагина/ИмяСтраницы`
- `RegisterPage` + `IWebPageHandler.HandleRequest(Request, Response)`
- `AccessCheck` — для меню; при прямом URL проверять права самому.
- Ответы: `ReturnPage`, `ReturnError`, `ReturnText`/`ReturnData`; UTF-8.
- Категории страниц: UI / Actions / Data — рекомендуемые флаги `WebPageAuth*` / `WebPageCacheControl*` / `WebPageNoViewInfo`.

## Потоки, планировщик, системные сообщения, ICoreScript, стримы

В ODT есть разделы: карта потоков сервера, crontab-подобный `AddTask` / `AddTimer`, таблица `Core.*` сообщений, создание скрипта через `ICoreScript.NewScript` (Args/Consts/CoreObjs/VarProvider/FuncProvider), стриминг `ICoreWebStream`.

Полный сырой текст удобнее читать из самого `.odt`; здесь — карта для навигации при написании мануала Plugin API.
