# Дата и время

Время в UniServer — сквозной контракт между плагинами, журналами и веб-страницами. Обменный текстовый формат — ISO 8601 (`Iso8601ToDateTime` / `DateTimeToIso8601`). Функции интервалов (`SecondsBetween`, `MillisecondsBetween` и др.) измеряют давность события — типичный приём при таймаутах (в ScriptsCraneScale: `MillisecondsBetween(GetVarModTime('CurrentState'), Now())`). `NowPrecise` / `NowUTCPrecise` дают текущее время с высокой точностью; семейство `Inc*` сдвигает метку на заданный шаг.

<a id="iso8601todatetime"></a>

# `Iso8601ToDateTime` — Разбор ISO 8601

## Синтаксис

```pascal
function Iso8601ToDateTime(S: String): TDateTime
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает `TDateTime`, разобранный из строки ISO 8601.

> **Особенности:** Преобразует строку даты и времени формата ISO 8601 в `TDateTime`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: TDateTime;              // дата/время
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00'); // разобрать ISO8601
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="datetimetoiso8601"></a>

# `DateTimeToIso8601` — Форматирование ISO 8601

## Синтаксис

```pascal
function DateTimeToIso8601(D: TDateTime): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `D` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает строку ISO 8601 для переданного `TDateTime`.

> **Особенности:** Преобразует `TDateTime` в строку ISO 8601.

<details>
<summary><strong>Пример реализации</strong></summary>

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

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="secondsbetween"></a>

# `SecondsBetween` — Разница в секундах

## Синтаксис

```pascal
function SecondsBetween(Now, Then: TDateTime): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Now` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `Then` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает число полных секунд между двумя метками времени.

> **Особенности:** Количество секунд между двумя датами.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: TDateTime;              // опорная дата
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00'); // разобрать дату
  DebugLog(_ToStr(SecondsBetween(NowPrecise, x))); // разница в секундах
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="millisecondsbetween"></a>

# `MillisecondsBetween` — Разница в миллисекундах

## Синтаксис

```pascal
function MillisecondsBetween(Now, Then: TDateTime): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Now` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `Then` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает число миллисекунд между двумя метками времени.

> **Особенности:** Количество миллисекунд между двумя датами.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: TDateTime;
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00');
  DebugLog(_ToStr(MillisecondsBetween(NowPrecise, x))); // разница в миллисекундах
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="minutesbetween"></a>

# `MinutesBetween` — Разница в минутах

## Синтаксис

```pascal
function MinutesBetween(Now, Then: TDateTime): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Now` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `Then` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает число полных минут между двумя метками времени.

> **Особенности:** Количество минут между двумя датами.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: TDateTime;
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00');
  DebugLog(_ToStr(MinutesBetween(NowPrecise, x))); // разница в минутах
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hoursbetween"></a>

# `HoursBetween` — Разница в часах

## Синтаксис

```pascal
function HoursBetween(Now, Then: TDateTime): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Now` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `Then` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает число полных часов между двумя метками времени.

> **Особенности:** Количество часов между двумя датами.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: TDateTime;
begin
  x := Iso8601ToDateTime('2020-01-01T12:00:00');
  DebugLog(_ToStr(HoursBetween(NowPrecise, x))); // разница в часах
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="nowprecise"></a>

# `NowPrecise` — Текущее локальное время

## Синтаксис

```pascal
function NowPrecise: TDateTime
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает текущее локальное время с высокой точностью.

> **Особенности:** Возвращает текущее локальное время с высокой точностью.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(DateTimeToIso8601(NowPrecise)); // текущее локальное время
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="nowutcprecise"></a>

# `NowUTCPrecise` — Текущее время UTC

## Синтаксис

```pascal
function NowUTCPrecise: TDateTime
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает текущее время UTC с высокой точностью.

> **Особенности:** Возвращает текущее время UTC с высокой точностью.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(DateTimeToIso8601(NowUTCPrecise)); // текущее UTC-время
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="inchour"></a>

# `IncHour` — Увеличение часов

## Синтаксис

```pascal
function IncHour(const Value: TDateTime; const NumberOfHours: Integer): TDateTime
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `NumberOfHours` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает дату/время, сдвинутые на заданное число часов.

> **Особенности:** Сдвигает `TDateTime` на заданное число часов.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(DateTimeToIso8601(IncHour(NowPrecise, 1))); // сдвиг на 1 час
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="incday"></a>

# `IncDay` — Увеличение дней

## Синтаксис

```pascal
function IncDay(const Value: TDateTime; const NumberOfDays: Integer): TDateTime
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `NumberOfDays` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает дату/время, сдвинутые на заданное число дней.

> **Особенности:** Сдвигает `TDateTime` на заданное число дней.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(DateTimeToIso8601(IncDay(NowPrecise, 1))); // сдвиг на 1 день
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="incminute"></a>

# `IncMinute` — Увеличение минут

## Синтаксис

```pascal
function IncMinute(const Value: TDateTime; const NumberOfDays: Integer): TDateTime
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `NumberOfDays` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает дату/время, сдвинутые на заданное число минут.

> **Особенности:** Несмотря на имя RTTI-параметра `NumberOfDays`, реализация вызывает `DateUtils.IncMinute`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(DateTimeToIso8601(IncMinute(NowPrecise, 1))); // сдвиг на 1 минуту
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="incsecond"></a>

# `IncSecond` — Увеличение секунд

## Синтаксис

```pascal
function IncSecond(const Value: TDateTime; const NumberOfDays: Integer): TDateTime
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `NumberOfDays` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает дату/время, сдвинутые на заданное число секунд.

> **Особенности:** Несмотря на имя RTTI-параметра `NumberOfDays`, реализация вызывает `DateUtils.IncSecond`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(DateTimeToIso8601(IncSecond(NowPrecise, 1))); // сдвиг на 1 секунду
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="incmillisecond"></a>

# `IncMilliSecond` — Увеличение миллисекунд

## Синтаксис

```pascal
function IncMilliSecond(const Value: TDateTime; const NumberOfDays: Integer): TDateTime
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `TDateTime` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `NumberOfDays` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает дату/время, сдвинутые на заданное число миллисекунд.

> **Особенности:** Несмотря на имя RTTI-параметра `NumberOfDays`, реализация вызывает `DateUtils.IncMilliSecond`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(DateTimeToIso8601(IncMilliSecond(NowPrecise, 100))); // сдвиг на 100 мс
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="ticksperiodtotext"></a>

# `TicksPeriodToText` — Период тиков в текст

## Синтаксис

```pascal
function TicksPeriodToText(const ATicks: Integer): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `ATicks` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает текстовое представление периода в тиках.

> **Особенности:** Преобразует период в тиках в текстовое представление.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(TicksPeriodToText(1500)); // текстовое представление периода в тиках
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---
