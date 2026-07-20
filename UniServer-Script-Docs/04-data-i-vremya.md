# работа с датой и временем

Время в UniServer — сквозной контракт между плагинами, журналами и веб-страницами. Обменный текстовый формат — ISO 8601 (`Iso8601ToDateTime` / `DateTimeToIso8601`): так же оформляются метки сообщений и многие поля документов. Функции интервалов (`SecondsBetween`, `MillisecondsBetween` и др.) измеряют давность события — типичный приём при проверке устаревания или таймаутов в сценариях взвешивания. `NowPrecise` / `NowUTCPrecise` дают текущее время с высокой точностью; семейство `Inc*` сдвигает метку на заданный шаг. Планировщик ядра (`TICoreScheduler`) оперирует локальным временем компьютера сервера — при сравнении «сейчас» и расписания важно не смешивать локальное и UTC без явного преобразования.

<a id="iso8601todatetime"></a>
### `Iso8601ToDateTime`

*** `Iso8601ToDateTime` — Разбор ISO 8601 ****

`function Iso8601ToDateTime(S: String): TDateTime`

**Входные параметры:**
- `S: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует строку даты и времени формата ISO 8601 в `TDateTime`.

**Пример вызова:**

```pascal
var
  x: TDateTime;              // дата/время
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00'); // разобрать ISO8601
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="datetimetoiso8601"></a>
### `DateTimeToIso8601`

*** `DateTimeToIso8601` — Форматирование ISO 8601 ****

`function DateTimeToIso8601(D: TDateTime): String`

**Входные параметры:**
- `D: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует `TDateTime` в строку ISO 8601.

**Пример вызова:**

```pascal
var
  x: TDateTime;              // дата/время
  s: String;                 // строка ISO8601
begin
  x := NowPrecise;           // текущее время
  s := DateTimeToIso8601(x); // преобразовать в ISO8601
  DebugLog(s);               // вывести строку
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="secondsbetween"></a>
### `SecondsBetween`

*** `SecondsBetween` — Разница в секундах ****

`function SecondsBetween(Now, Then: TDateTime): Integer`

**Входные параметры:**
- `Now: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Then: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Количество секунд между двумя датами.

**Пример вызова:**

```pascal
var
  x: TDateTime;              // опорная дата
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00'); // разобрать дату
  DebugLog(_ToStr(SecondsBetween(NowPrecise, x))); // разница в секундах
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="millisecondsbetween"></a>
### `MillisecondsBetween`

*** `MillisecondsBetween` — Разница в миллисекундах ****

`function MillisecondsBetween(Now, Then: TDateTime): Integer`

**Входные параметры:**
- `Now: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Then: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Количество миллисекунд между двумя датами.

**Пример вызова:**

```pascal
var
  x: TDateTime;
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00');
  DebugLog(_ToStr(MillisecondsBetween(NowPrecise, x))); // разница в миллисекундах
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="minutesbetween"></a>
### `MinutesBetween`

*** `MinutesBetween` — Разница в минутах ****

`function MinutesBetween(Now, Then: TDateTime): Integer`

**Входные параметры:**
- `Now: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Then: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Количество минут между двумя датами.

**Пример вызова:**

```pascal
var
  x: TDateTime;
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00');
  DebugLog(_ToStr(MinutesBetween(NowPrecise, x))); // разница в минутах
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hoursbetween"></a>
### `HoursBetween`

*** `HoursBetween` — Разница в часах ****

`function HoursBetween(Now, Then: TDateTime): Integer`

**Входные параметры:**
- `Now: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Then: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Количество часов между двумя датами.

**Пример вызова:**

```pascal
var
  x: TDateTime;
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00');
  DebugLog(_ToStr(HoursBetween(NowPrecise, x))); // разница в часах
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="nowprecise"></a>
### `NowPrecise`

*** `NowPrecise` — Текущее локальное время ****

`function NowPrecise: TDateTime`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает текущее локальное время с высокой точностью.

**Пример вызова:**

```pascal
begin
  DebugLog(DateTimeToIso8601(NowPrecise)); // текущее локальное время
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="nowutcprecise"></a>
### `NowUTCPrecise`

*** `NowUTCPrecise` — Текущее время UTC ****

`function NowUTCPrecise: TDateTime`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает текущее время UTC с высокой точностью.

**Пример вызова:**

```pascal
begin
  DebugLog(DateTimeToIso8601(NowUTCPrecise)); // текущее UTC-время
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="inchour"></a>
### `IncHour`

*** `IncHour` — Увеличение часов ****

`function IncHour(const Value: TDateTime; const NumberOfHours: Integer): TDateTime`

**Входные параметры:**
- `Value: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `NumberOfHours: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Сдвигает `TDateTime` на заданное число часов.

**Пример вызова:**

```pascal
begin
  DebugLog(DateTimeToIso8601(IncHour(NowPrecise, 1))); // сдвиг на 1 час
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="incday"></a>
### `IncDay`

*** `IncDay` — Увеличение дней ****

`function IncDay(const Value: TDateTime; const NumberOfDays: Integer): TDateTime`

**Входные параметры:**
- `Value: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `NumberOfDays: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Сдвигает `TDateTime` на заданное число дней.

**Пример вызова:**

```pascal
begin
  DebugLog(DateTimeToIso8601(IncDay(NowPrecise, 1))); // сдвиг на 1 день
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="incminute"></a>
### `IncMinute`

*** `IncMinute` — Увеличение минут ****

`function IncMinute(const Value: TDateTime; const NumberOfDays: Integer): TDateTime`

**Входные параметры:**
- `Value: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `NumberOfDays: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Несмотря на имя RTTI-параметра `NumberOfDays`, реализация вызывает `DateUtils.IncMinute`.

**Пример вызова:**

```pascal
begin
  DebugLog(DateTimeToIso8601(IncMinute(NowPrecise, 1))); // сдвиг на 1 минуту
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="incsecond"></a>
### `IncSecond`

*** `IncSecond` — Увеличение секунд ****

`function IncSecond(const Value: TDateTime; const NumberOfDays: Integer): TDateTime`

**Входные параметры:**
- `Value: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `NumberOfDays: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Несмотря на имя RTTI-параметра `NumberOfDays`, реализация вызывает `DateUtils.IncSecond`.

**Пример вызова:**

```pascal
begin
  DebugLog(DateTimeToIso8601(IncSecond(NowPrecise, 1))); // сдвиг на 1 секунду
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="incmillisecond"></a>
### `IncMilliSecond`

*** `IncMilliSecond` — Увеличение миллисекунд ****

`function IncMilliSecond(const Value: TDateTime; const NumberOfDays: Integer): TDateTime`

**Входные параметры:**
- `Value: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `NumberOfDays: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Несмотря на имя RTTI-параметра `NumberOfDays`, реализация вызывает `DateUtils.IncMilliSecond`.

**Пример вызова:**

```pascal
begin
  DebugLog(DateTimeToIso8601(IncMilliSecond(NowPrecise, 100))); // сдвиг на 100 мс
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="ticksperiodtotext"></a>
### `TicksPeriodToText`

*** `TicksPeriodToText` — Период тиков в текст ****

`function TicksPeriodToText(const ATicks: Integer): String`

**Входные параметры:**
- `ATicks: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует период в тиках в текстовое представление.

**Пример вызова:**

```pascal
begin
  DebugLog(TicksPeriodToText(1500)); // текстовое представление периода в тиках
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---
