# Представление HEX чисел

Hex-преобразования обслуживают обмен с оборудованием и двоичными протоколами: вес, пакеты весов, кадры устройств часто приходят или уходят как hex-строки фиксированной ширины (`ByteToHex`, `WordToHex`, `IntToHex` и обратные `HexTo*`). `StrToHex` / `HexToStr` учитывают кодовую страницу через `TSynAnsiConvert`. Раздел тесно связан с CRC: контрольные суммы считаются по hex-представлению буфера.

<a id="bytetohex"></a>

# `ByteToHex` — Byte в hex

## Синтаксис

```pascal
function ByteToHex(Value: Byte): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `Byte` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Byte в hex.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Возвращает hex-строку фиксированной ширины 2 символа.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(ByteToHex(255)); // Byte -> hex (ширина 2)
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="wordtohex"></a>

# `WordToHex` — Word в hex

## Синтаксис

```pascal
function WordToHex(Value: Word): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `Word` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Word в hex.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Возвращает hex-строку фиксированной ширины 4 символа.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(WordToHex(65535)); // Word -> hex (ширина 4)
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="inttohex"></a>

# `IntToHex` — Integer в hex

## Синтаксис

```pascal
function IntToHex(Value: Integer): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Integer в hex.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Возвращает hex-строку фиксированной ширины 8 символов.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(IntToHex(1)); // Integer -> hex (ширина 8)
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="int64tohex"></a>

# `Int64ToHex` — Int64 в hex

## Синтаксис

```pascal
function Int64ToHex(Value: Int64): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `Int64` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Int64 в hex.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Возвращает hex-строку фиксированной ширины 16 символов.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(Int64ToHex(1)); // Int64 -> hex (ширина 16)
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="doubletohex"></a>

# `DoubleToHex` — Double в hex

## Синтаксис

```pascal
function DoubleToHex(Value: Double): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `Double` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Double в hex.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует `Double` в hex-строку.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(DoubleToHex(1.0)); // Double -> hex
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="singletohex"></a>

# `SingleToHex` — Single в hex

## Синтаксис

```pascal
function SingleToHex(Value: Single): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `Single` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Single в hex.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует `Single` в hex-строку.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(SingleToHex(1.0)); // Single -> hex
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextobyte"></a>

# `HexToByte` — Hex в Byte

## Синтаксис

```pascal
function HexToByte(Value: String): byte
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Hex в Byte.

Значение типа `byte` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует hex-строку в `Byte`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(HexToByte('FF'))); // hex -> Byte
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextoword"></a>

# `HexToWord` — Hex в Word

## Синтаксис

```pascal
function HexToWord(Value: String): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Hex в Word.

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует hex-строку в целое (Word/Integer по RTTI).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(HexToWord('FFFF'))); // hex -> Word
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextolongword"></a>

# `HexToLongWord` — Hex в LongWord

## Синтаксис

```pascal
function HexToLongWord(Value: String): Word
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Hex в LongWord.

Значение типа `Word` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует hex-строку в LongWord (сигнатура RTTI: Word).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(HexToLongWord('00000001'))); // hex -> LongWord
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextoint"></a>

# `HexToInt` — Hex в Integer

## Синтаксис

```pascal
function HexToInt(Value: String): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Hex в Integer.

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует hex-строку в `Integer`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(HexToInt('00000001'))); // hex -> Integer
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextoint64"></a>

# `HexToInt64` — Hex в Int64

## Синтаксис

```pascal
function HexToInt64(Value: String): Int64
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Hex в Int64.

Значение типа `Int64` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует hex-строку в `Int64`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(HexToInt64('0000000000000001'))); // hex -> Int64
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextodouble"></a>

# `HexToDouble` — Hex в Double

## Синтаксис

```pascal
function HexToDouble(Value: String): Double
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Hex в Double.

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует hex-строку в `Double`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(HexToDouble(DoubleToHex(1.5)))); // hex -> Double
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextosingle"></a>

# `HexToSingle` — Hex в Single

## Синтаксис

```pascal
function HexToSingle(Value: String): Single
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Hex в Single.

Значение типа `Single` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Преобразует hex-строку в `Single`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(HexToSingle(SingleToHex(1.5)))); // hex -> Single
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="strtohex"></a>

# `StrToHex` — Преобразование строки в hex

## Синтаксис

```pascal
function StrToHex(S: String; CodePage: Integer): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `S` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `CodePage` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Преобразование строки в hex.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Для заданной кодовой страницы используется `TSynAnsiConvert`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(StrToHex('A', 1251)); // строка -> hex с кодовой страницей
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextostr"></a>

# `HexToStr` — Преобразование hex в строку

## Синтаксис

```pascal
function HexToStr(Value: String; CodePage: Integer): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `CodePage` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Преобразование hex в строку.

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Для заданной кодовой страницы используется `TSynAnsiConvert`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(HexToStr(StrToHex('A', 1251), 1251)); // hex -> строка с кодовой страницей
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---
