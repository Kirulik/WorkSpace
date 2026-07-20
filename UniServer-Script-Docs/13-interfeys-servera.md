# Интерфейс сервера

Раздел описывает объекты ядра, доступные скрипту как типизированные интерфейсы: конфигурация (`TICoreConfig`), сообщения (`TICoreMessages`, `TIMessage`, `TIBlob`), планировщик (`TICoreScheduler`), локаль (`TICoreLocale`), пользователь (`TIUser`), HTTP-запрос и ответ (`TIWebServerRequest`, `TIWebServerResponse`). Плагин встраивает страницы вызовом регистрации обработчика; при обращении к `/core/plugins/ИмяПлагина/ИмяСтраницы` ядро вызывает обработчик с парой Request/Response. Ответ формируют `ReturnPage` (шаблон из `Views` в UTF-8, встройка в общий каркас сайта), `ReturnError`, `ReturnText` / `ReturnBlob`. Страницы принято разделять на интерфейс, действия и данные с разными флагами аутентификации и кэша. `TIBlob` передаёт двоичные данные без лишнего копирования между плагинами. Планировщик ставит отправку сообщений по crontab-подобной строке или таймеру. Этот слой — полная модель «законов» сервера; упрощённые `GetConfig*` / `PostMsg` из предыдущих разделов дублируют часть возможностей для совместимости.

Состав интерфейсов и сигнатуры подтверждены RTTI (`functions.txt`) и `PluginAPI_TLB.pas`. Поведенческие сведения взяты из PluginAPI_desc; где в материалах остаётся только сигнатура — стоит маркер дополнения.

<a id="tiblob"></a>
## `TIBlob`

Обёртка скрипта над COM-интерфейсом `IBlob`: контейнер двоичных данных без лишнего копирования между плагинами. У blob есть имя, тип содержимого, размер и сами данные; плагин может реализовать `IBlob` эффективно под свою модель памяти (по PluginAPI_desc.odt). В скрипте `Data` отдаётся как Variant-массив байт (копирование в `VarArray` в `fsCoreScript.pas`).

<a id="tiblob-tojson"></a>
### `TIBlob.ToJson`

*** `TIBlob.ToJson` — JSON-представление blob ****

`function ToJson: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Вызывает `IBlob.ToJSON` (по `fsCoreScript.pas` / TLB).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.ToJson(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="tiblob-name"></a>
### `TIBlob.Name`

*** `TIBlob.Name` — Имя blob ****

`property Name: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `IBlob.Name` — имя двоичного вложения (по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIBlob.Name` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Name));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiblob-contenttype"></a>
### `TIBlob.ContentType`

*** `TIBlob.ContentType` — Тип содержимого ****

`property ContentType: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `IBlob.ContentType` — тип содержимого двоичных данных (по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIBlob.ContentType` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.ContentType));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiblob-data"></a>
### `TIBlob.Data`

*** `TIBlob.Data` — Данные blob ****

`property Data: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- В COM — указатель на данные (`IBlob.Data`).
- В скриптовой обёртке копируется в Variant-массив байт (`VarArray` of `varByte`) в `TIBlob.GetData` (`fsCoreScript.pas`).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIBlob.Data` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Data));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="tiblob-size"></a>
### `TIBlob.Size`

*** `TIBlob.Size` — Размер данных ****

`property Size: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Число байт в blob (`IBlob.Size`, по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIBlob.Size` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Size));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig"></a>
## `TICoreConfig`

Обёртка над `ICoreConfig`: пути сервера и плагина, адрес/порт, словарь параметров `Values` / `Defaults`, метаданные сообщений и ролей. Чтение `Values[Name]` — тот же слой конфигурации, что обслуживают устаревшие глобальные `GetConfig*`. `MyPath` — каталог текущего плагина; от него резолвятся относительные пути `StringFromFile` / `FileFromString` (по TLB / `fsCoreScript.pas`).

<a id="ticoreconfig-binpath"></a>
### `TICoreConfig.BinPath`

*** `TICoreConfig.BinPath` — Каталог двоичных файлов сервера ****

`property BinPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `ICoreConfig.BinPath` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.BinPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.BinPath));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-datapath"></a>
### `TICoreConfig.DataPath`

*** `TICoreConfig.DataPath` — Каталог данных сервера ****

`property DataPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `ICoreConfig.DataPath` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.DataPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.DataPath));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-defaults"></a>
### `TICoreConfig.Defaults`

*** `TICoreConfig.Defaults` — Значение конфигурации по умолчанию ****

`property Defaults[Name: String]: String`

**Входные параметры:**
- `Name: String` — имя параметра конфигурации (по TLB `Defaults[Index]`)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Индексное свойство `Defaults[Name]` — значение по умолчанию для параметра (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.Defaults` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Defaults));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-logpath"></a>
### `TICoreConfig.LogPath`

