# Функции CRC8 и CRC16

Документ сформирован по регистрации RTTI и проверенным сведениям исходников/ODT.

<a id="hextocrc8summod2"></a>
### `HexToCRC8SumMod2`

*** `HexToCRC8SumMod2` — CRC8 в hex ****

`function HexToCRC8SumMod2(SourceStr: String; AIndex, Count: integer; FirstByte: byte): String`

**Входные параметры:**
- `SourceStr: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `AIndex: integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Count: integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `FirstByte: byte` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Результат CRC8 представлен hex-строкой из 2 символов.

**Пример вызова:**

```pascal
begin
  DebugLog(HexToCRC8SumMod2('0102', 0, 2, 0)); // CRC8 SumMod2 по hex-данным
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextocrc8sum"></a>
### `HexToCRC8Sum`

*** `HexToCRC8Sum` — CRC8 в hex ****

`function HexToCRC8Sum(SourceStr: String; AIndex, ACount: integer; FirstByte: byte): String`

**Входные параметры:**
- `SourceStr: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `AIndex: integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `ACount: integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `FirstByte: byte` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Результат CRC8 представлен hex-строкой из 2 символов.

**Пример вызова:**

```pascal
begin
  DebugLog(HexToCRC8Sum('0102', 0, 2, 0)); // CRC8 Sum по hex-данным
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextocrc8polinom"></a>
### `HexToCRC8Polinom`

*** `HexToCRC8Polinom` — CRC8 по полиному ****

`function HexToCRC8Polinom(SourceStr: String; AIndex, ACount: integer; Poly, Init: word; ReflIn: boolean; XorOut: word): String`

**Входные параметры:**
- `SourceStr: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `AIndex: integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `ACount: integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Poly: word` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Init: word` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `ReflIn: boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `XorOut: word` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Результат CRC8 представлен hex-строкой из 2 символов.

**Пример вызова:**

```pascal
begin
  // Параметры Poly/Init/ReflIn/XorOut задаются по требованиям протокола оборудования
  DebugLog(HexToCRC8Polinom('0102', 0, 2, 0, 0, False, 0));
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextocrc16polinom"></a>
### `HexToCRC16Polinom`

*** `HexToCRC16Polinom` — CRC16 по полиному ****

`function HexToCRC16Polinom(SourceStr: String; AIndex, ACount: integer; Poly, Init: word; ReflIn: boolean; XorOut: word): String`

**Входные параметры:**
- `SourceStr: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `AIndex: integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `ACount: integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Poly: word` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Init: word` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `ReflIn: boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `XorOut: word` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Результат CRC16 представлен hex-строкой из 4 символов.

**Пример вызова:**

```pascal
begin
  // Параметры Poly/Init/ReflIn/XorOut задаются по требованиям протокола оборудования
  DebugLog(HexToCRC16Polinom('0102', 0, 2, 0, 0, False, 0));
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---
