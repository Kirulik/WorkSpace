# Работа со строками

Строковый слой API закрывает повседневную обработку текста в PascalScript: регистр, длина, поиск, замена и форматирование. Поиск `Pos` и замена `StringReplace` выполняются без учёта регистра — это нужно учитывать при сравнении кодов, номеров ТС и имён полей. Семейство `Format` / `FormatUtf8` / `FormatJson` / `FormatFloat` собирает строки для логов, HTTP-ответов и JSON: в веб-интерфейсе плагина (как в киоске AutoScaleWebKiosk1) страница часто отдаёт JSON или HTML, собранный из параметров и глобальных переменных. Строковые функции не «знают» о сервере — они готовят данные, которые затем уходят в `ReturnText`, сообщение или поле журнала.

<a id="quotedstr"></a>
### `QuotedStr`

*** `QuotedStr` — Заключение строки в кавычки ****

`function QuotedStr(S: String): String`

**Входные параметры:**
- `S: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает строку в кавычках Pascal.

**Пример вызова:**

```pascal
var
  s: String;                 // результат с кавычками
begin
  s := QuotedStr('abc');     // обернуть строку в кавычки
  DebugLog(s);               // вывести результат
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="uppercase"></a>
### `UpperCase`

*** `UpperCase` — Верхний регистр ****

`function UpperCase(S: String): String`

**Входные параметры:**
- `S: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Переводит строку в верхний регистр.

**Пример вызова:**

```pascal
begin
  DebugLog(UpperCase('abc')); // преобразовать к верхнему регистру
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="lowercase"></a>
### `LowerCase`

*** `LowerCase` — Нижний регистр ****

`function LowerCase(S: String): String`

**Входные параметры:**
- `S: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Переводит строку в нижний регистр.

**Пример вызова:**

```pascal
begin
  DebugLog(LowerCase('ABC')); // преобразовать к нижнему регистру
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="length"></a>
### `Length`

*** `Length` — Длина строки ****

`function Length(S: String): Integer`

**Входные параметры:**
- `S: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает число символов в строке.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(Length('abc'))); // длина строки
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="pos"></a>
### `Pos`

*** `Pos` — Поиск подстроки ****

`function Pos(SubStr: String; Str: String): Integer`

**Входные параметры:**
- `SubStr: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Str: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Используется регистронезависимый поиск `PosI`.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(Pos('b', 'abc'))); // позиция подстроки (поиск без учёта регистра)
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="stringreplace"></a>
### `StringReplace`

*** `StringReplace` — Замена подстрок ****

`function StringReplace(const S, OldPattern, NewPattern: String): String`

**Входные параметры:**
- `S: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `OldPattern: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `NewPattern: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Используются флаги `rfReplaceAll` и `rfIgnoreCase`.

**Пример вызова:**

```pascal
begin
  DebugLog(StringReplace('a-a', 'a', 'x')); // заменить все вхождения без учёта регистра
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="format"></a>
### `Format`

*** `Format` — Форматирование строки ****

`function Format(Fmt: String; Args: array of Variant): String`

**Входные параметры:**
- `Fmt: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Args: array of Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Собирает строку по шаблону и аргументам.

**Пример вызова:**

```pascal
begin
  DebugLog(Format('%s-%d', ['A', 1])); // сформировать строку по шаблону Format
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="formatutf8"></a>
### `FormatUtf8`

*** `FormatUtf8` — Форматирование UTF-8 ****

`function FormatUtf8(Fmt: String; Args: array of Variant): String`

**Входные параметры:**
- `Fmt: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Args: array of Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Форматирует строку с учётом UTF-8.

**Пример вызова:**

```pascal
begin
  DebugLog(FormatUtf8('%s', ['тест'])); // форматирование через FormatUtf8
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="formatjson"></a>
### `FormatJson`

*** `FormatJson` — Форматирование для JSON ****

`function FormatJson(Fmt: String; Args: array of Variant): String`

**Входные параметры:**
- `Fmt: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Args: array of Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Форматирует строку для использования в JSON-контексте.

**Пример вызова:**

```pascal
begin
  DebugLog(FormatJson('{"n":?}', ['x'])); // форматирование с JSON-экранированием аргументов
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="formatfloat"></a>
### `FormatFloat`

*** `FormatFloat` — Форматирование вещественного числа ****

`function FormatFloat(Fmt: String; Value: Double): String`

**Входные параметры:**
- `Fmt: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Value: Double` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Форматирует `Double` по заданному шаблону.

**Пример вызова:**

```pascal
begin
  DebugLog(FormatFloat('0.00', 1.5)); // формат вещественного числа
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---