*** `TICoreConfig.LogPath` — Каталог журналов ****

`property LogPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `ICoreConfig.LogPath` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.LogPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.LogPath));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-logverbose"></a>
### `TICoreConfig.LogVerbose`

*** `TICoreConfig.LogVerbose` — Подробный режим логирования ****

`property LogVerbose: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `ICoreConfig.LogVerbose` (по TLB); в скриптовой обёртке читается как Boolean (`fsCoreScript.pas`).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.LogVerbose` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.LogVerbose));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticoreconfig-msgfortype"></a>
### `TICoreConfig.MsgForType`

*** `TICoreConfig.MsgForType` — Имя сообщения по типу содержимого ****

`property MsgForType[Name: String; Value: Variant]: String`

**Входные параметры:**
- `Name: String` — тип содержимого / ключ сопоставления (в TLB параметр `ContentType`)
- `Value: Variant` — признак команды (`IsCommand` в TLB)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Индексное свойство `MsgForType[ContentType, IsCommand]` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.MsgForType` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MsgForType));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-msginfo"></a>
### `TICoreConfig.MsgInfo`

*** `TICoreConfig.MsgInfo` — Описание сообщения ****

`property MsgInfo[Name: String]: String`

**Входные параметры:**
- `Name: String` — имя сообщения (по TLB `MsgInfo[MsgName]`)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Индексное свойство `MsgInfo[MsgName]` — информация о сообщении; изменение связано с системным `Core.MsgInfoChanged` (по TLB / PluginAPI_desc.odt).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.MsgInfo` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MsgInfo));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-msginfos"></a>
### `TICoreConfig.MsgInfos`

*** `TICoreConfig.MsgInfos` — Сводная информация о сообщениях ****

`property MsgInfos: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `MsgInfos` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.MsgInfos` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MsgInfos));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-msgnames"></a>
### `TICoreConfig.MsgNames`

*** `TICoreConfig.MsgNames` — Имена сообщений ****

`property MsgNames: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `MsgNames` — перечень имён сообщений (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.MsgNames` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MsgNames));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-mypath"></a>
### `TICoreConfig.MyPath`

*** `TICoreConfig.MyPath` — Каталог текущего плагина ****

`property MyPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `MyPath`; от него разрешаются относительные пути файловых функций скрипта (по TLB / `fsCoreScript.pas`).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.MyPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.MyPath));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticoreconfig-pluginoptsdocjson"></a>
### `TICoreConfig.PluginOptsDocJson`

*** `TICoreConfig.PluginOptsDocJson` — JSON-описание опций плагина ****

`property PluginOptsDocJson[Name: String]: String`

**Входные параметры:**
- `Name: String` — имя плагина (по TLB `PluginOptsDocJson[PluginName]`)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Индексное свойство `PluginOptsDocJson[PluginName]` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.PluginOptsDocJson` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.PluginOptsDocJson));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-pluginpath"></a>
### `TICoreConfig.PluginPath`

*** `TICoreConfig.PluginPath` — Каталог плагинов ****

`property PluginPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `ICoreConfig.PluginPath` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.PluginPath` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.PluginPath));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-roles"></a>
### `TICoreConfig.Roles`

*** `TICoreConfig.Roles` — Роли сервера ****

`property Roles: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `Roles` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.Roles` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Roles));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-serveraddr"></a>
### `TICoreConfig.ServerAddr`

*** `TICoreConfig.ServerAddr` — Адрес сервера ****

`property ServerAddr: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `ServerAddr` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.ServerAddr` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.ServerAddr));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-serverport"></a>
### `TICoreConfig.ServerPort`

*** `TICoreConfig.ServerPort` — Порт сервера ****

`property ServerPort: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `ServerPort` (по TLB); в COM — Integer.

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.ServerPort` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.ServerPort));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-url"></a>
### `TICoreConfig.URL`

*** `TICoreConfig.URL` — Базовый URL сервера ****

`property URL: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `URL` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.URL` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.URL));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoreconfig-values"></a>
### `TICoreConfig.Values`

*** `TICoreConfig.Values` — Значение параметра конфигурации ****

`property Values[Name: String]: String`

**Входные параметры:**
- `Name: String` — имя параметра конфигурации (по TLB `Values[Index]`)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Индексное свойство `Values[Name]` — чтение/запись параметра конфигурации.
- Глобальные `GetConfig*` читают тот же слой через `CoreConfig.Values` (по TLB / `fsCoreScript.pas` / `functions.txt`).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreConfig.Values` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Values));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticorelocale"></a>
## `TICoreLocale`

Обёртка над `ICoreLocale`: форматирование валюты, даты, веса, форм множественного числа и перевод строк с учётом текущего языка сервера (сигнатуры — TLB / RTTI).

<a id="ticorelocale-formatcurrency"></a>
### `TICoreLocale.FormatCurrency`

