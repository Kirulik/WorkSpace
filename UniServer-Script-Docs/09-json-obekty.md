# работы с JSON объектами

JSON — основной структурный формат данных в скриптах UniServer. Сообщения несут `Value` типа `Variant`, часто как JSON-объект; фильтры `GetRecords`, документы `SetRecord`, параметры `ReturnPage` и ответы страниц данных собираются через `_Obj` / `_Arr` / `_Json`. Функции `_ArrEx` / `_ObjEx` создают структуру сразу со значениями; `_Copy` копирует JSON через строковое представление. `QuotedStrJSON` и `EscapeJSON` готовят безопасные фрагменты для ручной сборки JSON-текста. После создания объекта доступны свойства и методы (`_Kind`, `_Count`, `AddValue`, `Exists` и др.) — ими же пользуются примеры EventScript при разборе состояния устройств и выборке записей журнала. Правило платформы: сначала структура (`_Json` / `_Obj`), затем поля; обратно в текст — `_ToStr` или `ToString`.

<a id="quotedstrjson"></a>
### `QuotedStrJSON`

*** `QuotedStrJSON` — Элемент скриптового API ****

`function QuotedStrJSON(S: String): String`

**Входные параметры:**
- `S: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(QuotedStrJSON('a"b')); // строка в JSON-кавычках с экранированием
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="escapejson"></a>
### `EscapeJSON`

*** `EscapeJSON` — Элемент скриптового API ****

`function EscapeJSON(S: String): String`

**Входные параметры:**
- `S: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(EscapeJSON('a"b')); // экранирование спецсимволов JSON без внешних кавычек
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="arr"></a>
### `_Arr`

*** `_Arr` — Создание JSON-массива ****

`function _Arr: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

переменная для хранения JSON-массива (по EventScript_desc.odt)

**Сведения из исходников / ODT:**

- Создаёт переменную для хранения JSON-массива.

**Пример вызова:**

```pascal
var
  x: Variant;                // JSON-массив
begin
  x := _Arr();               // создать пустой JSON-массив
  x.Add(10);                 // добавить элемент
  DebugLog(_ToStr(x));       // вывести массив как строку
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="arrex"></a>
### `_ArrEx`

*** `_ArrEx` — Создание JSON-массива со значениями ****

`function _ArrEx(A: array of Variant): Variant`

**Входные параметры:**
- `A: array of Variant` — массив начальных значений для JSON-массива (по EventScript_desc.odt)

**Возвращает:**

JSON-массив с добавленными значениями (по EventScript_desc.odt)

**Сведения из исходников / ODT:**

- Создаёт JSON-массив и добавляет переданные значения.

**Пример вызова:**

```pascal
var
  x: Variant;
begin
  x := _ArrEx([1, 2, 3]);     // создать массив с начальными значениями
  DebugLog(_ToStr(x));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="obj"></a>
### `_Obj`

*** `_Obj` — Создание JSON-объекта ****

`function _Obj: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

переменная для хранения JSON-объекта (по EventScript_desc.odt)

**Сведения из исходников / ODT:**

- Создаёт переменную для хранения JSON-объекта.

**Пример вызова:**

```pascal
var
  x: Variant;
begin
  x := _Obj();               // создать пустой JSON-объект
  x.AddValue('ID', 10);      // добавить поле
  DebugLog(_ToStr(x));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="objex"></a>
### `_ObjEx`

*** `_ObjEx` — Создание JSON-объекта с парами ****

`function _ObjEx(A: array of Variant): Variant`

**Входные параметры:**
- `A: array of Variant` — пары имя–значение для JSON-объекта (по EventScript_desc.odt)

**Возвращает:**

JSON-объект с переданными парами имя–значение (по EventScript_desc.odt)

**Сведения из исходников / ODT:**

- Создаёт JSON-объект из переданных пар имя—значение.

**Пример вызова:**

```pascal
var
  x: Variant;
