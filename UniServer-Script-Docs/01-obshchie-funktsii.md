# Общие функции

Раздел объединяет базовые утилиты скриптового API, не привязанные к конкретной подсистеме сервера: безопасные преобразования `Variant`, проверку пустых значений, компактные GUID и короткую паузу `Sleep`. В UniServer почти все обменные значения (поля сообщений, параметры страниц, документы журналов, ответы веб-обработчиков) проходят через `Variant`, поэтому скрипт постоянно приводит данные к строке, числу или проверяет «пустоту» перед записью в журнал или отправкой сообщения. Функция `_ToStr` особенно важна для JSON-объектов и массивов (текстовое представление) и для дат (ISO 8601). `IsEmpty` / `VarIsEmptyOrNull` задают единый критерий «нет данных» для разных типов. `NewPackedGuid` / `IsPackedGuid` дают компактные идентификаторы записей и связей без ручной генерации. Эти вызовы — фундамент остальных разделов справки.

<a id="tostr"></a>
### `_ToStr`

*** `_ToStr` — Преобразование значения в строку ****

`function _ToStr(V: Variant; Format: Boolean = False): String`

**Входные параметры:**
- `V: Variant` — JSON-объект / JSON-массив или иное значение для преобразования в строку (по EventScript_desc.odt и `fsCommon.pas`)
- `Format: Boolean = False` — выполнять ли форматирование (переводы строк, отступы) текста JSON при переводе в строку (по EventScript_desc.odt)

**Возвращает:**

строковое представление значения; для JSON — JSON-текст (по EventScript_desc.odt / `fsCommon.pas`)

**Сведения из исходников / ODT:**

- Для JSON-объекта или JSON-массива возвращает его текстовое представление.
- При `Format = True` применяет `JsonReformat`.
- Для даты формирует ISO 8601 с разделителем `T` и миллисекундами.

**Пример вызова:**

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

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="todouble"></a>
### `ToDouble`

*** `ToDouble` — Преобразование в `Double` ****

`function ToDouble(V: Variant): Double`

**Входные параметры:**
- `V: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Строковое значение преобразуется после удаления пробелов; остальные значения передаются стандартному преобразованию Variant.

**Пример вызова:**

```pascal
var
  d: Double;                 // числовой результат
begin
  d := ToDouble('12.5');     // преобразовать строку в Double
  DebugLog(_ToStr(d));       // вывести результат
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="newpackedguid"></a>
### `NewPackedGuid`

*** `NewPackedGuid` — Создание packed GUID ****

`function NewPackedGuid: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Генерирует компактный идентификатор GUID.

**Пример вызова:**

```pascal
var
  g: String;                 // новый идентификатор
begin
  g := NewPackedGuid;        // создать packed GUID
  DebugLog(g);               // записать в лог
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="ispackedguid"></a>
### `IsPackedGuid`

*** `IsPackedGuid` — Проверка packed GUID ****

`function IsPackedGuid(Guid: String): Boolean`

**Входные параметры:**
- `Guid: String` — проверяемая строка

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Проверяет, что строка соответствует формату packed GUID.

**Пример вызова:**

```pascal
var
  ok: Boolean;               // результат проверки
begin
  ok := IsPackedGuid(NewPackedGuid); // проверить формат GUID
  DebugLog(_ToStr(ok));              // вывести результат проверки
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="sleep"></a>
### `Sleep`

*** `Sleep` — Приостановка выполнения ****

`procedure Sleep(Milliseconds: Integer)`

**Входные параметры:**
- `Milliseconds: Integer` — длительность паузы в миллисекундах; по `fsCommon.pas` ограничивается диапазоном 0…10000

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Значение задержки ограничивается диапазоном от 0 до 10000 мс.

**Пример вызова:**

```pascal
begin
  Sleep(500);                // пауза 500 мс (в реализации ограничено 0…10000)
  DebugLog('готово');        // продолжение после паузы
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="isempty"></a>
### `IsEmpty`

*** `IsEmpty` — Проверка пустого значения ****

`function IsEmpty(V: Variant): Boolean`

**Входные параметры:**
- `V: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Для JSON-массива или объекта проверяется `Count = 0`.
- Для строк проверяется `Length = 0`; для остальных значений используется `VarIsEmptyOrNull`.

**Пример вызова:**

```pascal
var
  x: Variant;                // JSON-массив
begin
  x := _Arr();               // создать пустой массив
  if IsEmpty(x) then         // проверить пустоту
    DebugLog('пусто');       // ветка для пустого значения
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="varisemptyornull"></a>
### `VarIsEmptyOrNull`

*** `VarIsEmptyOrNull` — Проверка Empty или Null ****

`function VarIsEmptyOrNull(V: Variant): Boolean`

**Входные параметры:**
- `V: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Вызывает `VarIsEmptyOrNull` для переданного Variant.

**Пример вызова:**

```pascal
var
  v: Variant;                // Variant без присвоенного значения
begin
  if VarIsEmptyOrNull(v) then // проверка Empty/Null
    DebugLog('Empty или Null');
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---