*** `TICoreLocale.FormatCurrency` — Форматирование денежной суммы ****

`function FormatCurrency(Value: Double; Currency: String; Spellout, Cents: Boolean): String`

**Входные параметры:**
- `Value: Double` — сумма (по TLB)
- `Currency: String` — код/обозначение валюты (по TLB)
- `Spellout: Boolean` — прописью (по имени параметра TLB)
- `Cents: Boolean` — включать копейки/центы (по имени параметра TLB)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Метод `ICoreLocale.FormatCurrency` (по TLB / RTTI).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.FormatCurrency(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticorelocale-formatdate"></a>
### `TICoreLocale.FormatDate`

*** `TICoreLocale.FormatDate` — Форматирование даты ****

`function FormatDate(Value: TDateTime; WithTime: Boolean): String`

**Входные параметры:**
- `Value: TDateTime` — дата/время (по TLB)
- `WithTime: Boolean` — включать время в строку (по TLB)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Метод `ICoreLocale.FormatDate`; параметр `WithTime` включает время (по TLB).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.FormatDate(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticorelocale-formatplural"></a>
### `TICoreLocale.FormatPlural`

*** `TICoreLocale.FormatPlural` — Форма множественного числа ****

`function FormatPlural(Value: Integer; Plurals: String): String`

**Входные параметры:**
- `Value: Integer` — число для выбора формы множественного числа (по TLB)
- `Plurals: String` — набор форм множественного числа (по TLB; формат строки в текстовых материалах не раскрыт)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Метод `ICoreLocale.FormatPlural` (по TLB).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.FormatPlural(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticorelocale-formatweight"></a>
### `TICoreLocale.FormatWeight`

*** `TICoreLocale.FormatWeight` — Форматирование массы ****

`function FormatWeight(Value: Double; Spellout: Boolean): String`

**Входные параметры:**
- `Value: Double` — значение массы (по TLB)
- `Spellout: Boolean` — прописью (по TLB)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Метод `ICoreLocale.FormatWeight` (по TLB / `fsCoreScript.pas`).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.FormatWeight(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticorelocale-translate"></a>
### `TICoreLocale.Translate`

*** `TICoreLocale.Translate` — Перевод строки ****

`function Translate(Value: String): String`

**Входные параметры:**
- `Value: String` — строка для перевода (по TLB)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Метод `ICoreLocale.Translate` (по TLB).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.Translate(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticorelocale-language"></a>
### `TICoreLocale.Language`

*** `TICoreLocale.Language` — Язык локали ****

`property Language: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `Language` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreLocale.Language` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Language));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticorelocale-languagecode"></a>
### `TICoreLocale.LanguageCode`

*** `TICoreLocale.LanguageCode` — Код языка ****

`property LanguageCode: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `LanguageCode` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreLocale.LanguageCode` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.LanguageCode));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticorelocale-languageid"></a>
### `TICoreLocale.LanguageID`

*** `TICoreLocale.LanguageID` — Идентификатор языка ****

`property LanguageID: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `LanguageID` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreLocale.LanguageID` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.LanguageID));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoremessages"></a>
## `TICoreMessages`

Обёртка над `ICoreMessages` — шина сообщений ядра: создание `IMessage`, асинхронный `PostMsg`, синхронный `SendMsg`, проверка подписчиков `HasHandlerFor`. Имя сообщения — `ИмяПлагина.ИмяСообщения`. Обработчики работают в потоках `TMessageHandler`; после обработки нельзя удерживать ссылку на `IMessage` (ссылку на `IBlob` удерживать можно) — по PluginAPI_desc.odt.

<a id="ticoremessages-hashandlerfor"></a>
### `TICoreMessages.HasHandlerFor`

*** `TICoreMessages.HasHandlerFor` — Проверка подписчиков ****

`function HasHandlerFor(MsgName: String): Boolean`

**Входные параметры:**
- `MsgName: String` — имя сообщения (по PluginAPI_desc.odt)

**Возвращает:**

`True`, если в системе есть подписчики на указанное имя сообщения (по PluginAPI_desc.odt)

**Сведения из исходников / ODT:**