begin
  x := _ObjEx(['ID', 10, 'Name', 'X']); // объект из пар имя/значение
  DebugLog(_ToStr(x));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="json"></a>
### `_Json`

*** `_Json` — Разбор JSON-строки ****

`function _Json(S: String): Variant`

**Входные параметры:**
- `S: String` — строка описания массива или объекта JSON (по EventScript_desc.odt)

**Возвращает:**

JSON-объект или JSON-массив, созданный из строки (по EventScript_desc.odt)

**Сведения из исходников / ODT:**

- Создаёт JSON-объект или JSON-массив из строки описания.

**Пример вызова:**

```pascal
var
  x: Variant;
begin
  x := _Json('{"ID":10}');   // разобрать JSON-строку
  DebugLog(_ToStr(x));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="copy"></a>
### `_Copy`

*** `_Copy` — Копирование значения ****

`function _Copy(V: Variant): Variant`

**Входные параметры:**
- `V: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- JSON-объект или JSON-массив копируется через его строковое представление; прочие значения возвращаются без такого копирования.

**Пример вызова:**

```pascal
var
  a, b: Variant;
begin
  a := _Json('{"ID":10}');   // исходный объект
  b := _Copy(a);             // копия JSON-значения
  DebugLog(_ToStr(b));
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

## `JSON-объект / JSON-массив`: свойства и методы

<a id="json-json-kind"></a>
### `JSON-объект / JSON-массив._Kind`

*** `JSON-объект / JSON-массив._Kind` — Тип JSON-переменной ****

`property _Kind: TDocVariantKind`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `TDocVariantKind` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Возвращает `dvObject` для объекта или `dvArray` для массива.

**Пример вызова:**

```pascal
begin
  // Свойство `_Kind` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-count"></a>
### `JSON-объект / JSON-массив._Count`

*** `JSON-объект / JSON-массив._Count` — Количество элементов ****

`property _Count: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Возвращает количество элементов массива или объекта.

**Пример вызова:**

```pascal
begin
  // Свойство `_Count` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-name"></a>
### `JSON-объект / JSON-массив.Name`

*** `JSON-объект / JSON-массив.Name` — Имя элемента объекта ****

`function Name(Idx: Integer): String`

**Входные параметры:**
- `Idx: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Возвращает имя значения в объекте по индексу.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Name(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-value"></a>
### `JSON-объект / JSON-массив.Value`

*** `JSON-объект / JSON-массив.Value` — Значение элемента ****

`function Value(Idx: Integer): Variant`

**Входные параметры:**
- `Idx: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Возвращает или задаёт значение в массиве либо объекте.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Value(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-exists"></a>
### `JSON-объект / JSON-массив.Exists`

*** `JSON-объект / JSON-массив.Exists` — Проверка существования ****

`function Exists(Name: String): Boolean`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Проверяет имя в объекте или значение в массиве.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Exists(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-add"></a>
### `JSON-объект / JSON-массив.Add`

*** `JSON-объект / JSON-массив.Add` — Добавление в массив ****

`function Add(V: Variant): Integer`

**Входные параметры:**
- `V: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Добавляет значение в массив и возвращает его индекс.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Add(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-addvalue"></a>
### `JSON-объект / JSON-массив.AddValue`

*** `JSON-объект / JSON-массив.AddValue` — Добавление в объект ****

`function AddValue(Name: String; V: Variant): Integer`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `V: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Добавляет имя и значение в объект и возвращает индекс.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := AddValue(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-delete"></a>
### `JSON-объект / JSON-массив.Delete`

*** `JSON-объект / JSON-массив.Delete` — Удаление элемента ****

`procedure Delete(Idx: Integer)`

**Входные параметры:**
- `Idx: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Удаляет элемент из массива или объекта.

**Пример вызова:**

```pascal
begin
  // Delete(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-tostring"></a>
### `JSON-объект / JSON-массив.ToString`

*** `JSON-объект / JSON-массив.ToString` — Преобразование в строку ****

`function ToString: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Преобразует массив или объект в строку.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := ToString(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---
