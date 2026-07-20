# Общие функции для работы с сервером

Документ сформирован по регистрации RTTI и проверенным сведениям исходников/ODT.

<a id="debuglog"></a>
### `DebugLog`

*** `DebugLog` — Вывод строки в лог файл плагина ****

`procedure DebugLog(V: Variant)`

**Входные параметры:**
- `V: Variant` — параметр для вывода в лог файл (по примеру в `functions.txt`)

**Возвращает:**

Процедура ничего не возвращает. (по примеру в `functions.txt` блок «Возвращает:» пуст)

**Сведения из исходников / ODT:**

- Записывает указанное значение в `EventScript.log`.

**Пример вызова:**

```pascal
var
  x: String;                 // строка для вывода
begin
  x := '{"ID":10}';          // подготовить текст
  DebugLog(x);               // записать значение в лог файл плагина
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`; `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getconfigvalue"></a>
### `GetConfigValue`

*** `GetConfigValue` — Прочитать значение параметра настройки по наименованию ****

`function GetConfigValue(Name: String): Variant`

**Входные параметры:**
- `Name: String` — строка с именем параметра настройки (по примеру в `functions.txt`)

**Возвращает:**

значение параметра настройки (по примеру в `functions.txt`)

**Сведения из исходников / ODT:**

- Читает конфигурацию по имени.

**Пример вызова:**

```pascal
var
  x: Variant;                // значение настройки
begin
  x := GetConfigValue('Core.ServerID'); // прочитать параметр по имени
  DebugLog(x);                          // вывести прочитанное значение в лог
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`; `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getconfigfloatdef"></a>
### `GetConfigFloatDef`

*** `GetConfigFloatDef` — Чтение `Double` с значением по умолчанию ****

`function GetConfigFloatDef(Name: String; ADefValue: Double): Double`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `ADefValue: Double` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Double` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Читает `CoreConfig.Values` и применяет преобразование с `ADefValue`.

**Пример вызова:**

```pascal
var
  v: Double;
begin
  v := GetConfigFloatDef('SomeFloat', 0.0); // читать Double с значением по умолчанию
  DebugLog(_ToStr(v));
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getconfigintdef"></a>
### `GetConfigIntDef`

*** `GetConfigIntDef` — Чтение `Integer` с значением по умолчанию ****

`function GetConfigIntDef(Name: String; ADefValue: Integer): Integer`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `ADefValue: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Читает `CoreConfig.Values` и применяет преобразование с `ADefValue`.

**Пример вызова:**

```pascal
var
  v: Integer;
begin
  v := GetConfigIntDef('SomeInt', 0); // читать Integer с значением по умолчанию
  DebugLog(_ToStr(v));
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getconfigbooldef"></a>
### `GetConfigBoolDef`

*** `GetConfigBoolDef` — Чтение `Boolean` с значением по умолчанию ****

`function GetConfigBoolDef(Name: String; ADefValue: Boolean): Boolean`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `ADefValue: Boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Читает `CoreConfig.Values` и применяет преобразование с `ADefValue`.

**Пример вызова:**

```pascal
var
  v: Boolean;
begin
  v := GetConfigBoolDef('SomeBool', False); // читать Boolean с значением по умолчанию
  DebugLog(_ToStr(v));
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---
