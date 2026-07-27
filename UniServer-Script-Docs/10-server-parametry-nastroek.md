# Сервер. Параметры настроек

`GetConfigValue` и типизированные `GetConfig*Def` читают параметры сервера по имени (например `Core.ServerID`, `PluginName + '.ObjectName'`). В регистрации RTTI эти методы помечены как старые, сохранённые для совместимости; в production-скриптах они по-прежнему широко используются. Запись настроек в скриптах Конструктора часто идёт через `CoreConfig.Values[...]` (см. раздел Конструктора).

<a id="getconfigvalue"></a>

# `GetConfigValue` — Прочитать значение параметра настройки по наименованию

## Синтаксис

```pascal
function GetConfigValue(Name: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | строка с именем параметра настройки (по примеру в `functions.txt`) |

## Описание

Возвращает значение параметра настройки сервера по имени.

> **Особенности:** Читает конфигурацию по имени.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: Variant;                // значение настройки
begin
  x := GetConfigValue('Core.ServerID'); // прочитать параметр по имени
  DebugLog(x);                          // вывести прочитанное значение в лог
end
```

</details>

_Источники сведений:_ `Материалы для документации/functions.txt`; `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getconfigfloatdef"></a>

# `GetConfigFloatDef` — Чтение `Double` с значением по умолчанию

## Синтаксис

```pascal
function GetConfigFloatDef(Name: String; ADefValue: Double): Double
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `ADefValue` | `Double` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает параметр конфигурации как `Double` либо значение по умолчанию.

> **Особенности:** Читает `CoreConfig.Values` и применяет преобразование с `ADefValue`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  v: Double;
begin
  v := GetConfigFloatDef('SomeFloat', 0.0); // читать Double с значением по умолчанию
  DebugLog(_ToStr(v));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getconfigintdef"></a>

# `GetConfigIntDef` — Чтение `Integer` с значением по умолчанию

## Синтаксис

```pascal
function GetConfigIntDef(Name: String; ADefValue: Integer): Integer
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `ADefValue` | `Integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает параметр конфигурации как `Integer` либо значение по умолчанию.

> **Особенности:** Читает `CoreConfig.Values` и применяет преобразование с `ADefValue`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  v: Integer;
begin
  v := GetConfigIntDef('SomeInt', 0); // читать Integer с значением по умолчанию
  DebugLog(_ToStr(v));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getconfigbooldef"></a>

# `GetConfigBoolDef` — Чтение `Boolean` с значением по умолчанию

## Синтаксис

```pascal
function GetConfigBoolDef(Name: String; ADefValue: Boolean): Boolean
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |
| `ADefValue` | `Boolean` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI). |

## Описание

Возвращает параметр конфигурации как `Boolean` либо значение по умолчанию.

> **Особенности:** Читает `CoreConfig.Values` и применяет преобразование с `ADefValue`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  v: Boolean;
begin
  v := GetConfigBoolDef('SomeBool', False); // читать Boolean с значением по умолчанию
  DebugLog(_ToStr(v));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---