- Возвращает, есть ли в системе обработчики для имени сообщения (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
begin
  if CoreMessages.HasHandlerFor('Camera1.FrameJpg') then
    DebugLog('есть подписчики');
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="ticoremessages-newmessage"></a>
### `TICoreMessages.NewMessage`

*** `TICoreMessages.NewMessage` — Создание сообщения ****

`function NewMessage(MsgName: String; Value: Variant): Variant`

**Входные параметры:**
- `MsgName: String` — имя вида `ИмяПлагина.ИмяСообщения` (по PluginAPI_desc.odt)
- `Value: Variant` — полезная нагрузка `Value` (по PluginAPI_desc.odt)

**Возвращает:**

созданный объект сообщения (по PluginAPI_desc.odt / TLB)

**Сведения из исходников / ODT:**

- Создаёт `IMessage` с именем вида `ИмяПлагина.ИмяСообщения` и значением `Value` (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
var
  LMsg: Variant;
begin
  LMsg := CoreMessages.NewMessage('Camera1.FrameJpg', ''); // создать сообщение
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="ticoremessages-newmessageex"></a>
### `TICoreMessages.NewMessageEx`

*** `TICoreMessages.NewMessageEx` — Создание расширенного сообщения ****

`function NewMessageEx(MsgName: String; Value: Variant; Blob, CurrentUser: Variant; Timeout: Integer): Variant`

**Входные параметры:**
- `MsgName: String` — имя вида `ИмяПлагина.ИмяСообщения` (по PluginAPI_desc.odt)
- `Value: Variant` — полезная нагрузка `Value` (по PluginAPI_desc.odt)
- `Blob: Variant` — двоичные данные `IBlob` (по PluginAPI_desc.odt)
- `CurrentUser: Variant` — пользователь `IUser` (по TLB)
- `Timeout: Integer` — таймаут сообщения (по TLB)

**Возвращает:**

созданный объект сообщения с Blob/User/Timeout (по PluginAPI_desc.odt / TLB)

**Сведения из исходников / ODT:**

- Создаёт сообщение с `Value`, `Blob`, пользователем и таймаутом (по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
var
  LMsg: Variant;
begin
  // Blob/User/Timeout — по сигнатуре RTTI; точная семантика полей требует дополнения тимлида
  LMsg := NewMessageEx('Camera1.FrameJpg', '', Null, Null, 0);
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticoremessages-newmessagefromjson"></a>
### `TICoreMessages.NewMessageFromJson`

*** `TICoreMessages.NewMessageFromJson` — Создание сообщения из JSON ****

`function NewMessageFromJson(Json, NewMsgName: String; Remote: Boolean): Variant`

**Входные параметры:**
- `Json: String` — JSON-текст сообщения (по TLB)
- `NewMsgName: String` — имя сообщения (по TLB)
- `Remote: Boolean` — признак Remote (по TLB)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Метод `NewMessageFromJSON` COM-интерфейса (по TLB / `fsCoreScript.pas`).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.NewMessageFromJson(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticoremessages-postmsg"></a>
### `TICoreMessages.PostMsg`

*** `TICoreMessages.PostMsg` — Асинхронная отправка ****

`function PostMsg(Msg: Variant): Boolean`

**Входные параметры:**
- `Msg: Variant` — объект сообщения (`IMessage` / `TIMessage`) для постановки в очередь (по PluginAPI_desc.odt)

**Возвращает:**

`True`, если сообщение поставлено в очередь хотя бы одному обработчику; `False`, если обработчиков нет (по PluginAPI_desc.odt)

**Сведения из исходников / ODT:**

- Ставит сообщение в очередь каждого обработчика; `True` при успешной постановке, `False` если обработчиков нет (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
var
  LMsg: Variant;
  Ok: Boolean;
begin
  LMsg := CoreMessages.NewMessage('Camera1.FrameJpg', '');
  Ok := CoreMessages.PostMsg(LMsg); // True, если есть обработчики
  DebugLog(_ToStr(Ok));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="ticoremessages-sendmsg"></a>
### `TICoreMessages.SendMsg`

*** `TICoreMessages.SendMsg` — Синхронная отправка ****

`function SendMsg(Msg: Variant; Timeout: Integer): Variant`

**Входные параметры:**
- `Msg: Variant` — объект сообщения для синхронной отправки (по PluginAPI_desc.odt)
- `Timeout: Integer` — таймаут ожидания в мс; `-1` — бесконечное ожидание (по PluginAPI_desc.odt)

**Возвращает:**

значение поля `Result` сообщения после ожидания обработки (по PluginAPI_desc.odt)

**Сведения из исходников / ODT:**

- Ждёт завершения обработки всеми подписчиками до `Timeout` мс (`-1` — без лимита).
- Окончание определяется по счётчику ссылок сообщения; результат — поле `Result` (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
var
  LMsg, LRes: Variant;
begin
  LMsg := CoreMessages.NewMessage('Camera1.FrameJpg', '');
  LRes := CoreMessages.SendMsg(LMsg, 1000); // ждать до 1000 мс; -1 — бесконечно
  DebugLog(LRes);
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="ticoremessages-registeredmessages"></a>
### `TICoreMessages.RegisteredMessages`

*** `TICoreMessages.RegisteredMessages` — Зарегистрированные сообщения ****

`property RegisteredMessages: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `RegisteredMessages` интерфейса `ICoreMessages` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TICoreMessages.RegisteredMessages` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.RegisteredMessages));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticorescheduler"></a>
## `TICoreScheduler`

Обёртка над `ICoreScheduler`: отложенная или периодическая отправка сообщений. Расписание `AddTask` — строка из 6 полей (секунда…день недели), локальное время компьютера сервера, синтаксис как crontab; день недели и день месяца вместе обрабатываются по «ИЛИ». `AddTimer` шлёт сообщение каждые N секунд. В скриптовой RTTI флаг `RunOnce` отображается на опцию `SchedulerRunOnce` ядра (PluginAPI_desc.odt / `fsCoreScript.pas`). Примеры в старом ODT с укороченной сигнатурой `AddTask` считаются устаревшими относительно текущего RTTI.

<a id="ticorescheduler-addtask"></a>
### `TICoreScheduler.AddTask`

*** `TICoreScheduler.AddTask` — Задача по расписанию ****

`function AddTask(Tab, UpdateTaskID: String; Msg: Variant; RunOnce: Boolean): String`

**Входные параметры:**
- `Tab: String` — строка расписания из 6 частей (Секунда Минута Час День Месяц ДеньНедели), локальное время сервера; синтаксис как crontab (по PluginAPI_desc.odt)
- `UpdateTaskID: String` — идентификатор задачи для обновления существующей; пустая строка — создать новую (по сигнатуре TLB `UpdateTaskID`)
- `Msg: Variant` — сообщение, которое планировщик отправит при срабатывании (по PluginAPI_desc.odt)
- `RunOnce: Boolean` — если True, в опции ядра добавляется `SchedulerRunOnce` (по `fsCoreScript.pas`)

**Возвращает:**

идентификатор задачи планировщика (по TLB / `fsCoreScript.pas`)

**Сведения из исходников / ODT:**

- Планирует отправку сообщения по crontab-подобной строке `Tab` (6 полей, локальное время сервера).
- `RunOnce=True` добавляет флаг `SchedulerRunOnce` в опции ядра (по PluginAPI_desc.odt / `fsCoreScript.pas`).

**Пример вызова:**

```pascal
var
  LMsg: Variant;
  TaskID: String;
begin
  LMsg := CoreMessages.NewMessage('MyPlugin.Tick', '');
  // каждый день в 00:05:00, локальное время сервера
  TaskID := CoreScheduler.AddTask('0 5 0 * * *', '', LMsg, False);
  DebugLog(TaskID);
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticorescheduler-addtimer"></a>
### `TICoreScheduler.AddTimer`

*** `TICoreScheduler.AddTimer` — Периодический таймер ****

`function AddTimer(Seconds: Integer; Msg: Variant): String`

**Входные параметры:**
- `Seconds: Integer` — период отправки сообщения в секундах (по PluginAPI_desc.odt)
- `Msg: Variant` — сообщение для периодической отправки (по PluginAPI_desc.odt)

**Возвращает:**

идентификатор таймера (по TLB / `fsCoreScript.pas`)

**Сведения из исходников / ODT:**

- Отправляет сообщение каждые `Seconds` секунд (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
var
  LMsg: Variant;
  TimerID: String;
begin
  LMsg := CoreMessages.NewMessage('MyPlugin.Tick', '');
  TimerID := CoreScheduler.AddTimer(30, LMsg); // каждые 30 секунд
  DebugLog(TimerID);
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="ticorescheduler-removetask"></a>
### `TICoreScheduler.RemoveTask`

*** `TICoreScheduler.RemoveTask` — Удаление задачи ****

`procedure RemoveTask(TaskID: String)`

**Входные параметры:**
- `TaskID: String` — идентификатор задачи, возвращённый `AddTask` (по TLB)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Снимает задачу по идентификатору (по TLB).

**Пример вызова:**

```pascal
begin
  // Obj.RemoveTask(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="ticorescheduler-removetimer"></a>
### `TICoreScheduler.RemoveTimer`

*** `TICoreScheduler.RemoveTimer` — Удаление таймера ****

`procedure RemoveTimer(TimerID: String)`

**Входные параметры:**
- `TimerID: String` — идентификатор таймера, возвращённый `AddTimer` (по TLB)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Снимает таймер по идентификатору (по TLB).

**Пример вызова:**

```pascal
begin
  // Obj.RemoveTimer(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiuser"></a>
## `TIUser`

Обёртка над `IUser`: сведения о пользователе HTTP-сессии или сообщения — идентификатор, имя, отображаемое имя, группа, роли, IP. Используется в `AccessCheck` страниц и в поле `User` сообщения (PluginAPI_desc.odt / TLB).

<a id="tiuser-hasrole"></a>
### `TIUser.HasRole`

*** `TIUser.HasRole` — Проверка роли ****

`function HasRole(RoleName: String): Boolean`

**Входные параметры:**
- `RoleName: String` — имя роли для проверки (по TLB `IUser.HasRole`)

**Возвращает:**

`True`, если у пользователя есть указанная роль (по TLB)

**Сведения из исходников / ODT:**

- Возвращает, входит ли роль в набор ролей пользователя (по TLB).
- Используется при проверке доступа к страницам (`AccessCheck`, по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.HasRole(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiuser-tojson"></a>
### `TIUser.ToJson`

*** `TIUser.ToJson` — JSON пользователя ****

`function ToJson: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Вызывает `IUser.ToJSON` (по TLB / `fsCoreScript.pas`).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.ToJson(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="tiuser-displayname"></a>
### `TIUser.DisplayName`

*** `TIUser.DisplayName` — Отображаемое имя ****

`property DisplayName: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `DisplayName` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIUser.DisplayName` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.DisplayName));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiuser-groupid"></a>
### `TIUser.GroupID`

*** `TIUser.GroupID` — Идентификатор группы ****

`property GroupID: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `GroupID` (тип `UserGroupType` в COM, Integer в скрипте) (по TLB / `fsCoreScript.pas`).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIUser.GroupID` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.GroupID));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="tiuser-groupname"></a>
### `TIUser.GroupName`

*** `TIUser.GroupName` — Имя группы ****

`property GroupName: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `GroupName` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIUser.GroupName` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.GroupName));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiuser-id"></a>
### `TIUser.ID`

