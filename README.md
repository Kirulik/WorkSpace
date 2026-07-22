# Документация UniServer Script API

Справка по API сценариев UniServer, сформированная по исходному коду, регистрации RTTI, извлечениям из исходных ODT и подтверждённым паттернам production-скриптов (`ScriptsAutoControl`, `ScriptsBunkerScale`, `ScriptsCraneScale`, `ScriptsJournal`). Неподтверждённые назначения намеренно не дополняются предположениями.

## HTML-справка (`help/`)

Автономный пакет для открытия через `help/index.html` (без веб-сервера), с клиентским поиском. Сборка:

```bash
python Документация/_build_help.py
```

Результат: папка `help/` (относительные пути, индекс поиска вшит в `js/search-data.js`).

## Содержание

<details>
<summary>Общие функции</summary>

- [`_ToStr`](UniServer-Script-Docs/01-obshchie-funktsii.md#tostr) - Преобразование значения в строку
- [`ToDouble`](UniServer-Script-Docs/01-obshchie-funktsii.md#todouble) - Преобразование в `Double`
- [`NewPackedGuid`](UniServer-Script-Docs/01-obshchie-funktsii.md#newpackedguid) - Создание packed GUID
- [`IsPackedGuid`](UniServer-Script-Docs/01-obshchie-funktsii.md#ispackedguid) - Проверка packed GUID
- [`Sleep`](UniServer-Script-Docs/01-obshchie-funktsii.md#sleep) - Приостановка выполнения
- [`IsEmpty`](UniServer-Script-Docs/01-obshchie-funktsii.md#isempty) - Проверка пустого значения
- [`VarIsEmptyOrNull`](UniServer-Script-Docs/01-obshchie-funktsii.md#varisemptyornull) - Проверка Empty или Null

</details>

<details>
<summary>Работа с Файлами</summary>

- [`StringFromFile`](UniServer-Script-Docs/02-rabota-s-faylami.md#stringfromfile) - Чтение текста из файла
- [`FileFromString`](UniServer-Script-Docs/02-rabota-s-faylami.md#filefromstring) - Запись текста в файл

</details>

<details>
<summary>Работа со строками</summary>

- [`QuotedStr`](UniServer-Script-Docs/03-rabota-so-strokami.md#quotedstr) - Заключение строки в кавычки
- [`UpperCase`](UniServer-Script-Docs/03-rabota-so-strokami.md#uppercase) - Верхний регистр
- [`LowerCase`](UniServer-Script-Docs/03-rabota-so-strokami.md#lowercase) - Нижний регистр
- [`Length`](UniServer-Script-Docs/03-rabota-so-strokami.md#length) - Длина строки
- [`Pos`](UniServer-Script-Docs/03-rabota-so-strokami.md#pos) - Поиск подстроки
- [`StringReplace`](UniServer-Script-Docs/03-rabota-so-strokami.md#stringreplace) - Замена подстрок
- [`Format`](UniServer-Script-Docs/03-rabota-so-strokami.md#format) - Форматирование строки
- [`FormatUtf8`](UniServer-Script-Docs/03-rabota-so-strokami.md#formatutf8) - Форматирование UTF-8
- [`FormatJson`](UniServer-Script-Docs/03-rabota-so-strokami.md#formatjson) - Форматирование для JSON
- [`FormatFloat`](UniServer-Script-Docs/03-rabota-so-strokami.md#formatfloat) - Форматирование вещественного числа

</details>

<details>
<summary>работа с датой и временем</summary>

- [`Iso8601ToDateTime`](UniServer-Script-Docs/04-data-i-vremya.md#iso8601todatetime) - Разбор ISO 8601
- [`DateTimeToIso8601`](UniServer-Script-Docs/04-data-i-vremya.md#datetimetoiso8601) - Форматирование ISO 8601
- [`SecondsBetween`](UniServer-Script-Docs/04-data-i-vremya.md#secondsbetween) - Разница в секундах
- [`MillisecondsBetween`](UniServer-Script-Docs/04-data-i-vremya.md#millisecondsbetween) - Разница в миллисекундах
- [`MinutesBetween`](UniServer-Script-Docs/04-data-i-vremya.md#minutesbetween) - Разница в минутах
- [`HoursBetween`](UniServer-Script-Docs/04-data-i-vremya.md#hoursbetween) - Разница в часах
- [`NowPrecise`](UniServer-Script-Docs/04-data-i-vremya.md#nowprecise) - Текущее локальное время
- [`NowUTCPrecise`](UniServer-Script-Docs/04-data-i-vremya.md#nowutcprecise) - Текущее время UTC
- [`IncHour`](UniServer-Script-Docs/04-data-i-vremya.md#inchour) - Увеличение часов
- [`IncDay`](UniServer-Script-Docs/04-data-i-vremya.md#incday) - Увеличение дней
- [`IncMinute`](UniServer-Script-Docs/04-data-i-vremya.md#incminute) - Увеличение минут
- [`IncSecond`](UniServer-Script-Docs/04-data-i-vremya.md#incsecond) - Увеличение секунд
- [`IncMilliSecond`](UniServer-Script-Docs/04-data-i-vremya.md#incmillisecond) - Увеличение миллисекунд
- [`TicksPeriodToText`](UniServer-Script-Docs/04-data-i-vremya.md#ticksperiodtotext) - Период тиков в текст

</details>

<details>
<summary>Hex преобразованеие чисел</summary>

- [`ByteToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#bytetohex) - Byte в hex
- [`WordToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#wordtohex) - Word в hex
- [`IntToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#inttohex) - Integer в hex
- [`Int64ToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#int64tohex) - Int64 в hex
- [`DoubleToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#doubletohex) - Double в hex
- [`SingleToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#singletohex) - Single в hex
- [`HexToByte`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextobyte) - Hex в Byte
- [`HexToWord`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextoword) - Hex в Word
- [`HexToLongWord`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextolongword) - Hex в LongWord
- [`HexToInt`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextoint) - Hex в Integer
- [`HexToInt64`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextoint64) - Hex в Int64
- [`HexToDouble`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextodouble) - Hex в Double
- [`HexToSingle`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextosingle) - Hex в Single
- [`StrToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#strtohex) - Преобразование строки в hex
- [`HexToStr`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextostr) - Преобразование hex в строку

</details>

<details>
<summary>Формат представления вещественных чисел</summary>

- [`SetFormatPrecision`](UniServer-Script-Docs/06-format-veschestvennyh.md#setformatprecision) - Округление по точности
- [`SetFormatRoundFromDiscret`](UniServer-Script-Docs/06-format-veschestvennyh.md#setformatroundfromdiscret) - Округление по дискрету

</details>

<details>
<summary>Функции CRC8 и CRC16</summary>

- [`HexToCRC8SumMod2`](UniServer-Script-Docs/07-crc8-crc16.md#hextocrc8summod2) - CRC8 в hex
- [`HexToCRC8Sum`](UniServer-Script-Docs/07-crc8-crc16.md#hextocrc8sum) - CRC8 в hex
- [`HexToCRC8Polinom`](UniServer-Script-Docs/07-crc8-crc16.md#hextocrc8polinom) - CRC8 по полиному
- [`HexToCRC16Polinom`](UniServer-Script-Docs/07-crc8-crc16.md#hextocrc16polinom) - CRC16 по полиному

</details>

<details>
<summary>Типы данных</summary>

- [`TDocVariantKind`](UniServer-Script-Docs/08-tipy-dannyh.md#tdocvariantkind) - Тип JSON-переменной

</details>

<details>
<summary>работы с JSON объектами</summary>

- [`QuotedStrJSON`](UniServer-Script-Docs/09-json-obekty.md#quotedstrjson) - Строка в кавычках JSON
- [`EscapeJSON`](UniServer-Script-Docs/09-json-obekty.md#escapejson) - Экранирование JSON
- [`_Arr`](UniServer-Script-Docs/09-json-obekty.md#arr) - Создание JSON-массива
- [`_ArrEx`](UniServer-Script-Docs/09-json-obekty.md#arrex) - Создание JSON-массива со значениями
- [`_Obj`](UniServer-Script-Docs/09-json-obekty.md#obj) - Создание JSON-объекта
- [`_ObjEx`](UniServer-Script-Docs/09-json-obekty.md#objex) - Создание JSON-объекта с парами
- [`_Json`](UniServer-Script-Docs/09-json-obekty.md#json) - Разбор JSON-строки
- [`_Copy`](UniServer-Script-Docs/09-json-obekty.md#copy) - Копирование значения
- [`_Kind`](UniServer-Script-Docs/09-json-obekty.md#json-json-kind) - Тип JSON-переменной
- [`_Count`](UniServer-Script-Docs/09-json-obekty.md#json-json-count) - Количество элементов
- [`Name`](UniServer-Script-Docs/09-json-obekty.md#json-json-name) - Имя элемента объекта
- [`Value`](UniServer-Script-Docs/09-json-obekty.md#json-json-value) - Значение элемента
- [`Exists`](UniServer-Script-Docs/09-json-obekty.md#json-json-exists) - Проверка существования
- [`Add`](UniServer-Script-Docs/09-json-obekty.md#json-json-add) - Добавление в массив
- [`AddValue`](UniServer-Script-Docs/09-json-obekty.md#json-json-addvalue) - Добавление в объект
- [`Delete`](UniServer-Script-Docs/09-json-obekty.md#json-json-delete) - Удаление элемента
- [`ToString`](UniServer-Script-Docs/09-json-obekty.md#json-json-tostring) - Преобразование в строку

</details>

<details>
<summary>Общие функции для работы с сервером</summary>

- [`DebugLog`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#debuglog) - Вывод строки в лог файл плагина
- [`GetConfigValue`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#getconfigvalue) - Прочитать значение параметра настройки по наименованию
- [`GetConfigFloatDef`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#getconfigfloatdef) - Чтение `Double` с значением по умолчанию
- [`GetConfigIntDef`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#getconfigintdef) - Чтение `Integer` с значением по умолчанию
- [`GetConfigBoolDef`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#getconfigbooldef) - Чтение `Boolean` с значением по умолчанию

</details>

<details>
<summary>Отправка сообщений</summary>

- [`NewMessage`](UniServer-Script-Docs/11-otpravka-soobscheniy.md#newmessage) - Создание сообщения
- [`NewMessageEx`](UniServer-Script-Docs/11-otpravka-soobscheniy.md#newmessageex) - Создание расширенного сообщения
- [`PostMsg`](UniServer-Script-Docs/11-otpravka-soobscheniy.md#postmsg) - Асинхронная отправка сообщения
- [`SendMsg`](UniServer-Script-Docs/11-otpravka-soobscheniy.md#sendmsg) - Синхронная отправка сообщения

</details>

<details>
<summary>Плагин Конструктор / Работа с глобальными переменными Конструктора</summary>

- [`GetVarModTime`](UniServer-Script-Docs/12-globalnye-peremennye.md#getvarmodtime) - Время изменения глобальной переменной
- [`GetVarModCount`](UniServer-Script-Docs/12-globalnye-peremennye.md#getvarmodcount) - Счётчик изменений глобальной переменной
- [`GetVarModFreq`](UniServer-Script-Docs/12-globalnye-peremennye.md#getvarmodfreq) - Частота изменений глобальной переменной
- [`GetVarValue`](UniServer-Script-Docs/12-globalnye-peremennye.md#getvarvalue) - Чтение глобальной переменной
- [`SetVarValue`](UniServer-Script-Docs/12-globalnye-peremennye.md#setvarvalue) - Запись глобальной переменной

</details>

<details>
<summary>Интерфейс сервера</summary>

- [`TIBlob`](UniServer-Script-Docs/13-interfeys-servera.md#tiblob) - Двоичные данные сообщения / вложения
- [`TICoreConfig`](UniServer-Script-Docs/13-interfeys-servera.md#ticoreconfig) - Конфигурация и пути сервера
- [`TICoreLocale`](UniServer-Script-Docs/13-interfeys-servera.md#ticorelocale) - Локаль: форматы и перевод
- [`TICoreMessages`](UniServer-Script-Docs/13-interfeys-servera.md#ticoremessages) - Шина сообщений ядра
- [`TICoreScheduler`](UniServer-Script-Docs/13-interfeys-servera.md#ticorescheduler) - Планировщик задач и таймеров
- [`TIUser`](UniServer-Script-Docs/13-interfeys-servera.md#tiuser) - Пользователь сессии / сообщения
- [`TIMessage`](UniServer-Script-Docs/13-interfeys-servera.md#timessage) - Объект сообщения
- [`TIWebServerRequest`](UniServer-Script-Docs/13-interfeys-servera.md#tiwebserverrequest) - HTTP-запрос страницы плагина
- [`TIWebServerResponse`](UniServer-Script-Docs/13-interfeys-servera.md#tiwebserverresponse) - HTTP-ответ страницы плагина

</details>

<details>
<summary>Работа с универсальными журналами и справочниками</summary>

- [`GetQuery`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getquery) - SQL-запрос к журналу
- [`GetQueryEx`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getqueryex) - SQL-запрос к внешней БД
- [`GetRecord`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getrecord) - Чтение записи журнала
- [`GetRecords`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getrecords) - Поиск записей журнала
- [`SetRecord`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setrecord) - Сохранение записи журнала
- [`SetRecordNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setrecordnt) - Сохранение без триггеров
- [`GetView`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getview) - Данные представления
- [`ExecProc`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#execproc) - Хранимая процедура журнала
- [`GetBlobs`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getblobs) - Список вложений записи
- [`GetBlob`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getblob) - Чтение вложения
- [`SetBlob`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setblob) - Запись вложения
- [`SetLink`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setlink) - Создание связи
- [`SetLinkNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setlinknt) - Создание связи без триггеров
- [`GetLink`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getlink) - Чтение связи
- [`GetLink_Link`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getlink-link) - Идентификатор связанной записи
- [`GetLinks`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getlinks) - Список связей
- [`DeleteLinks`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#deletelinks) - Удаление связей
- [`UnDeleteLinks`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#undeletelinks) - Восстановление связей
- [`DeleteLinksNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#deletelinksnt) - Удаление связей без триггеров
- [`UnDeleteLinksNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#undeletelinksnt) - Восстановление связей без триггеров
- [`AsyncSetRecord`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncsetrecord) - Асинхронное сохранение записи
- [`AsyncSetRecordNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncsetrecordnt) - Асинхронное сохранение без триггеров
- [`AsyncExecProc`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncexecproc) - Асинхронный вызов процедуры
- [`AsyncSetLink`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncsetlink) - Асинхронное создание связи
- [`AsyncSetLinkNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncsetlinknt) - Асинхронная связь без триггеров

</details>

<details>
<summary>Типовые сценарии</summary>

- [Типовые сценарии](UniServer-Script-Docs/15-tipovye-scenarii.md) - цепочки API из ScriptsAutoControl / BunkerScale / CraneScale / Journal

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
