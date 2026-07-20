# Формат представления вещественных чисел

Документ сформирован по регистрации RTTI и проверенным сведениям исходников/ODT.

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

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(SetFormatPrecision(1.2345, 2))); // округление до 2 знаков
end
```

_Источник сведений:_ `Материалы для документации/source/fsCommon.pas`

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
