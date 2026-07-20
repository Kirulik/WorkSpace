# Hex преобразованеие чисел

Hex-преобразования обслуживают обмен с оборудованием и двоичными протоколами: вес, пакеты весов, кадры устройств часто приходят или уходят как hex-строки фиксированной ширины (`ByteToHex`, `WordToHex`, `IntToHex` и обратные `HexTo*`). `StrToHex` / `HexToStr` учитывают кодовую страницу через `TSynAnsiConvert` — это мост между текстовым представлением в скрипте и байтовым содержимым протокола. Раздел тесно связан с CRC: контрольные суммы считаются по hex-представлению буфера. Для прикладной логики киоска hex обычно не нужен; он появляется в плагинах, которые разбирают или собирают пакеты устройств.

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

*** `DoubleToHex` — Double в hex ****

`function DoubleToHex(Value: Double): String`

**Входные параметры:**
- `Value: Double` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует `Double` в hex-строку.

**Пример вызова:**

```pascal
begin
  DebugLog(DoubleToHex(1.0)); // Double -> hex
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="singletohex"></a>
### `SingleToHex`

*** `SingleToHex` — Single в hex ****

`function SingleToHex(Value: Single): String`

**Входные параметры:**
- `Value: Single` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует `Single` в hex-строку.

**Пример вызова:**

```pascal
begin
  DebugLog(SingleToHex(1.0)); // Single -> hex
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextobyte"></a>
### `HexToByte`

*** `HexToByte` — Hex в Byte ****

`function HexToByte(Value: String): byte`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `byte` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует hex-строку в `Byte`.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToByte('FF'))); // hex -> Byte
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextoword"></a>
### `HexToWord`

*** `HexToWord` — Hex в Word ****

`function HexToWord(Value: String): Integer`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует hex-строку в целое (Word/Integer по RTTI).

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToWord('FFFF'))); // hex -> Word
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextolongword"></a>
### `HexToLongWord`

*** `HexToLongWord` — Hex в LongWord ****

`function HexToLongWord(Value: String): Word`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Word` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует hex-строку в LongWord (сигнатура RTTI: Word).

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToLongWord('00000001'))); // hex -> LongWord
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextoint"></a>
### `HexToInt`

*** `HexToInt` — Hex в Integer ****

`function HexToInt(Value: String): Integer`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует hex-строку в `Integer`.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToInt('00000001'))); // hex -> Integer
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextoint64"></a>
### `HexToInt64`

*** `HexToInt64` — Hex в Int64 ****

`function HexToInt64(Value: String): Int64`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Int64` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует hex-строку в `Int64`.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToInt64('0000000000000001'))); // hex -> Int64
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextodouble"></a>
### `HexToDouble`

*** `HexToDouble` — Hex в Double ****

`function HexToDouble(Value: String): Double`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует hex-строку в `Double`.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToDouble(DoubleToHex(1.5)))); // hex -> Double
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextosingle"></a>
### `HexToSingle`

*** `HexToSingle` — Hex в Single ****

`function HexToSingle(Value: String): Single`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Single` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Преобразует hex-строку в `Single`.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(HexToSingle(SingleToHex(1.5)))); // hex -> Single
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

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
