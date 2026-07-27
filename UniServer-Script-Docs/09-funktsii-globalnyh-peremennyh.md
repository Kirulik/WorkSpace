# Функции глобальных переменных.

Метаданные изменений глобальных переменных конструктора: время последнего изменения (`GetVarModTime`), счётчик (`GetVarModCount`) и частота (`GetVarModFreq`). В ScriptsCraneScale / BunkerScale их используют для таймаутов авторежима и мониторинга канала массы. При отсутствии переменной с указанным именем функции вызывают исключение. Чтение/запись значений — в разделе Конструктора (`GetVarValue` / `SetVarValue`).

<a id="getvarmodtime"></a>

# `GetVarModTime` — Время изменения глобальной переменной

## Синтаксис

```pascal
function GetVarModTime(Name: String): TDateTime
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя глобальной переменной Конструктора (по `fsCoreScript.pas`) |

## Описание

Время изменения глобальной переменной.

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Работает с глобальной переменной; при отсутствии переменной генерируется исключение. Время последнего изменения глобальной переменной; при отсутствии имени — исключение. В ScriptsCraneScale: `MillisecondsBetween(GetVarModTime('CurrentState'), Now())` для таймаута авторежима.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  LTimeOut, LLimit: Integer;
begin
  // ScriptsCraneScale wrk.AutoWeighingControl
  if modeAuto and (CurrentState = 'ReadyWeighing') then begin
    LTimeOut := MillisecondsBetween(GetVarModTime('CurrentState'), Now());
    LLimit := GetConfigIntDef(PluginName + '.AutoModeTimeOut', 5) * 1000;
    if LTimeOut > LLimit then
      SendMsg(NewMessage(PluginName + '.StartWeighing', ''), 2000);
  end;
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsCraneScale`

---

<a id="getvarmodcount"></a>

# `GetVarModCount` — Счётчик изменений глобальной переменной

## Синтаксис

```pascal
function GetVarModCount(Name: String): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя глобальной переменной Конструктора (по `fsCoreScript.pas`) |

## Описание

Счётчик изменений глобальной переменной.

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Работает с глобальной переменной; при отсутствии переменной генерируется исключение.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(GetVarModCount('Counter'))); // счётчик изменений
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getvarmodfreq"></a>

# `GetVarModFreq` — Частота изменений глобальной переменной

## Синтаксис

```pascal
function GetVarModFreq(Name: String): Double
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя глобальной переменной Конструктора (по `fsCoreScript.pas`) |

## Описание

Частота изменений глобальной переменной.

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

> **Особенности:** Работает с глобальной переменной; при отсутствии переменной генерируется исключение. Частота изменений глобальной переменной; в ScriptsBunkerScale — мониторинг канала массы.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // ScriptsBunkerScale: частота обновления канала массы
  DebugLog(_ToStr(GetVarModFreq('Result_CURRENT_MASSA')));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsBunkerScale`

---
