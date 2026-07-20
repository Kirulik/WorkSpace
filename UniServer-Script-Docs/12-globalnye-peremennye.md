# Плагин Конструктор / Работа с глобальными переменными Конструктора

Документ сформирован по регистрации RTTI и проверенным сведениям исходников/ODT.

<a id="getvarmodtime"></a>
### `GetVarModTime`

*** `GetVarModTime` — Время изменения глобальной переменной ****

`function GetVarModTime(Name: String): TDateTime`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Работает с глобальной переменной; при отсутствии переменной генерируется исключение.

**Пример вызова:**

```pascal
begin
  DebugLog(DateTimeToIso8601(GetVarModTime('Counter'))); // время последнего изменения
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getvarmodcount"></a>
### `GetVarModCount`

*** `GetVarModCount` — Счётчик изменений глобальной переменной ****

`function GetVarModCount(Name: String): Integer`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

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
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Работает с глобальной переменной; при отсутствии переменной генерируется исключение.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(GetVarModFreq('Counter'))); // частота изменений
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getvarvalue"></a>
### `GetVarValue`

*** `GetVarValue` — Чтение глобальной переменной ****

`function GetVarValue(Name: String): Variant`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Работает с глобальной переменной; при отсутствии переменной генерируется исключение.

**Пример вызова:**

```pascal
var
  v: Variant;
begin
  v := GetVarValue('Counter'); // прочитать глобальную переменную плагина
  DebugLog(v);
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="setvarvalue"></a>
### `SetVarValue`

*** `SetVarValue` — Запись глобальной переменной ****

`procedure SetVarValue(Name: String; Value: Variant)`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Value: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Работает с глобальной переменной; при отсутствии переменной генерируется исключение.

**Пример вызова:**

```pascal
begin
  SetVarValue('Counter', 1); // записать значение в глобальную переменную
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---
