# Справочник API скриптов UniServer AUTO

**Версия документа:** 1.0  
**Платформа:** UniServer AUTO  
**Язык скриптов:** PascalScript (FastScript / FastReport)  
**Охват:** функции и объекты из `functions.txt` и реализация в `fsCommon.pas`, `fsCoreScript.pas`, `fsJsonVar.pas`, контракты `PluginAPI_TLB.pas`

---

## Оглавление

1. [Введение](#1-введение)
2. [Базовый синтаксис PascalScript](#2-базовый-синтаксис-pascalscript)
3. [Группа A — утилиты](#3-группа-a--утилиты)
4. [Группа B — JSON и форматирование](#4-группа-b--json-и-форматирование)
5. [Группа C — конфиг и сообщения (глобальные функции)](#5-группа-c--конфиг-и-сообщения-глобальные-функции)
6. [Группа D — объекты ядра](#6-группа-d--объекты-ядра)
7. [Группа E — отладка и файлы](#7-группа-e--отладка-и-файлы)
8. [Группа F — переменные плагина](#8-группа-f--переменные-плагина)
9. [Группа G — журналы и справочники](#9-группа-g--журналы-и-справочники)
10. [Алфавитный указатель](#10-алфавитный-указатель)
11. [Замечания и ограничения](#11-замечания-и-ограничения)

---

## 1. Введение

### 1.1. Что такое скрипт в UniServer

Скрипты — серверная логика плагина: обработчики веб-страниц, переходов автомата состояний, команд, событий, фоновых workers. Они выполняются **на сервере** движком FastScript.

По [EventScript_desc.odt](../Материалы%20для%20документации/source/EventScript_desc.odt) язык может быть **PascalScript** или **JScript**; выбор определяется автоматически (по наличию `{}` в начале/конце текста). Справочник FastScript: https://www.fastreport.ru/public_download/fs_ru.pdf

В плагинах UniServer на практике чаще встречается **PascalScript**. Клиентский JavaScript в `Views/` скриптами сервера **не является**.

### 1.2. Где API регистрируется

| Модуль | Что добавляет |
|--------|----------------|
| `fsCommon.pas` → `TCommonFunctions` | строки, даты, hex/CRC, JSON (`_Obj`, `_Json`…), `Format*` |
| `fsCoreScript.pas` → `TCoreFunctions` | сообщения, конфиг, журналы, переменные, объекты `TI*` |
| `fsJsonVar.pas` | тип значения JSON (`IScriptJsonVar`) |

Список в `functions.txt` — выжимка вызовов `AddMethod` / `AddProperty` / `AddIndexProperty`.

### 1.3. Типы в скриптах

| Тип в сигнатуре | Смысл |
|-----------------|--------|
| `String` | Строка |
| `Integer`, `Byte`, `Word`, `Int64` | Целые |
| `Double`, `Single` | Вещественные |
| `Boolean` | Логический |
| `TDateTime` | Дата/время |
| `Variant` | Динамический тип: число, строка, JSON-объект/массив, сообщение и т.д. |
| `array of Variant` | Массив аргументов (для `_ObjEx`, `Format`…) |
| `TIUser`, `TIMessage`… | Обёртки над COM-интерфейсами ядра |

### 1.4. Контекст выполнения

В зависимости от места скрипта доступны разные переменные (внедряются ядром):

| Контекст | Типичные переменные |
|----------|---------------------|
| HTTP-страница (`Pages`) | `Request`, `Response`, имя плагина, глобалы плагина |
| Переход / состояние | глобалы, флаги, `Result` (для условия перехода) |
| Команда / событие | параметры сообщения, глобалы |
| Worker | глобалы плагина |

Точный набор задаётся при создании скрипта (`CoreObjs`, провайдер переменных). На практике в страницах плагина всегда используйте `Request` / `Response` и глобальные `Globals` плагина как обычные идентификаторы (`Counter := 1`).

---

## 2. Базовый синтаксис PascalScript

```pascal
var
  x: Integer;
  s: String;
  o: Variant;
begin
  x := 1;
  s := 'текст';
  o := _Obj();
  o.Name := 'demo';

  if x > 0 then
    DebugLog('ok')
  else
    DebugLog('no');
end
```

Правила:

- присваивание через `:=`;
- блоки `begin` … `end`;
- сравнение строк обычно через `=`;
- для JSON-объектов доступ к полям как к свойствам: `o.Field`, `o.Value['key']` (см. методы JSON ниже).

Компиляция выполняется кнопкой в конструкторе плагина; ошибки синтаксиса показывает компилятор FastScript.

---

## 3. Группа A — утилиты

Источник: `fsCommon.pas` → `CallUtilMethod`.

### 3.1. Строки и кавычки

#### `QuotedStr(S: String): String`

Оборачивает строку в SQL-подобные одинарные кавычки (с экранированием внутренних кавычек через `QuotedStr` Delphi/mORMot).

```pascal
s := QuotedStr('O''Brien'); // результат вида 'O''Brien'
```

#### `QuotedStrJSON(S: String): String`

Кавычки в стиле JSON (`"…"` с JSON-экранированием).

#### `EscapeJSON(S: String): String`

Экранирует спецсимволы JSON **без** внешних кавычек (переносы, кавычки, `\` и т.д.).

#### `UpperCase(S: String): String` / `LowerCase(S: String): String`

Регистр через `AnsiUpperCase` / `AnsiLowerCase`.

#### `Length(S: String): Integer`

Длина строки.

#### `Pos(SubStr, Str: String): Integer`

Поиск подстроки. **Регистронезависимый** (внутри используется `PosI` + `UpperCase` для образца).

Индексация как в Pascal: `1` — найдено с первой позиции, `0` — не найдено.

#### `StringReplace(S, OldPattern, NewPattern: String): String`

Замена **всех** вхождений, **без учёта регистра** (`rfReplaceAll`, `rfIgnoreCase`).

```pascal
s := StringReplace('Ab-Ab', 'ab', 'X'); // 'X-X'
```

---

### 3.2. Пустота значений

#### `IsEmpty(V: Variant): Boolean`

| Тип `V` | Критерий «пусто» |
|---------|------------------|
| JSON (`IScriptJsonVar` / DocVariant) | `Count = 0` |
| строка | `Length = 0` |
| иное | `VarIsEmptyOrNull` |

```pascal
if IsEmpty(LRows) then
  DebugLog('нет данных');
```

#### `VarIsEmptyOrNull(V: Variant): Boolean`

Строгая проверка Empty/Null варианта (без спецлогики для JSON и строк).

---

### 3.3. Дата и время

#### `Iso8601ToDateTime(S: String): TDateTime`

Разбор ISO-8601 строки в `TDateTime`.

#### `DateTimeToIso8601(D: TDateTime): String`

Формат с разделителем `'T'` и миллисекундами. Если передать строку — сначала пытается разобрать как ISO.

#### `NowPrecise: TDateTime` / `NowUTCPrecise: TDateTime`

Текущее локальное / UTC время с повышенной точностью (mORMot).

#### `SecondsBetween` / `MinutesBetween` / `HoursBetween` / `MillisecondsBetween(Now, Then: TDateTime): Integer`

Разница между двумя моментами (как в `DateUtils`). Порядок аргументов: «сейчас», «тогда» — как в сигнатуре.

#### `IncHour` / `IncDay` / `IncMinute` / `IncSecond` / `IncMilliSecond(Value, Number): TDateTime`

Сдвиг даты на заданное число единиц.

> В RTTI у `IncMinute` / `IncSecond` / `IncMilliSecond` параметр назван `NumberOfDays` — это наследие декларации; по смыслу это число минут/секунд/миллисекунд.

#### `TicksPeriodToText(ATicks: Integer): String`

Человекочитаемое представление периода в тиках.

```pascal
DebugLog(TicksPeriodToText(1500));
```

---

### 3.4. GUID

#### `NewPackedGuid: String`

Новый «упакованный» GUID (строка без типичных фигурных скобок/разделителей — формат ядра `NewPackedGuid`).

#### `IsPackedGuid(Guid: String): Boolean`

Проверка, что строка соответствует формату packed GUID.

---

### 3.5. Hex-преобразования

Пары «значение → hex-строка» и обратно. Hex — подряд идущие hex-цифры (без пробелов), представление little-endian / бинарный дамп через `BinToHex` / `HexToBin` mORMot.

| Функция | Назначение |
|---------|------------|
| `ByteToHex` / `HexToByte` | 1 байт → 2 hex-символа |
| `WordToHex` / `HexToWord` | 2 байта |
| `IntToHex` / `HexToInt` | 4 байта (Integer) |
| `HexToLongWord` | 4 байта → LongWord (**имя в RTTI**, см. замечания) |
| `Int64ToHex` / `HexToInt64` | 8 байт |
| `DoubleToHex` / `HexToDouble` | IEEE Double (8 байт) |
| `SingleToHex` / `HexToSingle` | IEEE Single (4 байта) |

```pascal
h := ByteToHex(255);     // 'FF'
b := HexToByte('0A');    // 10
```

#### `StrToHex(S: String; CodePage: Integer): String`

Строка кодируется в ANSI выбранной кодовой страницы, затем в hex.

#### `HexToStr(Value: String; CodePage: Integer): String`

Обратное преобразование.

Типичные значения `CodePage`: системные Windows (например `1251` для кириллицы ANSI).

---

### 3.6. CRC по hex-строке

Источник данных — hex-строка; внутри сначала `HexToBin`, затем расчёт CRC. Результат — hex-строка CRC.

| Функция | Смысл |
|---------|--------|
| `HexToCRC8SumMod2(SourceStr; AIndex; Count; FirstByte): String` | CRC8 сумма Mod2 |
| `HexToCRC8Sum(…): String` | CRC8 сумма |
| `HexToCRC8Polinom(SourceStr; AIndex; ACount; Poly; Init; ReflIn; XorOut): String` | CRC8 по полиному |
| `HexToCRC16Polinom(…): String` | CRC16 по полиному (результат 4 hex-символа) |

Параметры индекса/длины относятся к байтовому буферу после декодирования hex (детали — `CRCcode` / `StrToCRC*`).

Использование: протоколы весовых индикаторов и оборудования, где контрольная сумма считается по бинарному кадру.

---

### 3.7. Числа и пауза

#### `SetFormatPrecision(Value: Double; Precision: Integer): Double`

Округление до `Precision` знаков после запятой:

\[
round(Value \cdot 10^{Precision}) / 10^{Precision}
\]

Частый приём в плагинах:

```pascal
LUpdateParam_FREQ := SetFormatPrecision(GetVarModFreq('AutoScaleMassa'), 1);
```

#### `SetFormatRoundFromDiscret(Value: Double; Precision: Integer; Discret: Double): Double`

Округление к ближайшему кратному `Discret`, затем `SetFormatPrecision`. Если `Discret` слишком мал (< 1e-8), подставляется `1e-8`.

```pascal
w := SetFormatRoundFromDiscret(12.37, 2, 0.05); // дискрет 0.05
```

#### `Sleep(Milliseconds: Integer)`

Пауза потока. Значение **ограничено**: отрицательное → `0`, больше `10000` → `10000` (не более 10 секунд).

> Не злоупотреблять в обработчиках HTTP и переходов автомата — блокирует выполнение скрипта.

---

## 4. Группа B — JSON и форматирование

Источник: `fsCommon.pas` → `CallJsonMethod`, тип значений — `fsJsonVar.pas`.

### 4.1. Перечисление `TDocVariantKind`

```
dvUndefined, dvObject, dvArray
```

Доступно в скрипте как enum FastScript.

### 4.2. Создание JSON-значений

#### `_Obj: Variant`

Пустой JSON-объект `{}`.

#### `_Arr: Variant`

Пустой JSON-массив `[]`.

#### `_ObjEx(A: array of Variant): Variant`

Объект из пар **имя, значение, имя, значение, …**:

```pascal
o := _ObjEx(['Name', 'Иван', 'Age', 30]);
// {"Name":"Иван","Age":30}
```

#### `_ArrEx(A: array of Variant): Variant`

Массив из переданных элементов:

```pascal
a := _ArrEx([1, 2, 'x']);
```

#### `_Json(S: String): Variant`

Разбор JSON-текста в скриптовый объект/массив.

```pascal
o := _Json('{"A":1,"B":[2,3]}');
```

#### `_Copy(V: Variant): Variant`

Глубокая копия JSON через сериализацию; для не-JSON возвращает исходное значение.

#### `_ToStr(V: Variant; Format: Boolean = False): String`

| Вход | Поведение |
|------|-----------|
| JSON-объект/массив | JSON-текст; при `Format=True` — pretty-print (`JsonReformat`) |
| `TDateTime` | ISO-8601 с `'T'` и миллисекундами |
| иное | `VariantToUtf8` |

```pascal
Response.ReturnText(_ToStr(LParam), 'application/json', 200);
```

### 4.3. Методы JSON-объекта / массива

У значения, созданного через `_Obj` / `_Arr` / `_Json`, доступны (через `IScriptJsonVar`):

| Член | Назначение |
|------|------------|
| `_Kind` | вид: object/array/undefined |
| `_Count` | число элементов |
| `Name[Index]` | имя поля объекта по индексу |
| `Value[IndexOrName]` | чтение/запись элемента |
| `Exists(NameOrValue)` | проверка наличия |
| `Add(Value)` | добавить в массив |
| `AddValue(Name, Value)` | добавить поле в объект |
| `Delete(Index)` | удалить |
| `UpdateObject(Value)` | слить/обновить объект |
| `ToString` | JSON-текст |

Типичный стиль в плагинах — свойства по имени:

```pascal
LScope := _Obj();
LScope.PluginName := PluginName;
LScope.PageTitle := 'Панель';
```

### 4.4. Преобразование и форматы

#### `ToDouble(V: Variant): Double`

Число из варианта; для строк пробелы удаляются, затем разбор.

#### `Format(Fmt: String; Args: array of Variant): String`

Классический `SysUtils.Format` / аналог Delphi (`%s`, `%d`, …).

#### `FormatUtf8(Fmt: String; Args: array of Variant): String`

`FormatUtf8` mORMot (плейсхолдеры mORMot).

#### `FormatJson(Fmt: String; Args: array of Variant): String`

`FormatUtf8` с JSON-экранированием аргументов (`True` в флаге) — удобно собирать JSON/SQL-подобные шаблоны безопасно.

#### `FormatFloat(Fmt: String; Value: Double): String`

Формат вещественного числа (`0.00`, `#.##` и т.п.).

---

## 5. Группа C — конфиг и сообщения (глобальные функции)

Источник: `fsCoreScript.pas`. В комментарии исходника помечены как **устаревшие / совместимость**; предпочтительно объекты `TICoreConfig` / `TICoreMessages`, но глобальные функции **рабочие** и широко используются в плагинах.

### 5.1. Конфигурация сервера

#### `GetConfigValue(Name: String): Variant`

Читает `CoreConfig.Values[Name]` (строковое значение настройки).

#### `GetConfigFloatDef(Name: String; ADefValue: Double): Double`

#### `GetConfigIntDef(Name: String; ADefValue: Integer): Integer`

#### `GetConfigBoolDef(Name: String; ADefValue: Boolean): Boolean`

То же с преобразованием типа и значением по умолчанию, если разбор не удался / нет данных.

```pascal
timeout := GetConfigIntDef('SomeTimeout', 1000);
```

### 5.2. Шина сообщений

Сообщение адресуется по имени вида **`ИмяПлагина.ИмяКоманды`** (или системное имя обработчика).

#### `NewMessage(Name: String; Value: Variant): Variant`

Создаёт сообщение (`IMessage`) с полезной нагрузкой `Value` (часто строка или JSON-текст).

#### `NewMessageEx(Name: String; Value: Variant; Blob: Variant; User: TIUser; Timeout: Integer): Variant`

Расширенное создание: вложение blob, пользователь, таймаут.

#### `PostMsg(Msg: Variant)`

Асинхронная отправка (**fire-and-forget**). Не ждёт ответа. Глобальный вариант — процедура без результата.

#### `SendMsg(Msg: Variant; Timeout: Integer): Variant`

Синхронная отправка: ждёт ответ до `Timeout` мс (или поведения ядра). Возвращает `Result` обработчика.

```pascal
LMsg := NewMessage(AutoScalePluginName + '.SetUpdateFieldWeighingResult', _ToStr(LParam));
LMsgResult := SendMsg(LMsg, 1000);

PostMsg(NewMessage(ReportPlugin + '.PrintReport', _ToStr(LParam)));
```

**Правило выбора:**

| Нужен ответ / ошибка таймаута | Метод |
|-------------------------------|--------|
| Да | `SendMsg` |
| Нет, только поставить в очередь | `PostMsg` |

---

## 6. Группа D — объекты ядра

Классы регистрируются в скриптовом движке как `TIBlob`, `TICoreConfig`, `TICoreMessages`, … Переменные конкретного скрипта (`Request`, `Response`, и т.д.) ядро подставляет как экземпляры этих обёрток над COM-интерфейсами из `PluginAPI_TLB.pas`.

### 6.1. `TIBlob` — бинарное вложение

| Член | Тип | Описание |
|------|-----|----------|
| `Name` | String | Имя |
| `ContentType` | String | MIME-тип |
| `Data` | Variant | Данные |
| `Size` | Integer | Размер |
| `ToJson` | function | JSON-представление метаданных/описания |

### 6.2. `TICoreConfig` — пути и настройки сервера

| Член | Описание |
|------|----------|
| `BinPath`, `DataPath`, `LogPath`, `PluginPath`, `MyPath` | Каталоги установки / данных / логов / плагинов / «мой» путь контекста |
| `LogVerbose` | Подробный лог |
| `ServerAddr`, `ServerPort`, `URL` | Адрес сервера |
| `Roles` | Роли системы |
| `MsgNames`, `MsgInfos` | Справочник зарегистрированных сообщений |
| `Values[Name]` | Чтение/запись настройки (index property) |
| `Defaults[Name]` | Значение по умолчанию |
| `MsgInfo[Name]` | Описание сообщения |
| `MsgForType[ContentType, IsCommand]` | Имя сообщения по типу контента |
| `PluginOptsDocJson[PluginName]` | JSON опций плагина |

Эквивалент старого API: `GetConfigValue(x)` ≈ `Config.Values[x]` (имя переменной конфига зависит от внедрения `CoreObjs`).

### 6.3. `TICoreLocale` — локализация

| Метод / свойство | Описание |
|------------------|----------|
| `Language`, `LanguageCode`, `LanguageID` | Текущий язык |
| `Translate(Value)` | Перевод строки |
| `FormatPlural(Value, Plurals)` | Склонение/выбор формы мн. числа |
| `FormatCurrency(Value, Currency, Spellout, Cents)` | Деньги (в т.ч. прописью) |
| `FormatWeight(Value, Spellout)` | Масса |
| `FormatDate(Value, WithTime)` | Дата(/время) по локали |

### 6.4. `TICoreMessages` — предпочтительный API шины

| Метод | Описание |
|-------|----------|
| `HasHandlerFor(MsgName)` | Есть ли обработчик |
| `NewMessage` / `NewMessageEx` / `NewMessageFromJson` | Создание |
| `PostMsg(Msg): Boolean` | Асинхронно (с результатом успеха постановки) |
| `SendMsg(Msg, Timeout): Variant` | Синхронно |
| `RegisteredMessages` | Список зарегистрированных |

`NewMessageFromJson(Json, NewMsgName, Remote)` — собрать сообщение из JSON-сериализации; `Remote` отмечает удалённое происхождение.

### 6.5. `TICoreScheduler` — отложенные задачи

| Метод | Описание |
|-------|----------|
| `AddTask(Tab, UpdateTaskID, Msg, RunOnce): String` | Задача по расписанию (crontab-подобная строка `Tab`); возвращает ID |
| `AddTimer(Seconds, Msg): String` | Таймер через N секунд |
| `RemoveTask(TaskID)` / `RemoveTimer(TimerID)` | Снятие |

```pascal
id := Scheduler.AddTimer(30, NewMessage(PluginName + '.OnTimer', ''));
```

(Имя переменной планировщика зависит от `CoreObjs`.)

### 6.6. `TIUser` — пользователь запроса

| Член | Описание |
|------|----------|
| `ID`, `Name`, `DisplayName` | Идентификация |
| `GroupID`, `GroupName` | Группа |
| `Roles` | Роли (Variant) |
| `IP` | Адрес клиента |
| `HasRole(RoleName): Boolean` | Проверка роли |
| `ToJson` | Сериализация |

### 6.7. `TIMessage` — экземпляр сообщения

| Член | Описание |
|------|----------|
| `Value` | Полезная нагрузка |
| `Blob` | Вложение |
| `Timestamp` | Время |
| `Timeout` | Таймаут |
| `Expired` | Просрочено |
| `Remote` | Удалённое |
| `User` | Пользователь-инициатор |
| `Result` | **Ответ** обработчика (можно писать в обработчике) |
| `ToJson` | Сериализация |

### 6.8. `TIWebServerRequest` — входящий HTTP

| Член | Описание |
|------|----------|
| `Method`, `URI`, `Page` | Метод, URI, имя страницы плагина |
| `CurrentUser` | `TIUser` |
| `Input(Name)` | Параметр (Variant) |
| `InputStr(Name)` | Параметр как строка |
| `InputArr(Name)` | Массив одноимённых параметров |
| `Header(Name)` / `Cookie(Name)` | Заголовок / cookie |
| `ToJson` | Дамп запроса |

```pascal
code := Request.InputStr('code');
body := Request.Input('json'); // зависит от того, как ядро кладёт тело
```

### 6.9. `TIWebServerResponse` — ответ HTTP

| Метод | Описание |
|-------|----------|
| `ReturnText(Text, ContentType, Status)` | Текст/JSON/plain с HTTP-кодом |
| `ReturnPage(Name, InputJSON)` | Рендер HTML-шаблона из `Views/` + scope |
| `ReturnBlob(Blob, Status)` | Бинарный ответ |
| `ReturnError(Text, Status)` | Ошибка |
| `Redirect(PageName)` | Редирект |
| `SetCookie(Name, Value, Expires)` | Cookie |
| `SetHeader(Value)` | Заголовок |
| `CacheControl` | Управление кэшем страницы |

```pascal
const HTTP_SUCCESS = 200;
      HTTP_ERROR = 500;
var
  LScope: Variant;
begin
  LScope := _Obj();
  LScope.PluginName := PluginName;
  LScope.PluginCaption := PluginCaption;
  Response.ReturnPage('Panel.html', LScope);
end
```

```pascal
Response.ReturnText('OK', 'text/plain', 200);
Response.ReturnText(_ToStr(LRows), 'application/json', 200);
```

---

## 7. Группа E — отладка и файлы

Источник: `fsCoreScript.pas` → `CallUtilMethod`.

### `DebugLog(V: Variant)`

Пишет отладочное сообщение.

- По **EventScript_desc.odt** — в файл `EventScript.log`.
- По реализации в `fsCoreScript.pas` — через `LogProvider` / `SrvLog` (уровень monitoring), строка вида `Debug: …`, затем `Flush`.

В любом случае это основной способ отладки скрипта «на сервере».

- JSON → через `ToString`;
- «голый» `IDispatch` / `IUnknown` → указатель в тексте;
- иначе — значение как есть.

```pascal
DebugLog('Counter=' + _ToStr(Counter));
DebugLog(LObj);
```

### `StringFromFile(FileName: String): String`

Читает текстовый файл. Относительный путь резолвится от `CoreConfig.MyPath`.

### `FileFromString(Content: String; FileName: String)`

Записывает файл (тот же правило относительных путей).

---

## 8. Группа F — переменные плагина

Источник: `CallVarMethod`. Работает с переменными, видимыми скрипту (глобалы плагина / провайдер `IScriptVarProvider`).

| Функция | Описание |
|---------|----------|
| `GetVarValue(Name)` | Текущее значение |
| `SetVarValue(Name, Value)` | Установить; для строкового типа значение приводится к String |
| `GetVarModTime(Name): TDateTime` | Время последнего изменения (**только глобали** `TGlobalVariable`) |
| `GetVarModCount(Name): Integer` | Счётчик изменений |
| `GetVarModFreq(Name): Double` | Частота изменений (используется для контроля «живости» сигнала) |

Если переменная не найдена — исключение.

Во многих скриптах плагина глобалы доступны **напрямую** (`Counter := Counter + 1`). `Get/SetVarValue` нужны, когда имя динамическое:

```pascal
SetVarValue(Request.InputStr('name'), Request.Input('value'));
```

Паттерн контроля связи (киоск):

```pascal
fErrorConnect := (SetFormatPrecision(GetVarModFreq('AutoScaleMassa'), 1) = 0.0);
```

---

## 9. Группа G — журналы и справочники

Источник: `CallJournalMethod` / `CallJournalMethod_Msgs`.

Все операции — обёртки над шиной: формируется сообщение **`ИмяЖурнала.ИмяОперации`**, затем `SendMsg` (синхронно) или `PostMsg` (для `Async*`).

Если журнал недоступен / ответ пуст — исключение вида «журнал не найден».

### 9.1. Синхронное чтение / запись

#### `GetQuery(Journal, SQL: String): Variant`

SQL-запрос к **внутренней** БД журнала.

По EventScript_desc.odt:

- синтаксис **SQLite**;
- имя таблицы журнала в запросе всегда **`Journal`**.

```pascal
Result := GetQuery('WeighingJournal',
  'SELECT MAX(RowID) FROM Journal');
```

#### `GetQueryEx(Journal, SQL: String): Variant`

SQL к **внешней** БД журнала:

- синтаксис внешней СУБД;
- имя таблицы задаётся в настройках журнала (не обязательно `Journal`).

```pascal
Result := GetQueryEx('WeighingJournal',
  'SELECT MAX(ID) FROM Weighing');
```

#### `GetRecord(Journal, Code: String): Variant`

Одна запись по коду. Ядро шлёт `{"CODE": …}`; из массива-ответа берётся **первый** элемент. Если пусто — ошибка «запись не найдена».

```pascal
Doc := GetRecord('WeighingJournal', 'D307EB...205027');
Result := Doc.NUMB_TS;
```

#### `GetRecords(Journal: String; Args: Variant): Variant`

Выборка. `Args` — JSON-объект параметров фильтрации/лимитов (как ждёт журнал), либо уже строка JSON.

Поля `Args`, которые использует официальный пример ODT:

| Поле | Смысл |
|------|--------|
| `Filter` | объект условий (поля записи) |
| `SortField` | поле сортировки |
| `SortDesc` | по убыванию |
| `MaxRows` | ограничение выборки |

```pascal
Args := _Obj();
Args.Filter := _Obj();
Args.Filter.NUMB_TS := 'A999AB45';
Args.SortField := 'DATETIME_CREATE';
Args.SortDesc := True;
Args.MaxRows := 10;
Docs := GetRecords('WeighingJournal', Args);
```

Типичный паттерн плагинов:

```pascal
LRows := GetRecords(AutoScaleTransportTable,
  _ObjEx(['Filter', LFilter, 'MaxRows', LMaxRows]));
Response.ReturnText(_ToStr(LRows), 'application/json', 200);
```

#### `GetView(Journal, Name: String; Params, Filter: Variant; SortField: String; SortDesc: Boolean; FirstRow, MaxRows: Integer): Variant`

Именованное представление журнала. Параметры упаковываются в JSON:

```json
{
  "Name": "...",
  "Params": ...,
  "Filter": ...,
  "SortField": "...",
  "SortDesc": false,
  "FirstRow": 0,
  "MaxRows": 100
}
```

> В EventScript_desc.odt приведена **старая** сигнатура `GetView(Journal, Name, Args, Params)`. Актуальная — из `functions.txt` / `fsCoreScript.pas` (таблица выше).

#### `SetRecord(Journal: String; Doc: Variant): String` / `SetRecordNT(…): String`

Запись документа. Перед отправкой из JSON **удаляется поле `DBID`**. Возвращает ответ журнала (обычно код/идентификатор).

По EventScript_desc.odt суффикс **`NT`** означает: изменить запись **без запуска триггеров**. В скриптовом слое это отдельное сообщение `Journal.SetRecordNT` (vs `SetRecord`).

#### `ExecProc(Journal, Name: String; Args: Variant): Variant`

Вызов хранимой/журнальной процедуры: `{"Name":…,"Args":…}`. Если ответ — JSON-массив/объект, возвращается как JSON-Variant, иначе как скаляр.

### 9.2. Blob-вложения записей

| Функция | Описание |
|---------|----------|
| `GetBlobs(Journal, Code)` | Список blob записи (`Filter.CODE`, `MaxRows` по умолчанию ядра) |
| `GetBlob(Journal, Code, Name)` | Один blob |
| `SetBlob(Journal, Code, Name, Blob)` | Запись blob (`NewMessageEx` с вложением) |

### 9.3. Связи (links) между записями

| Функция | Описание |
|---------|----------|
| `SetLink` / `SetLinkNT` | Создать связь: CODE, NAME, CAPTION, LinkJournal, LinkType, Link |
| `GetLink(Journal, Code, Name)` | Описание связи (JSON) |
| `GetLink_Link(…): String` | Только поле `LINK` из ответа `GetLink` |
| `GetLinks(Journal, Code, MaxRows)` | Список связей записи |
| `DeleteLinks` / `UnDeleteLinks` | Удаление / восстановление |
| `DeleteLinksNT` / `UnDeleteLinksNT` | То же с суффиксом NT |

### 9.4. Асинхронные варианты

| Процедура | Аналог | Отправка |
|-----------|--------|----------|
| `AsyncSetRecord` / `AsyncSetRecordNT` | `SetRecord*` | `PostMsg` |
| `AsyncExecProc` | `ExecProc` | `PostMsg` |
| `AsyncSetLink` / `AsyncSetLinkNT` | `SetLink*` | `PostMsg` |

Использовать, когда не нужен синхронный результат и нельзя блокировать скрипт ожиданием журнала.

---

## 10. Алфавитный указатель

| Имя | Группа |
|-----|--------|
| `_Arr`, `_ArrEx`, `_Copy`, `_Json`, `_Obj`, `_ObjEx`, `_ToStr` | B |
| `AsyncExecProc`, `AsyncSetLink`, `AsyncSetLinkNT`, `AsyncSetRecord`, `AsyncSetRecordNT` | G |
| `ByteToHex`, `WordToHex`, `IntToHex`, `Int64ToHex`, `DoubleToHex`, `SingleToHex` | A |
| `DateTimeToIso8601`, `Iso8601ToDateTime` | A |
| `DebugLog` | E |
| `DeleteLinks`, `DeleteLinksNT`, `UnDeleteLinks`, `UnDeleteLinksNT` | G |
| `EscapeJSON`, `QuotedStr`, `QuotedStrJSON` | A |
| `ExecProc` | G |
| `FileFromString`, `StringFromFile` | E |
| `Format`, `FormatFloat`, `FormatJson`, `FormatUtf8` | B |
| `GetBlob`, `GetBlobs`, `SetBlob` | G |
| `GetConfigBoolDef`, `GetConfigFloatDef`, `GetConfigIntDef`, `GetConfigValue` | C |
| `GetLink`, `GetLink_Link`, `GetLinks`, `SetLink`, `SetLinkNT` | G |
| `GetQuery`, `GetQueryEx`, `GetRecord`, `GetRecords`, `GetView` | G |
| `GetVarModCount`, `GetVarModFreq`, `GetVarModTime`, `GetVarValue`, `SetVarValue` | F |
| `HexToByte`, `HexToWord`, `HexToLongWord`, `HexToInt`, `HexToInt64`, `HexToDouble`, `HexToSingle`, `HexToStr`, `StrToHex` | A |
| `HexToCRC8Polinom`, `HexToCRC8Sum`, `HexToCRC8SumMod2`, `HexToCRC16Polinom` | A |
| `HoursBetween`, `MinutesBetween`, `SecondsBetween`, `MillisecondsBetween` | A |
| `IncDay`, `IncHour`, `IncMinute`, `IncSecond`, `IncMilliSecond` | A |
| `IsEmpty`, `VarIsEmptyOrNull` | A |
| `IsPackedGuid`, `NewPackedGuid` | A |
| `Length`, `LowerCase`, `UpperCase`, `Pos`, `StringReplace` | A |
| `NewMessage`, `NewMessageEx`, `PostMsg`, `SendMsg` | C / D |
| `NowPrecise`, `NowUTCPrecise` | A |
| `SetFormatPrecision`, `SetFormatRoundFromDiscret` | A |
| `SetRecord`, `SetRecordNT` | G |
| `Sleep` | A |
| `TicksPeriodToText` | A |
| `ToDouble` | B |
| `TIBlob`, `TICoreConfig`, `TICoreLocale`, `TICoreMessages`, `TICoreScheduler`, `TIUser`, `TIMessage`, `TIWebServerRequest`, `TIWebServerResponse` | D |

---

## 11. Замечания и ограничения

1. **ODT** лежат в `Материалы для документации/source/` (`EventScript_desc.odt`, `PluginAPI_desc.odt`) — сырые/неполные, но рабочий материал; очищенные выдержки — в `Документация/sources/`.
2. **`Sleep`** жёстко ограничен 0…10000 мс.
3. **`Pos`** и **`StringReplace`** — case-insensitive.
4. Глобальные `NewMessage`/`SendMsg`/`PostMsg`/`GetConfig*` сохранены для совместимости; новые скрипты могут использовать объекты `TICoreMessages` / `TICoreConfig`.
5. Журнальные функции — тонкая обёртка над сообщениями `Journal.Operation`; контракт `Args`/`Filter` должен соответствовать конкретному журналу на объекте.
6. **`SetRecordNT`** = запись без триггеров (ODT). Префикс **`Async*`** = та же операция через `PostMsg` вместо `SendMsg`.
7. В декларации RTTI у `HexToLongWord` указан возвращаемый тип `Word` при том, что реализация кладёт `LongWord` — ориентируйтесь на размер данных (4 байта) и проверяйте на практике.
8. Параметры `IncMinute`/`IncSecond`/`IncMilliSecond` в сигнатуре названы `NumberOfDays` по ошибке копирования в RTTI — передавайте минуты/секунды/мс.

---

*Конец справочника.*
