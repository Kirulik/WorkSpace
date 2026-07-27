# Строки и форматирование

Строковый слой API закрывает повседневную обработку текста в PascalScript: регистр, длина, поиск, замена и форматирование. Поиск `Pos` и замена `StringReplace` выполняются без учёта регистра — это нужно учитывать при сравнении кодов, номеров ТС и имён полей. Семейство `Format` / `FormatUtf8` / `FormatJson` / `FormatFloat` собирает строки для логов, HTTP-ответов и JSON. Строковые функции не «знают» о сервере — они готовят данные, которые затем уходят в `ReturnText`, сообщение или поле журнала.

<a id="quotedstr"></a>

# `QuotedStr` — Заключение строки в кавычки

## Синтаксис

```pascal
function QuotedStr(S: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает строку в кавычках Pascal. Удобно для формирования литералов и отладочного вывода.

> **Особенности:** Возвращает строку в кавычках Pascal.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  s: String;                 // результат с кавычками
begin
  s := QuotedStr('abc');     // обернуть строку в кавычки
  DebugLog(s);               // вывести результат
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="uppercase"></a>

# `UpperCase` — Верхний регистр

## Синтаксис

```pascal
function UpperCase(S: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает копию строки в верхнем регистре.

> **Особенности:** Переводит строку в верхний регистр.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(UpperCase('abc')); // преобразовать к верхнему регистру
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="lowercase"></a>

# `LowerCase` — Нижний регистр

## Синтаксис

```pascal
function LowerCase(S: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает копию строки в нижнем регистре.

> **Особенности:** Переводит строку в нижний регистр.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(LowerCase('ABC')); // преобразовать к нижнему регистру
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="length"></a>

# `Length` — Длина строки

## Синтаксис

```pascal
function Length(S: String): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает длину строки в символах.

> **Особенности:** Возвращает число символов в строке.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(Length('abc'))); // длина строки
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="pos"></a>

# `Pos` — Поиск подстроки

## Синтаксис

```pascal
function Pos(SubStr: String; Str: String): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `SubStr` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `Str` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает позицию вхождения подстроки (регистр не учитывается) или 0, если не найдена.

> **Особенности:** Используется регистронезависимый поиск `PosI`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(Pos('b', 'abc'))); // позиция подстроки (поиск без учёта регистра)
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="stringreplace"></a>

# `StringReplace` — Замена подстрок

## Синтаксис

```pascal
function StringReplace(const S, OldPattern, NewPattern: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `OldPattern` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `NewPattern` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает строку после замены всех вхождений подстроки без учёта регистра.

> **Особенности:** Используются флаги `rfReplaceAll` и `rfIgnoreCase`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(StringReplace('a-a', 'a', 'x')); // заменить все вхождения без учёта регистра
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="format"></a>

# `Format` — Форматирование строки

## Синтаксис

```pascal
function Format(Fmt: String; Args: array of Variant): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Fmt` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `Args` | `array of Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает строку, собранную по шаблону и списку аргументов.

> **Особенности:** Собирает строку по шаблону и аргументам.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(Format('%s-%d', ['A', 1])); // сформировать строку по шаблону Format
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="formatutf8"></a>

# `FormatUtf8` — Форматирование UTF-8

## Синтаксис

```pascal
function FormatUtf8(Fmt: String; Args: array of Variant): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Fmt` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `Args` | `array of Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает отформатированную строку с учётом UTF-8.

> **Особенности:** Форматирует строку с учётом UTF-8.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(FormatUtf8('%s', ['тест'])); // форматирование через FormatUtf8
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="formatjson"></a>

# `FormatJson` — Форматирование для JSON

## Синтаксис

```pascal
function FormatJson(Fmt: String; Args: array of Variant): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Fmt` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `Args` | `array of Variant` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает строку, отформатированную для безопасного использования в JSON-контексте.

> **Особенности:** Форматирует строку для использования в JSON-контексте.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(FormatJson('{"n":?}', ['x'])); // форматирование с JSON-экранированием аргументов
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="formatfloat"></a>

# `FormatFloat` — Форматирование вещественного числа

## Синтаксис

```pascal
function FormatFloat(Fmt: String; Value: Double): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Fmt` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `Value` | `Double` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает текстовое представление вещественного числа по заданному шаблону.

> **Особенности:** Форматирует `Double` по заданному шаблону.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(FormatFloat('0.00', 1.5)); // формат вещественного числа
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---