*** `TIUser.ID` — Идентификатор пользователя ****

`property ID: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `ID` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIUser.ID` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.ID));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiuser-ip"></a>
### `TIUser.IP`

*** `TIUser.IP` — IP-адрес ****

`property IP: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `IP` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIUser.IP` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.IP));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiuser-name"></a>
### `TIUser.Name`

*** `TIUser.Name` — Имя пользователя ****

`property Name: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `Name` (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIUser.Name` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Name));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiuser-roles"></a>
### `TIUser.Roles`

*** `TIUser.Roles` — Роли пользователя ****

`property Roles: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `Roles` (`OleVariant` / Variant) (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIUser.Roles` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Roles));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="timessage"></a>
## `TIMessage`

Обёртка над `IMessage`: сообщение шины. Поля в основном только для чтения; исключение — `Result`, которое заполняют обработчики при `SendMsg`. Состав: полезная нагрузка `Value` (`Variant`), опциональный `Blob`, метка времени, признак устаревания `Expired` (устаревшие можно не обрабатывать), пользователь, таймаут, признак `Remote` (PluginAPI_desc.odt / TLB).

<a id="timessage-tojson"></a>
### `TIMessage.ToJson`

*** `TIMessage.ToJson` — JSON сообщения ****

`function ToJson: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Вызывает `IMessage.ToJSON` (по TLB / `fsCoreScript.pas`).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.ToJson(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="timessage-blob"></a>
### `TIMessage.Blob`

*** `TIMessage.Blob` — Двоичные данные сообщения ****

`property Blob: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Объект `IBlob` с двоичной полезной нагрузкой; может передаваться между плагинами без копирования данных (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIMessage.Blob` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Blob));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="timessage-expired"></a>
### `TIMessage.Expired`

*** `TIMessage.Expired` — Признак устаревания ****

`property Expired: Boolean`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Если сообщение устарело, обработчик может его не обрабатывать (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIMessage.Expired` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Expired));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="timessage-remote"></a>
### `TIMessage.Remote`

