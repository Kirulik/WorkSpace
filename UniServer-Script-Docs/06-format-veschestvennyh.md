# Формат представления вещественных чисел

Вещественные значения в весовой системе нельзя произвольно округлять: погрешность и дискрет весов задают допустимое представление массы. `SetFormatPrecision` округляет по числу знаков после запятой; `SetFormatRoundFromDiscret` сначала приводит значение к сетке дискрета, затем — к заданной точности (при слишком малом дискрете подставляется нижняя граница из реализации). В ScriptsBunkerScale / ScriptsCraneScale любое значение массы перед записью в `Result_*` или журнал пропускают через `SetFormatPrecision(..., Massa_Precision)`. Эти функции применяют перед записью веса в журнал, показом на странице или передачей в сообщение, чтобы везде использовалась одна «законная» величина.

<a id="setformatprecision"></a>
### `SetFormatPrecision`

*** `SetFormatPrecision` — Округление по точности ****

`function SetFormatPrecision(Value: Double; Precision: Integer): Double`

**Входные параметры:**
- `Value: Double` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Precision: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Вычисляет `round(Value * 10^Precision) / 10^Precision`.
- Округление `round(Value * 10^Precision) / 10^Precision` (fsCommon).
- В весовых Scripts* любое значение массы перед записью в Result_* / журнал пропускают через `SetFormatPrecision(..., Massa_Precision)`.

**Пример вызова:**

```pascal
var
  m: Double;
begin
  // ScriptsBunkerScale / CraneScale
  m := SetFormatPrecision(Result_CURRENT_MASSA, Massa_Precision);
  Result_OP_MASSA := m;
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`; `Материалы для документации/Скрипты/ScriptsBunkerScale`; `Материалы для документации/Скрипты/ScriptsCraneScale`

---

<a id="setformatroundfromdiscret"></a>
### `SetFormatRoundFromDiscret`

*** `SetFormatRoundFromDiscret` — Округление по дискрету ****

`function SetFormatRoundFromDiscret(Value: double; Precision: integer; Discret: double): Double`

**Входные параметры:**
- `Value: double` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Precision: integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Discret: double` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Если `Discret < 0.00000001`, он заменяется на `0.00000001`.
- Вычисляет `SetFormatPrecision(round(Value / Discret) * Discret, Precision)`.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(SetFormatRoundFromDiscret(1.23, 2, 0.05))); // округление к дискрету
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

---
