# Функции глобальных переменных.

Метаданные изменений глобальных переменных конструктора: время последнего изменения (`GetVarModTime`), счётчик (`GetVarModCount`) и частота (`GetVarModFreq`). В ScriptsCraneScale / BunkerScale их используют для таймаутов авторежима и мониторинга канала массы. При отсутствии переменной с указанным именем функции вызывают исключение. Чтение/запись значений — в разделе Конструктора (`GetVarValue` / `SetVarValue`).

<a id="getvarmodtime"></a>
### `GetVarModTime`

*** `GetVarModTime` — Время изменения глобальной переменной ****

`function GetVarModTime(Name: String): TDateTime`

**Входные параметры:**
- `Name: String` — имя глобальной переменной Конструктора (по `fsCoreScript.pas`)

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Работает с глобальной переменной; при отсутствии переменной генерируется исключение.
- Время последнего изменения глобальной переменной; при отсутствии имени — исключение.
- В ScriptsCraneScale: `MillisecondsBetween(GetVarModTime('CurrentState'), Now())` для таймаута авторежима.

**Пример вызова:**

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

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsCraneScale`

---

<a id="getvarmodcount"></a>
### `GetVarModCount`

*** `GetVarModCount` — Счётчик изменений глобальной переменной ****

`function GetVarModCount(Name: String): Integer`

**Входные параметры:**
- `Name: String` — имя глобальной переменной Конструктора (по `fsCoreScript.pas`)

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Работает с глобальной переменной; при отсутствии переменной генерируется исключение.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(GetVarModCount('Counter'))); // счётчик изменений
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getvarmodfreq"></a>
### `GetVarModFreq`

*** `GetVarModFreq` — Частота изменений глобальной переменной ****

`function GetVarModFreq(Name: String): Double`

**Входные параметры:**
- `Name: String` — имя глобальной переменной Конструктора (по `fsCoreScript.pas`)

**Возвращает:**

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Работает с глобальной переменной; при отсутствии переменной генерируется исключение.
- Частота изменений глобальной переменной; в ScriptsBunkerScale — мониторинг канала массы.

**Пример вызова:**

```pascal
begin
  // ScriptsBunkerScale: частота обновления канала массы
  DebugLog(_ToStr(GetVarModFreq('Result_CURRENT_MASSA')));
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsBunkerScale`

---
