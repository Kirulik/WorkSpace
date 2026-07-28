# Конструктор. Переменные среды, дополнительные функции

Среда Конструктора внедряет объекты и константы экземпляра плагина (`CoreConfig`, `Request`, `Response`, `PluginName`, `CurrentState` и др. — см. ниже): их не объявляют в списке глобалов SMC. Пользовательские глобальные переменные сценария читают и пишут через `GetVarValue` / `SetVarValue` (в production часто обращаются по имени напрямую: `Result_CURRENT_MASSA`, `modeAuto`). FSM: переходы `smt.*` только вычисляют следующее состояние (`Result := …`); эффекты — в `sme.*` / `cmd.*`. Метаданные изменений переменных — в разделе «Функции глобальных переменных».

## Глобальные переменные среды Конструктора

По уточнению тимлида, в скриптах Конструктора среда автоматически предоставляет объекты и константы экземпляра плагина. Их **не объявляют** в списке пользовательских глобалов SMC — они уже есть в контексте выполнения.

| Имя | Тип / вид | Назначение |
|-----|-----------|------------|
| `CoreConfig` | `TICoreConfig` | Конфигурация ядра: пути, `Values[...]`, метаданные сообщений |
| `Request` | `TIWebServerRequest` | Текущий HTTP-запрос (в web-скриптах страниц) |
| `Response` | `TIWebServerResponse` | Формирование HTTP-ответа (`ReturnPage`, `ReturnText`, …) |
| `PluginIndex` | индекс экземпляра | Номер/индекс плагина в среде Конструктора |
| `PluginName` | имя экземпляра | Имя плагина; основа для имён сообщений (`PluginName + '.Command'`) и ключей конфига |
| `PluginCaption` | отображаемое имя | Подпись плагина (в т.ч. для scope шаблонов) |
| `CurrentState` | состояние FSM | Текущее состояние машины состояний сценария |
| `CurrentStateCaption` | подпись состояния | Отображаемое имя текущего состояния |

Ниже — подробности методов объектов среды `CoreConfig`, `Request` и `Response` (сигнатуры RTTI / TLB, поведение по PluginAPI_desc и production-скриптам).

**Примеры из production-скриптов:**

```pascal
// Имя команды и конфиг от экземпляра плагина
Result_OBJECT_NAME := GetConfigValue(PluginName + '.ObjectName');
LMsg := NewMessage(PluginName + '.GetParameters', Null);

// Запись настройки через объект среды
CoreConfig.Values[LOpts.Value(i).FullName] := LNewValue;

// Веб-страница: scope + ответ
LScope.PluginIndex := PluginIndex;
LScope.PluginName := PluginName;
LScope.PluginCaption := PluginCaption;
Response.ReturnPage('Control', LScope);

// Условие по состоянию FSM
if CurrentState = 'ReadyWeighing' then
  ...
```

_Источник:_ уточнение тимлида (глобальные переменные среды Конструктора); подтверждение использования — пакеты `ScriptsAutoControl`, `ScriptsBunkerScale`, `ScriptsCraneScale`.


<a id="coreconfig"></a>

## `CoreConfig` (`TICoreConfig`)

Глобальный объект среды `CoreConfig` (`TICoreConfig`): пути сервера/плагина, словарь параметров `Values` / `Defaults`, метаданные сообщений. В web-скриптах и обработчиках к нему обращаются напрямую (по TLB / `fsCoreScript.pas` / Scripts*).

<a id="ticoreconfig-binpath"></a>

# `CoreConfig.BinPath` — Каталог двоичных файлов сервера

## Синтаксис

```pascal
property BinPath: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. Каталог двоичных файлов сервера.

> **Особенности:** Свойство `ICoreConfig.BinPath` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.BinPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.BinPath));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-datapath"></a>

# `CoreConfig.DataPath` — Каталог данных сервера

## Синтаксис

```pascal
property DataPath: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. Каталог данных сервера.

