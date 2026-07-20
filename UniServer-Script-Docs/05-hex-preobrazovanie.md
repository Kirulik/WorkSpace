# Hex преобразованеие чисел

Документ сформирован по регистрации RTTI и проверенным сведениям исходников/ODT.

<a id="bytetohex"></a>
### `ByteToHex`

*** `ByteToHex` — Byte в hex ****

`function ByteToHex(Value: Byte): String`

**Входные параметры:**
- `Value: Byte` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает hex-строку фиксированной ширины 2 символа.

**Пример вызова:**

```pascal
begin
  DebugLog(ByteToHex(255)); // Byte -> hex (ширина 2)
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="wordtohex"></a>
### `WordToHex`

*** `WordToHex` — Word в hex ****

`function WordToHex(Value: Word): String`

**Входные параметры:**
- `Value: Word` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает hex-строку фиксированной ширины 4 символа.

**Пример вызова:**

```pascal
begin
  DebugLog(WordToHex(65535)); // Word -> hex (ширина 4)
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="inttohex"></a>
### `IntToHex`

*** `IntToHex` — Integer в hex ****

`function IntToHex(Value: Integer): String`

**Входные параметры:**
- `Value: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает hex-строку фиксированной ширины 8 символов.

**Пример вызова:**

```pascal
begin
  DebugLog(IntToHex(1)); // Integer -> hex (ширина 8)
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="int64tohex"></a>
### `Int64ToHex`

*** `Int64ToHex` — Int64 в hex ****

`function Int64ToHex(Value: Int64): String`

**Входные параметры:**
- `Value: Int64` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает hex-строку фиксированной ширины 16 символов.

**Пример вызова:**

```pascal
begin
  DebugLog(Int64ToHex(1)); // Int64 -> hex (ширина 16)
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="doubletohex"></a>
### `DoubleToHex`

*** `DoubleToHex` — Элемент скриптового API ****

`function DoubleToHex(Value: Double): String`

**Входные параметры:**
- `Value: Double` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(DoubleToHex(1.0)); // Double -> hex
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="singletohex"></a>
### `SingleToHex`

*** `SingleToHex` — Элемент скриптового API ****

`function SingleToHex(Value: Single): String`

**Входные параметры:**
- `Value: Single` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(SingleToHex(1.0)); // Single -> hex
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="hextobyte"></a>
### `HexToByte`

*** `HexToByte` — Элемент скриптового API ****

`function HexToByte(Value: String): byte`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `byte` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToByte('FF'))); // hex -> Byte
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="hextoword"></a>
### `HexToWord`

*** `HexToWord` — Элемент скриптового API ****

`function HexToWord(Value: String): Integer`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToWord('FFFF'))); // hex -> Word
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="hextolongword"></a>
### `HexToLongWord`

*** `HexToLongWord` — Элемент скриптового API ****

`function HexToLongWord(Value: String): Word`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Word` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToLongWord('00000001'))); // hex -> LongWord
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="hextoint"></a>
### `HexToInt`

*** `HexToInt` — Элемент скриптового API ****

`function HexToInt(Value: String): Integer`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToInt('00000001'))); // hex -> Integer
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="hextoint64"></a>
### `HexToInt64`

*** `HexToInt64` — Элемент скриптового API ****

`function HexToInt64(Value: String): Int64`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Int64` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToInt64('0000000000000001'))); // hex -> Int64
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="hextodouble"></a>
### `HexToDouble`

*** `HexToDouble` — Элемент скриптового API ****

`function HexToDouble(Value: String): Double`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToDouble(DoubleToHex(1.5)))); // hex -> Double
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="hextosingle"></a>
### `HexToSingle`

*** `HexToSingle` — Элемент скриптового API ****

`function HexToSingle(Value: String): Single`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Single` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToSingle(SingleToHex(1.5)))); // hex -> Single
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="strtohex"></a>
### `StrToHex`

*** `StrToHex` — Преобразование строки в hex ****

`function StrToHex(S: String; CodePage: Integer): String`

**Входные параметры:**
- `S: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `CodePage: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Для заданной кодовой страницы используется `TSynAnsiConvert`.

**Пример вызова:**

```pascal
begin
  DebugLog(StrToHex('A', 1251)); // строка -> hex с кодовой страницей
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextostr"></a>
### `HexToStr`

*** `HexToStr` — Преобразование hex в строку ****

`function HexToStr(Value: String; CodePage: Integer): String`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `CodePage: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Для заданной кодовой страницы используется `TSynAnsiConvert`.

**Пример вызова:**

```pascal
begin
  DebugLog(HexToStr(StrToHex('A', 1251), 1251)); // hex -> строка с кодовой страницей
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---