*** `TIMessage.Remote` — Признак удалённого сообщения ****

`property Remote: Boolean`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `Remote` интерфейса `IMessage` (по TLB). Развёрнутая семантика в текстовом ODT не описана.

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIMessage.Remote` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Remote));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="timessage-result"></a>
### `TIMessage.Result`

*** `TIMessage.Result` — Результат обработки ****

`property Result: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Единственное поле сообщения, доступное для записи; используется при синхронном `SendMsg` (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIMessage.Result` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Result));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="timessage-timeout"></a>
### `TIMessage.Timeout`

*** `TIMessage.Timeout` — Таймаут сообщения ****

`property Timeout: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Свойство `Timeout` (по TLB / RTTI).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIMessage.Timeout` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Timeout));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="timessage-timestamp"></a>
### `TIMessage.Timestamp`

*** `TIMessage.Timestamp` — Время отправки ****

`property Timestamp: TDateTime`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Дата/время отправки сообщения (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIMessage.Timestamp` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Timestamp));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="timessage-user"></a>
### `TIMessage.User`

*** `TIMessage.User` — Пользователь сообщения ****

`property User: TIUser`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `TIUser` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Объект `IUser` / `TIUser`, связанный с сообщением (по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIMessage.User` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.User));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="timessage-value"></a>
### `TIMessage.Value`

*** `TIMessage.Value` — Полезная нагрузка ****

`property Value: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Простое значение типа `Variant` (часто JSON-структура) (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIMessage.Value` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Value));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="tiwebserverrequest"></a>
## `TIWebServerRequest`

Обёртка над `IWebServerRequest`: входящий HTTP-запрос страницы плагина. Доступны параметры (`Input` / `InputStr` / `InputArr`), заголовки, cookie, метод, URI, имя страницы и текущий пользователь. Вызывается из пула HTTP-потоков в `HandleRequest` (PluginAPI_desc.odt / TLB).

<a id="tiwebserverrequest-cookie"></a>
### `TIWebServerRequest.Cookie`

*** `TIWebServerRequest.Cookie` — Cookie запроса ****

`function Cookie(Name: String): String`

**Входные параметры:**
- `Name: String` — имя cookie запроса (по PluginAPI_desc.odt / TLB)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Чтение cookie по имени (по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.Cookie(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-header"></a>
### `TIWebServerRequest.Header`

*** `TIWebServerRequest.Header` — Заголовок запроса ****

`function Header(Name: String): String`

**Входные параметры:**
- `Name: String` — имя HTTP-заголовка запроса (по PluginAPI_desc.odt / TLB)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Чтение HTTP-заголовка по имени (по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.Header(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-input"></a>
### `TIWebServerRequest.Input`

*** `TIWebServerRequest.Input` — Параметр запроса ****

`function Input(Name: String): Variant`

**Входные параметры:**
- `Name: String` — имя параметра запроса (по PluginAPI_desc.odt / TLB)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Параметр HTTP-запроса по имени (`OleVariant`) (по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.Input(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-inputarr"></a>
### `TIWebServerRequest.InputArr`

*** `TIWebServerRequest.InputArr` — Параметр-массив ****

`function InputArr(Name: String): Variant`

**Входные параметры:**
- `Name: String` — имя параметра-массива запроса (по TLB)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Параметр запроса как массив значений (по TLB).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.InputArr(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-inputstr"></a>
### `TIWebServerRequest.InputStr`

*** `TIWebServerRequest.InputStr` — Строковый параметр ****

`function InputStr(Name: String): String`

**Входные параметры:**
- `Name: String` — имя строкового параметра запроса (по TLB)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Параметр запроса как строка (по TLB).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.InputStr(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-tojson"></a>
### `TIWebServerRequest.ToJson`

*** `TIWebServerRequest.ToJson` — JSON запроса ****

`function ToJson: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Вызывает `IWebServerRequest.ToJSON` (по TLB / `fsCoreScript.pas`).

**Пример вызова:**

```pascal
var
  r: Variant;
begin
  // r := Obj.ToJson(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="tiwebserverrequest-currentuser"></a>
### `TIWebServerRequest.CurrentUser`

*** `TIWebServerRequest.CurrentUser` — Текущий пользователь ****

`property CurrentUser: TIUser`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `TIUser` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Пользователь сессии / авторизации запроса; используется в проверках доступа (по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIWebServerRequest.CurrentUser` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.CurrentUser));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-method"></a>
### `TIWebServerRequest.Method`