> **Особенности:** Свойство `ICoreConfig.DataPath` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.DataPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.DataPath));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-defaults"></a>

# `CoreConfig.Defaults` — Значение конфигурации по умолчанию

## Синтаксис

```pascal
property Defaults[Name: String]: String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя параметра конфигурации (по TLB `Defaults[Index]`) |

## Описание

Возвращает значение типа `String`. Значение конфигурации по умолчанию.

> **Особенности:** Индексное свойство `Defaults[Name]` — значение по умолчанию для параметра (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.Defaults` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Defaults));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-logpath"></a>

# `CoreConfig.LogPath` — Каталог журналов

## Синтаксис

```pascal
property LogPath: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. Каталог журналов.

> **Особенности:** Свойство `ICoreConfig.LogPath` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.LogPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.LogPath));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-logverbose"></a>

# `CoreConfig.LogVerbose` — Подробный режим логирования

## Синтаксис

```pascal
property LogVerbose: Boolean
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `Boolean`. Подробный режим логирования.

> **Особенности:** Свойство `ICoreConfig.LogVerbose` (по TLB); в скриптовой обёртке читается как Boolean (`fsCoreScript.pas`).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.LogVerbose` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.LogVerbose));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticoreconfig-msgfortype"></a>

# `CoreConfig.MsgForType` — Имя сообщения по типу содержимого

## Синтаксис

```pascal
property MsgForType[Name: String; Value: Variant]: String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | тип содержимого / ключ сопоставления (в TLB параметр `ContentType`) |
| `Value` | `Variant` | признак команды (`IsCommand` в TLB) |

## Описание

Возвращает значение типа `String`. Имя сообщения по типу содержимого.

> **Особенности:** Индексное свойство `MsgForType[ContentType, IsCommand]` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.MsgForType` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MsgForType));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-msginfo"></a>

# `CoreConfig.MsgInfo` — Описание сообщения

## Синтаксис

```pascal
property MsgInfo[Name: String]: String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя сообщения (по TLB `MsgInfo[MsgName]`) |

## Описание

Возвращает значение типа `String`. Описание сообщения.

> **Особенности:** Индексное свойство `MsgInfo[MsgName]` — информация о сообщении; изменение связано с системным `Core.MsgInfoChanged` (по TLB / PluginAPI_desc.odt).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.MsgInfo` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MsgInfo));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-msginfos"></a>

# `CoreConfig.MsgInfos` — Сводная информация о сообщениях

## Синтаксис

```pascal
property MsgInfos: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. Сводная информация о сообщениях.

> **Особенности:** Свойство `MsgInfos` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.MsgInfos` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MsgInfos));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-msgnames"></a>

# `CoreConfig.MsgNames` — Имена сообщений

## Синтаксис

```pascal
property MsgNames: Variant
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `Variant`. Имена сообщений.

> **Особенности:** Свойство `MsgNames` — перечень имён сообщений (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.MsgNames` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MsgNames));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-mypath"></a>

# `CoreConfig.MyPath` — Каталог текущего плагина

## Синтаксис

```pascal
property MyPath: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. Каталог текущего плагина.

> **Особенности:** Свойство `MyPath`; от него разрешаются относительные пути файловых функций скрипта (по TLB / `fsCoreScript.pas`).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.MyPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MyPath));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticoreconfig-pluginoptsdocjson"></a>

# `CoreConfig.PluginOptsDocJson` — JSON-описание опций плагина

## Синтаксис

```pascal
property PluginOptsDocJson[Name: String]: String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает значение типа `String`. JSON-описание опций плагина.

> **Особенности:** Индексное свойство `PluginOptsDocJson[PluginName]` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.PluginOptsDocJson` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.PluginOptsDocJson));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-pluginpath"></a>

# `CoreConfig.PluginPath` — Каталог плагинов

## Синтаксис

