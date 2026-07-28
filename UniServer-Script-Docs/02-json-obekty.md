# JSON объекты

JSON — основной структурный формат данных в скриптах UniServer. Сообщения несут `Value` типа `Variant`, часто как JSON-объект; фильтры `GetRecords`, документы `SetRecord`, параметры `ReturnPage` и ответы страниц данных собираются через `_Obj` / `_Arr` / `_Json`. Функции `_ArrEx` / `_ObjEx` создают структуру сразу со значениями; `_Copy` копирует JSON через строковое представление. `QuotedStrJSON` и `EscapeJSON` готовят безопасные фрагменты для ручной сборки JSON-текста. Правило платформы: сначала структура (`_Json` / `_Obj`), затем поля; обратно в текст — обычно `_ToStr`.

## Структура JSON-объекта и JSON-массива

После `_Obj` / `_Arr` / `_Json` / `_ObjEx` / `_ArrEx` переменная хранит JSON-структуру. Поля объекта часто читают и пишут по имени (`x.ID`, `x.Enabled := True`); для перебора, проверки и изменения коллекции используют члены ниже (по EventScript_desc.odt / `fsJsonVar.pas`).

| Член | Сигнатура | Назначение |
|------|-----------|------------|
| `_Kind` | `property _Kind: TDocVariantKind` | тип: `dvObject` или `dvArray` |
| `_Count` | `property _Count: Integer` | число элементов |
| `Name` | `function Name(Idx: Integer): String` | имя поля объекта по индексу |
| `Value` | `function Value(Idx: Integer): Variant` | значение по индексу (массив или объект); также `Value('Field')` / присвоение |
| `Exists` | `function Exists(Name: String): Boolean` | есть ли имя в объекте (или значение в массиве) |
| `Add` | `function Add(V: Variant): Integer` | добавить элемент в массив, вернуть индекс |
| `AddValue` | `function AddValue(Name: String; V: Variant): Integer` | добавить поле в объект, вернуть индекс |
| `Delete` | `procedure Delete(Idx: Integer)` | удалить элемент по индексу |
| `ToString` | `function ToString: String` | перевести структуру в строку (в скриптах чаще используют `_ToStr`) |

```pascal
x := _Obj();
x.AddValue('ID', 10);
if x.Exists('ID') then
  DebugLog(x.Name(0) + '=' + _ToStr(x.Value(0)));

Docs := GetRecords('WeighingJournal', Args);
Doc := Docs.Value(0);  // элемент JSON-массива
```

_Источник:_ `EventScript_desc.odt`; `fsJsonVar.pas`; примеры — Scripts* (`Exists`, `Value`, `Name`, `AddValue`).


<a id="quotedstrjson"></a>

# `QuotedStrJSON` — Строка в кавычках JSON

## Синтаксис

```pascal
function QuotedStrJSON(S: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает строку в JSON-кавычках.

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
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает строку с экранированными спецсимволами JSON.

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

Возвращает новый пустой JSON-массив.

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

Возвращает JSON-массив, сразу заполненный переданными значениями.

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

Возвращает новый пустой JSON-объект.

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

Возвращает JSON-объект из переданных пар имя—значение.

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

Возвращает JSON-объект или JSON-массив, разобранный из строки.

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
| `V` | `Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает копию значения.

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
