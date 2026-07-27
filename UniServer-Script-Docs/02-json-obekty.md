# JSON объекты

JSON — основной структурный формат данных в скриптах UniServer. Сообщения несут `Value` типа `Variant`, часто как JSON-объект; фильтры `GetRecords`, документы `SetRecord`, параметры `ReturnPage` и ответы страниц данных собираются через `_Obj` / `_Arr` / `_Json`. Функции `_ArrEx` / `_ObjEx` создают структуру сразу со значениями; `_Copy` копирует JSON через строковое представление. `QuotedStrJSON` и `EscapeJSON` готовят безопасные фрагменты для ручной сборки JSON-текста. После создания объекта доступны свойства и методы (`_Kind`, `_Count`, `AddValue`, `Exists` и др.). Правило платформы: сначала структура (`_Json` / `_Obj`), затем поля; обратно в текст — `_ToStr` или `ToString`.

<a id="quotedstrjson"></a>

# `QuotedStrJSON` — Строка в кавычках JSON

## Синтаксис

```pascal
function QuotedStrJSON(S: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Строка в кавычках JSON.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Заключает строку в JSON-кавычки.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(QuotedStrJSON('a"b')); // строка в JSON-кавычках с экранированием
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="escapejson"></a>

# `EscapeJSON` — Экранирование JSON

## Синтаксис

```pascal
function EscapeJSON(S: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Экранирование JSON.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Экранирует спецсимволы для JSON-строки.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(EscapeJSON('a"b')); // экранирование спецсимволов JSON без внешних кавычек
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="arr"></a>

# `_Arr` — Создание JSON-массива

## Синтаксис

```pascal
function _Arr: Variant
```

## Параметры

_Параметры отсутствуют._

## Описание

Создание JSON-массива.

переменная для хранения JSON-массива (по EventScript_desc.odt)

> **Особенности:** Создаёт переменную для хранения JSON-массива.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: Variant;                // JSON-массив
begin
  x := _Arr();               // создать пустой JSON-массив
  x.Add(10);                 // добавить элемент
  DebugLog(_ToStr(x));       // вывести массив как строку
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="arrex"></a>

# `_ArrEx` — Создание JSON-массива со значениями

## Синтаксис

```pascal
function _ArrEx(A: array of Variant): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `A` | `array of Variant` | массив начальных значений для JSON-массива (по EventScript_desc.odt) |

## Описание

Создание JSON-массива со значениями.

JSON-массив с добавленными значениями (по EventScript_desc.odt)

> **Особенности:** Создаёт JSON-массив и добавляет переданные значения.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: Variant;
begin
  x := _ArrEx([1, 2, 3]);     // создать массив с начальными значениями
  DebugLog(_ToStr(x));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="obj"></a>

# `_Obj` — Создание JSON-объекта

## Синтаксис

```pascal
function _Obj: Variant
```

## Параметры

_Параметры отсутствуют._

## Описание

Создание JSON-объекта.

переменная для хранения JSON-объекта (по EventScript_desc.odt)

> **Особенности:** Создаёт переменную для хранения JSON-объекта.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: Variant;
begin
  x := _Obj();               // создать пустой JSON-объект
  x.AddValue('ID', 10);      // добавить поле
  DebugLog(_ToStr(x));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="objex"></a>

# `_ObjEx` — Создание JSON-объекта с парами

## Синтаксис

```pascal
function _ObjEx(A: array of Variant): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `A` | `array of Variant` | пары имя–значение для JSON-объекта (по EventScript_desc.odt) |

## Описание

Создание JSON-объекта с парами.

JSON-объект с переданными парами имя–значение (по EventScript_desc.odt)

> **Особенности:** Создаёт JSON-объект из переданных пар имя—значение.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: Variant;
begin
  x := _ObjEx(['ID', 10, 'Name', 'X']); // объект из пар имя/значение
  DebugLog(_ToStr(x));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="json"></a>

# `_Json` — Разбор JSON-строки

## Синтаксис

```pascal
function _Json(S: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | строка описания массива или объекта JSON (по EventScript_desc.odt) |

## Описание

Разбор JSON-строки.

JSON-объект или JSON-массив, созданный из строки (по EventScript_desc.odt)

> **Особенности:** Создаёт JSON-объект или JSON-массив из строки описания.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: Variant;
begin
  x := _Json('{"ID":10}');   // разобрать JSON-строку
  DebugLog(_ToStr(x));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`

---

<a id="copy"></a>

# `_Copy` — Копирование значения

## Синтаксис

```pascal
function _Copy(V: Variant): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `V` | `Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Копирование значения.

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> **Особенности:** JSON-объект или JSON-массив копируется через его строковое представление; прочие значения возвращаются без такого копирования.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  a, b: Variant;
begin
  a := _Json('{"ID":10}');   // исходный объект
  b := _Copy(a);             // копия JSON-значения
  DebugLog(_ToStr(b));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

## `JSON-объект / JSON-массив`: свойства и методы

<a id="json-json-kind"></a>

# `_Kind` — Тип JSON-переменной

## Синтаксис

```pascal
property _Kind: TDocVariantKind
```

## Параметры

_Параметры отсутствуют._

## Описание

Тип JSON-переменной.

Значение типа `TDocVariantKind` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Возвращает `dvObject` для объекта или `dvArray` для массива.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Свойство `_Kind` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-count"></a>

# `_Count` — Количество элементов

## Синтаксис

```pascal
property _Count: Integer
```

## Параметры

_Параметры отсутствуют._

## Описание

Количество элементов.

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Возвращает количество элементов массива или объекта.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Свойство `_Count` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-name"></a>

# `Name` — Имя элемента объекта

## Синтаксис

```pascal
function Name(Idx: Integer): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Idx` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Имя элемента объекта.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Возвращает имя значения в объекте по индексу.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Name(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-value"></a>

# `Value` — Значение элемента

## Синтаксис

```pascal
function Value(Idx: Integer): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Idx` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Значение элемента.

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Возвращает или задаёт значение в массиве либо объекте.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Value(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-exists"></a>

# `Exists` — Проверка существования

## Синтаксис

```pascal
function Exists(Name: String): Boolean
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Проверка существования.

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Проверяет имя в объекте или значение в массиве.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Exists(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-add"></a>

# `Add` — Добавление в массив

## Синтаксис

```pascal
function Add(V: Variant): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `V` | `Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Добавление в массив.

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Добавляет значение в массив и возвращает его индекс.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Add(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-addvalue"></a>

# `AddValue` — Добавление в объект

## Синтаксис

```pascal
function AddValue(Name: String; V: Variant): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `V` | `Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Добавление в объект.

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Добавляет имя и значение в объект и возвращает индекс.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := AddValue(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-delete"></a>

# `Delete` — Удаление элемента

## Синтаксис

```pascal
procedure Delete(Idx: Integer)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Idx` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Удаление элемента.

_Процедура ничего не возвращает._

> **Особенности:** Удаляет элемент из массива или объекта.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Delete(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---

<a id="json-json-tostring"></a>

# `ToString` — Преобразование в строку

## Синтаксис

```pascal
function ToString: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Преобразование в строку.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует массив или объект в строку.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := ToString(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsJsonVar.pas`

---