```pascal
property PluginPath: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. Каталог плагинов.

> **Особенности:** Свойство `ICoreConfig.PluginPath` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.PluginPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.PluginPath));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-roles"></a>

# `CoreConfig.Roles` — Роли сервера

## Синтаксис

```pascal
property Roles: Variant
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `Variant`. Роли сервера.

> **Особенности:** Свойство `Roles` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.Roles` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Roles));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-serveraddr"></a>

# `CoreConfig.ServerAddr` — Адрес сервера

## Синтаксис

```pascal
property ServerAddr: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. Адрес сервера.

> **Особенности:** Свойство `ServerAddr` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.ServerAddr` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.ServerAddr));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-serverport"></a>

# `CoreConfig.ServerPort` — Порт сервера

## Синтаксис

```pascal
property ServerPort: Integer
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `Integer`. Порт сервера.

> **Особенности:** Свойство `ServerPort` (по TLB); в COM — Integer.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.ServerPort` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.ServerPort));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-url"></a>

# `CoreConfig.URL` — Базовый URL сервера

## Синтаксис

```pascal
property URL: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. Базовый URL сервера.

> **Особенности:** Свойство `URL` (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.URL` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.URL));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-values"></a>

# `CoreConfig.Values` — Значение параметра конфигурации

## Синтаксис

```pascal
property Values[Name: String]: String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя параметра конфигурации (по TLB `Values[Index]`) |

## Описание

Возвращает значение типа `String`. Значение параметра конфигурации.

> **Особенности:** Индексное свойство `Values[Name]` — чтение/запись параметра конфигурации. Глобальные `GetConfig*` читают тот же слой через `CoreConfig.Values` (по TLB / `fsCoreScript.pas` / `functions.txt`).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TICoreConfig.Values` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Values));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="request"></a>

## `Request` (`TIWebServerRequest`)

Глобальный объект среды `Request` (`TIWebServerRequest`): текущий HTTP-запрос страницы плагина. Доступен в web-скриптах (`web.*`). Параметры формы/query — через `Input` / `InputStr` / `InputArr` (по PluginAPI_desc.odt / TLB / Scripts*).

<a id="tiwebserverrequest-cookie"></a>

# `Request.Cookie` — Cookie запроса

## Синтаксис

```pascal
function Cookie(Name: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя cookie запроса (по PluginAPI_desc.odt / TLB) |

## Описание

Возвращает значение типа `String`. Cookie запроса.

> **Особенности:** Чтение cookie по имени (по PluginAPI_desc.odt / TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant;
begin
  // r := Obj.Cookie(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-header"></a>

# `Request.Header` — Заголовок запроса

## Синтаксис

```pascal
function Header(Name: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя HTTP-заголовка запроса (по PluginAPI_desc.odt / TLB) |

## Описание

Возвращает значение типа `String`. Заголовок запроса.

> **Особенности:** Чтение HTTP-заголовка по имени (по PluginAPI_desc.odt / TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant;
begin
  // r := Obj.Header(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-input"></a>

# `Request.Input` — Параметр запроса

## Синтаксис

```pascal
function Input(Name: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя параметра запроса (по PluginAPI_desc.odt / TLB) |

## Описание

Возвращает значение типа `Variant`. Параметр запроса.

> **Особенности:** Параметр HTTP-запроса по имени (`OleVariant`) (по PluginAPI_desc.odt / TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant;
begin
  // r := Obj.Input(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-inputarr"></a>

# `Request.InputArr` — Параметр-массив

## Синтаксис

```pascal
function InputArr(Name: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя параметра-массива запроса (по TLB) |

## Описание

Возвращает значение типа `Variant`. Параметр-массив.

> **Особенности:** Параметр запроса как массив значений (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant;
begin
  // r := Obj.InputArr(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-inputstr"></a>

# `Request.InputStr` — Строковый параметр

## Синтаксис

```pascal
function InputStr(Name: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя строкового параметра запроса (по TLB) |

## Описание

Возвращает значение типа `String`. Строковый параметр.

> **Особенности:** Параметр запроса как строка (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant;
begin
  // r := Obj.InputStr(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-tojson"></a>

# `Request.ToJson` — JSON запроса

## Синтаксис

```pascal
function ToJson: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. JSON запроса.

> **Особенности:** Вызывает `IWebServerRequest.ToJSON` (по TLB / `fsCoreScript.pas`).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  r: Variant;
begin
  // r := Obj.ToJson(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="tiwebserverrequest-currentuser"></a>

# `Request.CurrentUser` — Текущий пользователь

## Синтаксис

```pascal
property CurrentUser: TIUser
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `TIUser`. Текущий пользователь.

> **Особенности:** Пользователь сессии / авторизации запроса; используется в проверках доступа (по PluginAPI_desc.odt / TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TIWebServerRequest.CurrentUser` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.CurrentUser));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-method"></a>

# `Request.Method` — HTTP-метод

## Синтаксис

```pascal
property Method: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. HTTP-метод.

> **Особенности:** Метод запроса (GET, POST, …) (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TIWebServerRequest.Method` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Method));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-page"></a>

# `Request.Page` — Имя страницы

## Синтаксис

```pascal
property Page: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. Имя страницы.

> **Особенности:** Имя зарегистрированной страницы плагина (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TIWebServerRequest.Page` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Page));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-uri"></a>

# `Request.URI` — URI запроса

## Синтаксис

```pascal
property URI: String
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `String`. URI запроса.

> **Особенности:** URI входящего запроса (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TIWebServerRequest.URI` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.URI));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="response"></a>

## `Response` (`TIWebServerResponse`)

Глобальный объект среды `Response` (`TIWebServerResponse`): формирование HTTP-ответа. `ReturnPage` строит HTML по шаблону из `Views` плагина; `ReturnText` / `ReturnError` / `ReturnBlob` — текстовый, ошибочный и двоичный ответы (по PluginAPI_desc.odt / TLB / Scripts*).

<a id="tiwebserverresponse-redirect"></a>

# `Response.Redirect` — Перенаправление

## Синтаксис

```pascal
procedure Redirect(PageName: String)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `PageName` | `String` | имя страницы для перенаправления (по TLB / RTTI) |

## Описание

Перенаправление.

> **Особенности:** Перенаправление на указанную страницу (по TLB / RTTI).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Obj.Redirect(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverresponse-returnblob"></a>

# `Response.ReturnBlob` — Двоичный ответ

## Синтаксис

```pascal
procedure ReturnBlob(Blob: Variant; Status: Integer)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Blob` | `Variant` | двоичное тело ответа (скрипковый аналог ReturnData, по PluginAPI_desc.odt / RTTI) |
| `Status` | `Integer` | HTTP-статус (по RTTI) |

## Описание

Двоичный ответ.

> **Особенности:** Отдаёт двоичные данные с HTTP-статусом; скриптовый аналог COM-метода `ReturnData` (по PluginAPI_desc.odt / RTTI).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Obj.ReturnBlob(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/functions.txt`

---

<a id="tiwebserverresponse-returnerror"></a>

# `Response.ReturnError` — Страница ошибки

## Синтаксис

```pascal
procedure ReturnError(Text: String; Status: Integer)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Text` | `String` | текст ошибки; страница строится по шаблону Error.html (по PluginAPI_desc.odt) |
| `Status` | `Integer` | HTTP-статус (по RTTI) |

## Описание

Страница ошибки.

> **Особенности:** Формирует страницу ошибки по шаблону `Error.html` внутри общего каркаса сайта (по PluginAPI_desc.odt).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  Response.ReturnError('Ошибка обработки запроса', 500);
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="tiwebserverresponse-returnpage"></a>

# `Response.ReturnPage` — Ответ HTML-страницей

## Синтаксис

```pascal
procedure ReturnPage(Name: String; InputJSON: Variant)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя HTML-шаблона в папке Views плагина (по PluginAPI_desc.odt) |
| `InputJSON` | `Variant` | данные для шаблона основной части страницы (по PluginAPI_desc.odt) |

## Описание

Ответ HTML-страницей.

> **Особенности:** Строит страницу по шаблону из папки `Views` плагина и встраивает в основной шаблон сайта; параметры передаются в шаблон (по PluginAPI_desc.odt). В шаблоне можно подключать partials, например `{{>header}}`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // шаблон из Views плагина; InputJSON — данные для шаблона
  Response.ReturnPage('Kiosk', _ObjEx(['Title', 'Готовность']));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="tiwebserverresponse-returntext"></a>

# `Response.ReturnText` — Текстовый HTTP-ответ

## Синтаксис

```pascal
procedure ReturnText(Text, ContentType: String; Status: Integer)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Text` | `String` | полный текст ответа (по PluginAPI_desc.odt) |
| `ContentType` | `String` | тип содержимого (по PluginAPI_desc.odt) |
| `Status` | `Integer` | HTTP-статус (по PluginAPI_desc.odt) |

## Описание

Текстовый HTTP-ответ.

> **Особенности:** Задаёт полный текст ответа, Content-Type и HTTP-статус (по PluginAPI_desc.odt). Текстовые ответы и шаблоны ожидаются в UTF-8.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  Response.ReturnText('{"ok":true}', 'application/json', 200);
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="tiwebserverresponse-setcookie"></a>

# `Response.SetCookie` — Установка cookie

## Синтаксис

```pascal
procedure SetCookie(Name, Value: String; Expires: TDateTime)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя cookie (по TLB) |
| `Value` | `String` | значение cookie (по TLB) |
| `Expires` | `TDateTime` | срок действия cookie (по TLB) |

## Описание

Установка cookie.

> **Особенности:** Задаёт cookie ответа с сроком действия (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Obj.SetCookie(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverresponse-setheader"></a>

# `Response.SetHeader` — Установка заголовка

## Синтаксис

```pascal
procedure SetHeader(Value: String)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Value` | `String` | строка HTTP-заголовка ответа (по TLB) |

## Описание

Установка заголовка.

> **Особенности:** Добавляет/задаёт заголовок HTTP-ответа (по TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Obj.SetHeader(...); // см. параметры и сведения выше
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverresponse-cachecontrol"></a>

# `Response.CacheControl` — Флаги кэширования ответа

## Синтаксис

```pascal
property CacheControl: Integer
```

## Параметры

_Параметры отсутствуют._

## Описание

Возвращает значение типа `Integer`. Флаги кэширования ответа.

> **Особенности:** Соответствует `WebPageOptionsType` / флагам вроде `WebPageCacheControlNoCache`, `WebPageCacheControlAgeDay` и др. (по PluginAPI_desc.odt / TLB).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Чтение свойства `TIWebServerResponse.CacheControl` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.CacheControl));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="getvarvalue"></a>

# `GetVarValue` — Чтение глобальной переменной

## Синтаксис

```pascal
function GetVarValue(Name: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя глобальной переменной Конструктора (по `fsCoreScript.pas`) |

## Описание

Возвращает значение глобальной переменной Конструктора по имени.

> **Особенности:** Работает с глобальной переменной; при отсутствии переменной генерируется исключение.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  v: Variant;
begin
  v := GetVarValue('Counter'); // прочитать глобальную переменную плагина
  DebugLog(v);
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="setvarvalue"></a>

# `SetVarValue` — Запись глобальной переменной

## Синтаксис

```pascal
procedure SetVarValue(Name: String; Value: Variant)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Name` | `String` | имя глобальной переменной Конструктора (по `fsCoreScript.pas`) |
| `Value` | `Variant` | новое значение переменной (по RTTI / `fsCoreScript.pas`) |

## Описание

Записывает значение в глобальную переменную Конструктора по имени.

> **Особенности:** Работает с глобальной переменной; при отсутствии переменной генерируется исключение.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  SetVarValue('Counter', 1); // записать значение в глобальную переменную
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---
