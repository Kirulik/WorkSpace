# Формат вещественных чисел

Вещественные значения в весовой системе нельзя произвольно округлять: погрешность и дискрет весов задают допустимое представление массы. `SetFormatPrecision` округляет по числу знаков после запятой; `SetFormatRoundFromDiscret` сначала приводит значение к сетке дискрета, затем — к заданной точности. В ScriptsBunkerScale / ScriptsCraneScale любое значение массы перед записью в `Result_*` или журнал пропускают через `SetFormatPrecision(..., Massa_Precision)`.

<a id="setformatprecision"></a>

# `SetFormatPrecision` — Округление по точности

## Синтаксис

```pascal
function SetFormatPrecision(Value: Double; Precision: Integer): Double
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `Double` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `Precision` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает значение, округлённое до указанного числа знаков после запятой.

> **Особенности:** Вычисляет `round(Value * 10^Precision) / 10^Precision`. Округление `round(Value * 10^Precision) / 10^Precision` (fsCommon). В весовых Scripts* любое значение массы перед записью в Result_* / журнал пропускают через `SetFormatPrecision(..., Massa_Precision)`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  m: Double;
begin
  // ScriptsBunkerScale / CraneScale
  m := SetFormatPrecision(Result_CURRENT_MASSA, Massa_Precision);
  Result_OP_MASSA := m;
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`; `Материалы для документации/Скрипты/ScriptsBunkerScale`; `Материалы для документации/Скрипты/ScriptsCraneScale`

---

<a id="setformatroundfromdiscret"></a>

# `SetFormatRoundFromDiscret` — Округление по дискрету

## Синтаксис

```pascal
function SetFormatRoundFromDiscret(Value: double; Precision: integer; Discret: double): Double
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `double` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `Precision` | `integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `Discret` | `double` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает значение, приведённое к дискрету и округлённое до заданной точности.

> **Особенности:** Если `Discret < 0.00000001`, он заменяется на `0.00000001`. Вычисляет `SetFormatPrecision(round(Value / Discret) * Discret, Precision)`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(SetFormatRoundFromDiscret(1.23, 2, 0.05))); // округление к дискрету
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---