*** `TIWebServerRequest.Method` — HTTP-метод ****

`property Method: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Метод запроса (GET, POST, …) (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIWebServerRequest.Method` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Method));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-page"></a>
### `TIWebServerRequest.Page`

*** `TIWebServerRequest.Page` — Имя страницы ****

`property Page: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Имя зарегистрированной страницы плагина (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIWebServerRequest.Page` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.Page));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverrequest-uri"></a>
### `TIWebServerRequest.URI`

*** `TIWebServerRequest.URI` — URI запроса ****

`property URI: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- URI входящего запроса (по TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIWebServerRequest.URI` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.URI));
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverresponse"></a>
## `TIWebServerResponse`

Обёртка над `IWebServerResponse`: формирование ответа. `ReturnPage` — HTML по шаблону из `Views` внутри общего каркаса сайта (partials вроде `{{>header}}`); `ReturnError` — страница по `Error.html`; `ReturnText` / `ReturnBlob` — произвольный ответ (в COM для двоичных данных — `ReturnData`). Тексты и шаблоны — UTF-8. Дополнительно: cookie, заголовки, redirect, `CacheControl` (флаги кэша страницы из PluginAPI_desc.odt).

<a id="tiwebserverresponse-redirect"></a>
### `TIWebServerResponse.Redirect`

*** `TIWebServerResponse.Redirect` — Перенаправление ****

`procedure Redirect(PageName: String)`

**Входные параметры:**
- `PageName: String` — имя страницы для перенаправления (по TLB / RTTI)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Перенаправление на указанную страницу (по TLB / RTTI).

**Пример вызова:**

