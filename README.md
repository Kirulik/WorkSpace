# Документация UniServer Script API

Справка по API сценариев UniServer, сформированная по исходному коду, регистрации RTTI, извлечениям из исходных ODT и подтверждённым паттернам production-скриптов (`ScriptsAutoControl`, `ScriptsBunkerScale`, `ScriptsCraneScale`, `ScriptsJournal`). Неподтверждённые назначения намеренно не дополняются предположениями.

## HTML-справка (`help/`)

Автономный пакет для открытия через `help/index.html` (без веб-сервера), с клиентским поиском. Сборка:

```bash
python Документация/_build_help.py
```

Результат: папка `help/` (относительные пути, индекс поиска вшит в `js/search-data.js`).

## Варианты компоновки карточки функции (`tostr_layouts/`)

Черновики дизайна одной карточки API (на примере `_ToStr`) — для выбора тимлидом. Содержимое одно и то же, отличается только подача.

| Файл | Идея |
|------|------|
| [01_mdn_reference_card.md](tostr_layouts/01_mdn_reference_card.md) | Справка в стиле MDN: синтаксис → параметры → возврат → детали |
| [02_contract_table_card.md](tostr_layouts/02_contract_table_card.md) | Контракт в таблицах |
| [03_compact_prose_card.md](tostr_layouts/03_compact_prose_card.md) | Компактный текстовый блок |
| [04_progressive_disclosure_card.md](tostr_layouts/04_progressive_disclosure_card.md) | Поэтапное раскрытие деталей |
| [_ToStr_collapsible_example.md](tostr_layouts/_ToStr_collapsible_example.md) | Компактная карточка: пример в свёрнутом `<details>` |

## Содержание

<details>
<summary>Основные функции</summary>

