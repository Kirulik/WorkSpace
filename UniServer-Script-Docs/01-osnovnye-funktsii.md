# Основные функции

Раздел объединяет базовые утилиты скриптового API, не привязанные к конкретной подсистеме сервера: безопасные преобразования `Variant`, проверку пустых значений, компактные GUID, короткую паузу `Sleep` и диагностический вывод `DebugLog` в лог плагина (`EventScript.log`). В UniServer почти все обменные значения (поля сообщений, параметры страниц, документы журналов, ответы веб-обработчиков) проходят через `Variant`, поэтому скрипт постоянно приводит данные к строке, числу или проверяет «пустоту» перед записью в журнал или отправкой сообщения. Функция `_ToStr` особенно важна для JSON-объектов и массивов (текстовое представление) и для дат (ISO 8601). `IsEmpty` / `VarIsEmptyOrNull` задают единый критерий «нет данных» для разных типов. `NewPackedGuid` / `IsPackedGuid` дают компактные идентификаторы записей и связей без ручной генерации.

<a id="tostr"></a>

# `_ToStr` — Преобразование значения в строку

## Синтаксис

```pascal
function _ToStr(V: Variant; Format: Boolean = False): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `V` | `Variant` | JSON-объект / JSON-массив или иное значение для преобразования в строку (по EventScript_desc.odt и `fsCommon.pas`) |
| `Format` | `Boolean` | выполнять ли форматирование (переводы строк, отступы) текста JSON при переводе в строку (по EventScript_desc.odt) |

## Описание

Преобразование значения в строку.

строковое представление значения; для JSON — JSON-текст (по EventScript_desc.odt / `fsCommon.pas`)

> **Особенности:** Для JSON-объекта или JSON-массива возвращает его текстовое представление. При `Format = True` применяет `JsonReformat`. Для даты формирует ISO 8601 с разделителем `T` и миллисекундами.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: Variant;                // JSON-объект
  s: String;                 // строковый результат
begin
  x := _Json('{"ID":10}');   // разобрать JSON-строку в объект
  s := _ToStr(x);            // преобразовать объект в строку
  s := _ToStr(x, True);      // то же с форматированием JSON
  DebugLog(s);               // записать результат в лог
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="todouble"></a>

# `ToDouble` — Преобразование в `Double`

## Синтаксис

```pascal
function ToDouble(V: Variant): Double
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `V` | `Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Преобразование в `Double`.

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Строковое значение преобразуется после удаления пробелов; остальные значения передаются стандартному преобразованию Variant.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  d: Double;                 // числовой результат
begin
  d := ToDouble('12.5');     // преобразовать строку в Double
  DebugLog(_ToStr(d));       // вывести результат
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="newpackedguid"></a>

# `NewPackedGuid` — Создание packed GUID

## Синтаксис

```pascal
function NewPackedGuid: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Создание packed GUID.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Генерирует компактный идентификатор GUID. Генерирует компактный GUID; в Scripts* — `Result_DocId` / CODE операции до `SetRecord`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  Result_DocId := NewPackedGuid; // ScriptsCraneScale sme.Empty_OnExit
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`; `Материалы для документации/Скрипты/ScriptsBunkerScale`; `Материалы для документации/Скрипты/ScriptsCraneScale`

---

<a id="ispackedguid"></a>

# `IsPackedGuid` — Проверка packed GUID

## Синтаксис

```pascal
function IsPackedGuid(Guid: String): Boolean
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Guid` | `String` | проверяемая строка |

## Описание

Проверка packed GUID.

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Проверяет, что строка соответствует формату packed GUID. Проверка формата packed GUID; в ScriptsJournal — идиома «есть живая ссылка» перед `GetRecord` / `SetLink*`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  if IsPackedGuid(NewDoc.Doc_Link) then
    AsyncExecProc(JournalName, 'UpdateSlaveDoc',
      _ObjEx(['MasterDoc', NewDoc, 'SaveRecord', True]));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`; `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="sleep"></a>

# `Sleep` — Приостановка выполнения

## Синтаксис

```pascal
procedure Sleep(Milliseconds: Integer)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Milliseconds` | `Integer` | длительность паузы в миллисекундах; по `fsCommon.pas` ограничивается диапазоном 0…10000 |

## Описание

Приостановка выполнения.

_Процедура ничего не возвращает._

> **Особенности:** Значение задержки ограничивается диапазоном от 0 до 10000 мс.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  Sleep(500);                // пауза 500 мс (в реализации ограничено 0…10000)
  DebugLog('готово');        // продолжение после паузы
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="isempty"></a>

# `IsEmpty` — Проверка пустого значения

## Синтаксис

```pascal
function IsEmpty(V: Variant): Boolean
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `V` | `Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Проверка пустого значения.

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Для JSON-массива или объекта проверяется `Count = 0`. Для строк проверяется `Length = 0`; для остальных значений используется `VarIsEmptyOrNull`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: Variant;                // JSON-массив
begin
  x := _Arr();               // создать пустой массив
  if IsEmpty(x) then         // проверить пустоту
    DebugLog('пусто');       // ветка для пустого значения
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="varisemptyornull"></a>

# `VarIsEmptyOrNull` — Проверка Empty или Null

## Синтаксис

```pascal
function VarIsEmptyOrNull(V: Variant): Boolean
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `V` | `Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Проверка Empty или Null.

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Вызывает `VarIsEmptyOrNull` для переданного Variant.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  v: Variant;                // Variant без присвоенного значения
begin
  if VarIsEmptyOrNull(v) then // проверка Empty/Null
    DebugLog('Empty или Null');
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="debuglog"></a>

# `DebugLog` — Вывод строки в лог файл плагина

## Синтаксис

```pascal
procedure DebugLog(V: Variant)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `V` | `Variant` | параметр для вывода в лог файл (по примеру в `functions.txt`) |

## Описание

Вывод строки в лог файл плагина.

Процедура ничего не возвращает. (по примеру в `functions.txt` блок «Возвращает:» пуст)

> **Особенности:** Записывает указанное значение в `EventScript.log`. Пишет значение в лог плагина (`EventScript.log`). В Scripts* часто: `DebugLog('...' + _ToStr(ExceptionMessage))` в `except`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: String;                 // строка для вывода
begin
  x := '{"ID":10}';          // подготовить текст
  DebugLog(x);               // записать значение в лог файл плагина
end
```

</details>

_Источники сведений:_ `Материалы для документации/functions.txt`; `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---