```pascal
begin
  // Obj.Redirect(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverresponse-returnblob"></a>
### `TIWebServerResponse.ReturnBlob`

*** `TIWebServerResponse.ReturnBlob` — Двоичный ответ ****

`procedure ReturnBlob(Blob: Variant; Status: Integer)`

**Входные параметры:**
- `Blob: Variant` — двоичное тело ответа (скрипковый аналог ReturnData, по PluginAPI_desc.odt / RTTI)
- `Status: Integer` — HTTP-статус (по RTTI)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Отдаёт двоичные данные с HTTP-статусом; скриптовый аналог COM-метода `ReturnData` (по PluginAPI_desc.odt / RTTI).

**Пример вызова:**

```pascal
begin
  // Obj.ReturnBlob(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/functions.txt`

---

<a id="tiwebserverresponse-returnerror"></a>
### `TIWebServerResponse.ReturnError`

*** `TIWebServerResponse.ReturnError` — Страница ошибки ****

`procedure ReturnError(Text: String; Status: Integer)`

**Входные параметры:**
- `Text: String` — текст ошибки; страница строится по шаблону Error.html (по PluginAPI_desc.odt)
- `Status: Integer` — HTTP-статус (по RTTI)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Формирует страницу ошибки по шаблону `Error.html` внутри общего каркаса сайта (по PluginAPI_desc.odt).

**Пример вызова:**

```pascal
begin
  Response.ReturnError('Ошибка обработки запроса', 500);
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="tiwebserverresponse-returnpage"></a>
### `TIWebServerResponse.ReturnPage`

*** `TIWebServerResponse.ReturnPage` — Ответ HTML-страницей ****

`procedure ReturnPage(Name: String; InputJSON: Variant)`

**Входные параметры:**
- `Name: String` — имя HTML-шаблона в папке Views плагина (по PluginAPI_desc.odt)
- `InputJSON: Variant` — данные для шаблона основной части страницы (по PluginAPI_desc.odt)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Строит страницу по шаблону из папки `Views` плагина и встраивает в основной шаблон сайта; параметры передаются в шаблон (по PluginAPI_desc.odt).
- В шаблоне можно подключать partials, например `{{>header}}`.

**Пример вызова:**

```pascal
begin
  // шаблон из Views плагина; InputJSON — данные для шаблона
  Response.ReturnPage('Kiosk', _ObjEx(['Title', 'Готовность']));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="tiwebserverresponse-returntext"></a>
### `TIWebServerResponse.ReturnText`

*** `TIWebServerResponse.ReturnText` — Текстовый HTTP-ответ ****

`procedure ReturnText(Text, ContentType: String; Status: Integer)`

**Входные параметры:**
- `Text: String` — полный текст ответа (по PluginAPI_desc.odt)
- `ContentType: String` — тип содержимого (по PluginAPI_desc.odt)
- `Status: Integer` — HTTP-статус (по PluginAPI_desc.odt)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Задаёт полный текст ответа, Content-Type и HTTP-статус (по PluginAPI_desc.odt).
- Текстовые ответы и шаблоны ожидаются в UTF-8.

**Пример вызова:**

```pascal
begin
  Response.ReturnText('{"ok":true}', 'application/json', 200);
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="tiwebserverresponse-setcookie"></a>
### `TIWebServerResponse.SetCookie`

*** `TIWebServerResponse.SetCookie` — Установка cookie ****

`procedure SetCookie(Name, Value: String; Expires: TDateTime)`

**Входные параметры:**
- `Name: String` — имя cookie (по TLB)
- `Value: String` — значение cookie (по TLB)
- `Expires: TDateTime` — срок действия cookie (по TLB)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Задаёт cookie ответа с сроком действия (по TLB).

**Пример вызова:**

```pascal
begin
  // Obj.SetCookie(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverresponse-setheader"></a>
### `TIWebServerResponse.SetHeader`

*** `TIWebServerResponse.SetHeader` — Установка заголовка ****

`procedure SetHeader(Value: String)`

**Входные параметры:**
- `Value: String` — строка HTTP-заголовка ответа (по TLB)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Добавляет/задаёт заголовок HTTP-ответа (по TLB).

**Пример вызова:**

```pascal
begin
  // Obj.SetHeader(...); // см. параметры и сведения выше
end
```

_Источник сведений:_ `Материалы для документации/source/PluginAPI_TLB.pas`

---

<a id="tiwebserverresponse-cachecontrol"></a>
### `TIWebServerResponse.CacheControl`

*** `TIWebServerResponse.CacheControl` — Флаги кэширования ответа ****

`property CacheControl: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Соответствует `WebPageOptionsType` / флагам вроде `WebPageCacheControlNoCache`, `WebPageCacheControlAgeDay` и др. (по PluginAPI_desc.odt / TLB).

**Пример вызова:**

```pascal
begin
  // Чтение свойства `TIWebServerResponse.CacheControl` у объекта интерфейса (см. сведения выше).
  // DebugLog(_ToStr(Obj.CacheControl));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/PluginAPI_TLB.pas`

---