- [`_ToStr`](UniServer-Script-Docs/01-osnovnye-funktsii.md#tostr) - Преобразование значения в строку
- [`ToDouble`](UniServer-Script-Docs/01-osnovnye-funktsii.md#todouble) - Преобразование в `Double`
- [`NewPackedGuid`](UniServer-Script-Docs/01-osnovnye-funktsii.md#newpackedguid) - Создание packed GUID
- [`IsPackedGuid`](UniServer-Script-Docs/01-osnovnye-funktsii.md#ispackedguid) - Проверка packed GUID
- [`Sleep`](UniServer-Script-Docs/01-osnovnye-funktsii.md#sleep) - Приостановка выполнения
- [`IsEmpty`](UniServer-Script-Docs/01-osnovnye-funktsii.md#isempty) - Проверка пустого значения
- [`VarIsEmptyOrNull`](UniServer-Script-Docs/01-osnovnye-funktsii.md#varisemptyornull) - Проверка Empty или Null
- [`DebugLog`](UniServer-Script-Docs/01-osnovnye-funktsii.md#debuglog) - Вывод строки в лог файл плагина

</details>

<details>
<summary>JSON объекты</summary>

- [`QuotedStrJSON`](UniServer-Script-Docs/02-json-obekty.md#quotedstrjson) - Строка в кавычках JSON
- [`EscapeJSON`](UniServer-Script-Docs/02-json-obekty.md#escapejson) - Экранирование JSON
- [`_Arr`](UniServer-Script-Docs/02-json-obekty.md#arr) - Создание JSON-массива
- [`_ArrEx`](UniServer-Script-Docs/02-json-obekty.md#arrex) - Создание JSON-массива со значениями
- [`_Obj`](UniServer-Script-Docs/02-json-obekty.md#obj) - Создание JSON-объекта
- [`_ObjEx`](UniServer-Script-Docs/02-json-obekty.md#objex) - Создание JSON-объекта с парами
- [`_Json`](UniServer-Script-Docs/02-json-obekty.md#json) - Разбор JSON-строки
- [`_Copy`](UniServer-Script-Docs/02-json-obekty.md#copy) - Копирование значения

</details>

<details>
<summary>Строки и форматирование</summary>

- [`QuotedStr`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#quotedstr) - Заключение строки в кавычки
- [`UpperCase`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#uppercase) - Верхний регистр
- [`LowerCase`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#lowercase) - Нижний регистр
- [`Length`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#length) - Длина строки
- [`Pos`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#pos) - Поиск подстроки
- [`StringReplace`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#stringreplace) - Замена подстрок
- [`Format`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#format) - Форматирование строки
- [`FormatUtf8`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#formatutf8) - Форматирование UTF-8
- [`FormatJson`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#formatjson) - Форматирование для JSON
- [`FormatFloat`](UniServer-Script-Docs/03-stroki-i-formatirovanie.md#formatfloat) - Форматирование вещественного числа

</details>

<details>
<summary>Формат вещественных чисел</summary>

- [`SetFormatPrecision`](UniServer-Script-Docs/04-format-veschestvennyh-chisel.md#setformatprecision) - Округление по точности
- [`SetFormatRoundFromDiscret`](UniServer-Script-Docs/04-format-veschestvennyh-chisel.md#setformatroundfromdiscret) - Округление по дискрету

</details>

<details>
<summary>Дата и время</summary>

- [`Iso8601ToDateTime`](UniServer-Script-Docs/05-data-i-vremya.md#iso8601todatetime) - Разбор ISO 8601
- [`DateTimeToIso8601`](UniServer-Script-Docs/05-data-i-vremya.md#datetimetoiso8601) - Форматирование ISO 8601
- [`SecondsBetween`](UniServer-Script-Docs/05-data-i-vremya.md#secondsbetween) - Разница в секундах
- [`MillisecondsBetween`](UniServer-Script-Docs/05-data-i-vremya.md#millisecondsbetween) - Разница в миллисекундах
- [`MinutesBetween`](UniServer-Script-Docs/05-data-i-vremya.md#minutesbetween) - Разница в минутах
- [`HoursBetween`](UniServer-Script-Docs/05-data-i-vremya.md#hoursbetween) - Разница в часах
- [`NowPrecise`](UniServer-Script-Docs/05-data-i-vremya.md#nowprecise) - Текущее локальное время
- [`NowUTCPrecise`](UniServer-Script-Docs/05-data-i-vremya.md#nowutcprecise) - Текущее время UTC
- [`IncHour`](UniServer-Script-Docs/05-data-i-vremya.md#inchour) - Увеличение часов
- [`IncDay`](UniServer-Script-Docs/05-data-i-vremya.md#incday) - Увеличение дней
- [`IncMinute`](UniServer-Script-Docs/05-data-i-vremya.md#incminute) - Увеличение минут
- [`IncSecond`](UniServer-Script-Docs/05-data-i-vremya.md#incsecond) - Увеличение секунд
- [`IncMilliSecond`](UniServer-Script-Docs/05-data-i-vremya.md#incmillisecond) - Увеличение миллисекунд
- [`TicksPeriodToText`](UniServer-Script-Docs/05-data-i-vremya.md#ticksperiodtotext) - Период тиков в текст

</details>

<details>
<summary>Представление HEX чисел</summary>

- [`ByteToHex`](UniServer-Script-Docs/06-predstavlenie-hex.md#bytetohex) - Byte в hex
- [`WordToHex`](UniServer-Script-Docs/06-predstavlenie-hex.md#wordtohex) - Word в hex
- [`IntToHex`](UniServer-Script-Docs/06-predstavlenie-hex.md#inttohex) - Integer в hex
- [`Int64ToHex`](UniServer-Script-Docs/06-predstavlenie-hex.md#int64tohex) - Int64 в hex
- [`DoubleToHex`](UniServer-Script-Docs/06-predstavlenie-hex.md#doubletohex) - Double в hex
- [`SingleToHex`](UniServer-Script-Docs/06-predstavlenie-hex.md#singletohex) - Single в hex
- [`HexToByte`](UniServer-Script-Docs/06-predstavlenie-hex.md#hextobyte) - Hex в Byte
- [`HexToWord`](UniServer-Script-Docs/06-predstavlenie-hex.md#hextoword) - Hex в Word
- [`HexToLongWord`](UniServer-Script-Docs/06-predstavlenie-hex.md#hextolongword) - Hex в LongWord
- [`HexToInt`](UniServer-Script-Docs/06-predstavlenie-hex.md#hextoint) - Hex в Integer
- [`HexToInt64`](UniServer-Script-Docs/06-predstavlenie-hex.md#hextoint64) - Hex в Int64
- [`HexToDouble`](UniServer-Script-Docs/06-predstavlenie-hex.md#hextodouble) - Hex в Double
- [`HexToSingle`](UniServer-Script-Docs/06-predstavlenie-hex.md#hextosingle) - Hex в Single
- [`StrToHex`](UniServer-Script-Docs/06-predstavlenie-hex.md#strtohex) - Преобразование строки в hex
- [`HexToStr`](UniServer-Script-Docs/06-predstavlenie-hex.md#hextostr) - Преобразование hex в строку

</details>

<details>
<summary>Контрольные суммы CRC8 и CRC16</summary>

- [`HexToCRC8SumMod2`](UniServer-Script-Docs/07-kontrolnye-summy-crc.md#hextocrc8summod2) - CRC8 в hex
- [`HexToCRC8Sum`](UniServer-Script-Docs/07-kontrolnye-summy-crc.md#hextocrc8sum) - CRC8 в hex
- [`HexToCRC8Polinom`](UniServer-Script-Docs/07-kontrolnye-summy-crc.md#hextocrc8polinom) - CRC8 по полиному
- [`HexToCRC16Polinom`](UniServer-Script-Docs/07-kontrolnye-summy-crc.md#hextocrc16polinom) - CRC16 по полиному

</details>

<details>
<summary>Файлы</summary>

- [`StringFromFile`](UniServer-Script-Docs/08-fayly.md#stringfromfile) - Чтение текста из файла
- [`FileFromString`](UniServer-Script-Docs/08-fayly.md#filefromstring) - Запись текста в файл

</details>

<details>
<summary>Функции глобальных переменных.</summary>

- [`GetVarModTime`](UniServer-Script-Docs/09-funktsii-globalnyh-peremennyh.md#getvarmodtime) - Время изменения глобальной переменной
- [`GetVarModCount`](UniServer-Script-Docs/09-funktsii-globalnyh-peremennyh.md#getvarmodcount) - Счётчик изменений глобальной переменной
- [`GetVarModFreq`](UniServer-Script-Docs/09-funktsii-globalnyh-peremennyh.md#getvarmodfreq) - Частота изменений глобальной переменной

</details>

<details>
<summary>Сервер. Параметры настроек</summary>

- [`GetConfigValue`](UniServer-Script-Docs/10-server-parametry-nastroek.md#getconfigvalue) - Прочитать значение параметра настройки по наименованию
- [`GetConfigFloatDef`](UniServer-Script-Docs/10-server-parametry-nastroek.md#getconfigfloatdef) - Чтение `Double` с значением по умолчанию
- [`GetConfigIntDef`](UniServer-Script-Docs/10-server-parametry-nastroek.md#getconfigintdef) - Чтение `Integer` с значением по умолчанию
- [`GetConfigBoolDef`](UniServer-Script-Docs/10-server-parametry-nastroek.md#getconfigbooldef) - Чтение `Boolean` с значением по умолчанию

</details>

<details>
<summary>Сервер. Отправка сообщений</summary>

- [`NewMessage`](UniServer-Script-Docs/11-server-otpravka-soobscheniy.md#newmessage) - Создание сообщения
- [`NewMessageEx`](UniServer-Script-Docs/11-server-otpravka-soobscheniy.md#newmessageex) - Создание расширенного сообщения
- [`PostMsg`](UniServer-Script-Docs/11-server-otpravka-soobscheniy.md#postmsg) - Асинхронная отправка сообщения
- [`SendMsg`](UniServer-Script-Docs/11-server-otpravka-soobscheniy.md#sendmsg) - Синхронная отправка сообщения

</details>

<details>
<summary>Сервер. Универсальные журналы/справочники</summary>

- [`GetQuery`](UniServer-Script-Docs/12-server-zhurnaly.md#getquery) - SQL-запрос к журналу
- [`GetQueryEx`](UniServer-Script-Docs/12-server-zhurnaly.md#getqueryex) - SQL-запрос к внешней БД
- [`GetRecord`](UniServer-Script-Docs/12-server-zhurnaly.md#getrecord) - Чтение записи журнала
- [`GetRecords`](UniServer-Script-Docs/12-server-zhurnaly.md#getrecords) - Поиск записей журнала
- [`SetRecord`](UniServer-Script-Docs/12-server-zhurnaly.md#setrecord) - Сохранение записи журнала
- [`SetRecordNT`](UniServer-Script-Docs/12-server-zhurnaly.md#setrecordnt) - Сохранение без триггеров
- [`GetView`](UniServer-Script-Docs/12-server-zhurnaly.md#getview) - Данные представления
- [`ExecProc`](UniServer-Script-Docs/12-server-zhurnaly.md#execproc) - Хранимая процедура журнала
- [`GetBlobs`](UniServer-Script-Docs/12-server-zhurnaly.md#getblobs) - Список вложений записи
- [`GetBlob`](UniServer-Script-Docs/12-server-zhurnaly.md#getblob) - Чтение вложения
- [`SetBlob`](UniServer-Script-Docs/12-server-zhurnaly.md#setblob) - Запись вложения
- [`SetLink`](UniServer-Script-Docs/12-server-zhurnaly.md#setlink) - Создание связи
- [`SetLinkNT`](UniServer-Script-Docs/12-server-zhurnaly.md#setlinknt) - Создание связи без триггеров
- [`GetLink`](UniServer-Script-Docs/12-server-zhurnaly.md#getlink) - Чтение связи
- [`GetLink_Link`](UniServer-Script-Docs/12-server-zhurnaly.md#getlink-link) - Идентификатор связанной записи
- [`GetLinks`](UniServer-Script-Docs/12-server-zhurnaly.md#getlinks) - Список связей
- [`DeleteLinks`](UniServer-Script-Docs/12-server-zhurnaly.md#deletelinks) - Удаление связей
- [`UnDeleteLinks`](UniServer-Script-Docs/12-server-zhurnaly.md#undeletelinks) - Восстановление связей
- [`DeleteLinksNT`](UniServer-Script-Docs/12-server-zhurnaly.md#deletelinksnt) - Удаление связей без триггеров
- [`UnDeleteLinksNT`](UniServer-Script-Docs/12-server-zhurnaly.md#undeletelinksnt) - Восстановление связей без триггеров
- [`AsyncSetRecord`](UniServer-Script-Docs/12-server-zhurnaly.md#asyncsetrecord) - Асинхронное сохранение записи
- [`AsyncSetRecordNT`](UniServer-Script-Docs/12-server-zhurnaly.md#asyncsetrecordnt) - Асинхронное сохранение без триггеров
- [`AsyncExecProc`](UniServer-Script-Docs/12-server-zhurnaly.md#asyncexecproc) - Асинхронный вызов процедуры
- [`AsyncSetLink`](UniServer-Script-Docs/12-server-zhurnaly.md#asyncsetlink) - Асинхронное создание связи
- [`AsyncSetLinkNT`](UniServer-Script-Docs/12-server-zhurnaly.md#asyncsetlinknt) - Асинхронная связь без триггеров

</details>

<details>
<summary>Конструктор. Переменные среды, дополнительные функции</summary>

- [`CoreConfig`](UniServer-Script-Docs/13-konstruktor-sreda.md#coreconfig) — Конфигурация и пути сервера
  - [`CoreConfig.BinPath`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-binpath) - Каталог двоичных файлов сервера
  - [`CoreConfig.DataPath`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-datapath) - Каталог данных сервера
  - [`CoreConfig.Defaults`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-defaults) - Значение конфигурации по умолчанию
  - [`CoreConfig.LogPath`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-logpath) - Каталог журналов
  - [`CoreConfig.LogVerbose`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-logverbose) - Подробный режим логирования
  - [`CoreConfig.MsgForType`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-msgfortype) - Имя сообщения по типу содержимого
  - [`CoreConfig.MsgInfo`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-msginfo) - Описание сообщения
  - [`CoreConfig.MsgInfos`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-msginfos) - Сводная информация о сообщениях
  - [`CoreConfig.MsgNames`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-msgnames) - Имена сообщений
  - [`CoreConfig.MyPath`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-mypath) - Каталог текущего плагина
  - [`CoreConfig.PluginOptsDocJson`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-pluginoptsdocjson) - JSON-описание опций плагина
  - [`CoreConfig.PluginPath`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-pluginpath) - Каталог плагинов
  - [`CoreConfig.Roles`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-roles) - Роли сервера
  - [`CoreConfig.ServerAddr`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-serveraddr) - Адрес сервера
  - [`CoreConfig.ServerPort`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-serverport) - Порт сервера
  - [`CoreConfig.URL`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-url) - Базовый URL сервера
  - [`CoreConfig.Values`](UniServer-Script-Docs/13-konstruktor-sreda.md#ticoreconfig-values) - Значение параметра конфигурации
- [`Request`](UniServer-Script-Docs/13-konstruktor-sreda.md#request) — HTTP-запрос страницы плагина
  - [`Request.Cookie`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-cookie) - Cookie запроса
  - [`Request.Header`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-header) - Заголовок запроса
  - [`Request.Input`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-input) - Параметр запроса
  - [`Request.InputArr`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-inputarr) - Параметр-массив
  - [`Request.InputStr`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-inputstr) - Строковый параметр
  - [`Request.ToJson`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-tojson) - JSON запроса
  - [`Request.CurrentUser`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-currentuser) - Текущий пользователь
  - [`Request.Method`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-method) - HTTP-метод
  - [`Request.Page`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-page) - Имя страницы
  - [`Request.URI`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverrequest-uri) - URI запроса
- [`Response`](UniServer-Script-Docs/13-konstruktor-sreda.md#response) — HTTP-ответ страницы плагина
  - [`Response.Redirect`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverresponse-redirect) - Перенаправление
  - [`Response.ReturnBlob`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverresponse-returnblob) - Двоичный ответ
  - [`Response.ReturnError`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverresponse-returnerror) - Страница ошибки
  - [`Response.ReturnPage`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverresponse-returnpage) - Ответ HTML-страницей
  - [`Response.ReturnText`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverresponse-returntext) - Текстовый HTTP-ответ
  - [`Response.SetCookie`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverresponse-setcookie) - Установка cookie
  - [`Response.SetHeader`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverresponse-setheader) - Установка заголовка
  - [`Response.CacheControl`](UniServer-Script-Docs/13-konstruktor-sreda.md#tiwebserverresponse-cachecontrol) - Флаги кэширования ответа
- [`GetVarValue`](UniServer-Script-Docs/13-konstruktor-sreda.md#getvarvalue) - Чтение глобальной переменной
- [`SetVarValue`](UniServer-Script-Docs/13-konstruktor-sreda.md#setvarvalue) - Запись глобальной переменной

</details>

## Использование

Откройте нужный раздел из раскрывающегося содержания ниже.

Каждая функция оформлена по единой схеме: заголовок, сигнатура, входные параметры, возвращаемое значение, сведения из исходников/ODT/production-скриптов, пример вызова.

Маркер **⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ** означает, что в материалах нет достаточного описания. Примеры из пакетов `Scripts*` используются только там, где вызов API подтверждён кодом.

## Источники

- `Материалы для документации/functions.txt`
- `Материалы для документации/source/fsCommon.pas`
- `Материалы для документации/source/fsCoreScript.pas`
- `Материалы для документации/source/fsJsonVar.pas`
- `Материалы для документации/source/PluginAPI_TLB.pas`
- `Материалы для документации/source/_odt_extract/EventScript_desc.txt`
- `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`
- `Материалы для документации/Скрипты/ScriptsJournal`
- `Материалы для документации/Скрипты/ScriptsAutoControl`
- `Материалы для документации/Скрипты/ScriptsBunkerScale`
- `Материалы для документации/Скрипты/ScriptsCraneScale`
- `Материалы для документации/Скрипты`
