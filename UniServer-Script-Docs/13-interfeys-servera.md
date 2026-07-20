# Интерфейс сервера

Раздел описывает объекты ядра, доступные скрипту как типизированные интерфейсы: конфигурация (`TICoreConfig`), сообщения (`TICoreMessages`, `TIMessage`, `TIBlob`), планировщик (`TICoreScheduler`), локаль (`TICoreLocale`), пользователь (`TIUser`), HTTP-запрос и ответ (`TIWebServerRequest`, `TIWebServerResponse`). Плагин встраивает страницы вызовом регистрации обработчика; при обращении к `/core/plugins/ИмяПлагина/ИмяСтраницы` ядро вызывает обработчик с парой Request/Response. Ответ формируют `ReturnPage` (шаблон из `Views` в UTF-8, встройка в общий каркас сайта), `ReturnError`, `ReturnText` / `ReturnBlob`. Страницы принято разделять на интерфейс, действия и данные с разными флагами аутентификации и кэша. `TIBlob` передаёт двоичные данные без лишнего копирования между плагинами. Планировщик ставит отправку сообщений по crontab-подобной строке или таймеру. Этот слой — полная модель «законов» сервера; упрощённые `GetConfig*` / `PostMsg` из предыдущих разделов дублируют часть возможностей для совместимости.

Состав интерфейсов и сигнатуры подтверждены RTTI. Описание, отсутствующее в исходниках и ODT, отмечено предупреждением.

<a id="tiblob"></a>
## `TIBlob`

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> В `functions.txt` строка описания `TIBlob` обрывается на «используется для»; назначение не восстановлено.

<a id="tiblob-tojson"></a>
### `TIBlob.ToJson`

*** `TIBlob.ToJson` — Элемент скриптового API ****

`function ToJson: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := ToJson(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiblob-name"></a>
### `TIBlob.Name`

*** `TIBlob.Name` — Элемент скриптового API ****

`property Name: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Name` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiblob-contenttype"></a>
### `TIBlob.ContentType`

*** `TIBlob.ContentType` — Элемент скриптового API ****

`property ContentType: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `ContentType` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiblob-data"></a>
### `TIBlob.Data`

*** `TIBlob.Data` — Элемент скриптового API ****

`property Data: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Data` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiblob-size"></a>
### `TIBlob.Size`

*** `TIBlob.Size` — Элемент скриптового API ****

`property Size: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Size` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig"></a>
## `TICoreConfig`

<a id="ticoreconfig-binpath"></a>
### `TICoreConfig.BinPath`

*** `TICoreConfig.BinPath` — Элемент скриптового API ****

`property BinPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `BinPath` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-datapath"></a>
### `TICoreConfig.DataPath`

*** `TICoreConfig.DataPath` — Элемент скриптового API ****

`property DataPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `DataPath` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-defaults"></a>
### `TICoreConfig.Defaults`

*** `TICoreConfig.Defaults` — Элемент скриптового API ****

`property Defaults[Name: String]: String`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Defaults` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-logpath"></a>
### `TICoreConfig.LogPath`

*** `TICoreConfig.LogPath` — Элемент скриптового API ****

`property LogPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `LogPath` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-logverbose"></a>
### `TICoreConfig.LogVerbose`

*** `TICoreConfig.LogVerbose` — Элемент скриптового API ****

`property LogVerbose: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `LogVerbose` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-msgfortype"></a>
### `TICoreConfig.MsgForType`

*** `TICoreConfig.MsgForType` — Элемент скриптового API ****

`property MsgForType[Name: String; Value: Variant]: String`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Value: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `MsgForType` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-msginfo"></a>
### `TICoreConfig.MsgInfo`

*** `TICoreConfig.MsgInfo` — Элемент скриптового API ****

`property MsgInfo[Name: String]: String`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `MsgInfo` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-msginfos"></a>
### `TICoreConfig.MsgInfos`

*** `TICoreConfig.MsgInfos` — Элемент скриптового API ****

`property MsgInfos: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `MsgInfos` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-msgnames"></a>
### `TICoreConfig.MsgNames`

*** `TICoreConfig.MsgNames` — Элемент скриптового API ****

`property MsgNames: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `MsgNames` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-mypath"></a>
### `TICoreConfig.MyPath`

*** `TICoreConfig.MyPath` — Элемент скриптового API ****

`property MyPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `MyPath` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-pluginoptsdocjson"></a>
### `TICoreConfig.PluginOptsDocJson`

*** `TICoreConfig.PluginOptsDocJson` — Элемент скриптового API ****

`property PluginOptsDocJson[Name: String]: String`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `PluginOptsDocJson` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-pluginpath"></a>
### `TICoreConfig.PluginPath`

*** `TICoreConfig.PluginPath` — Элемент скриптового API ****

`property PluginPath: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `PluginPath` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-roles"></a>
### `TICoreConfig.Roles`

*** `TICoreConfig.Roles` — Элемент скриптового API ****

`property Roles: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Roles` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-serveraddr"></a>
### `TICoreConfig.ServerAddr`

*** `TICoreConfig.ServerAddr` — Элемент скриптового API ****

`property ServerAddr: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `ServerAddr` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-serverport"></a>
### `TICoreConfig.ServerPort`

*** `TICoreConfig.ServerPort` — Элемент скриптового API ****

`property ServerPort: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `ServerPort` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-url"></a>
### `TICoreConfig.URL`

*** `TICoreConfig.URL` — Элемент скриптового API ****

`property URL: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `URL` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoreconfig-values"></a>
### `TICoreConfig.Values`

*** `TICoreConfig.Values` — Элемент скриптового API ****

`property Values[Name: String]: String`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Values` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorelocale"></a>
## `TICoreLocale`

<a id="ticorelocale-formatcurrency"></a>
### `TICoreLocale.FormatCurrency`

*** `TICoreLocale.FormatCurrency` — Элемент скриптового API ****

`function FormatCurrency(Value: Double; Currency: String; Spellout, Cents: Boolean): String`

**Входные параметры:**
- `Value: Double` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Currency: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Spellout: Boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Cents: Boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := FormatCurrency(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorelocale-formatdate"></a>
### `TICoreLocale.FormatDate`

*** `TICoreLocale.FormatDate` — Элемент скриптового API ****

`function FormatDate(Value: TDateTime; WithTime: Boolean): String`

**Входные параметры:**
- `Value: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `WithTime: Boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := FormatDate(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorelocale-formatplural"></a>
### `TICoreLocale.FormatPlural`

*** `TICoreLocale.FormatPlural` — Элемент скриптового API ****

`function FormatPlural(Value: Integer; Plurals: String): String`

**Входные параметры:**
- `Value: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Plurals: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := FormatPlural(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorelocale-formatweight"></a>
### `TICoreLocale.FormatWeight`

*** `TICoreLocale.FormatWeight` — Элемент скриптового API ****

`function FormatWeight(Value: Double; Spellout: Boolean): String`

**Входные параметры:**
- `Value: Double` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Spellout: Boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := FormatWeight(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorelocale-translate"></a>
### `TICoreLocale.Translate`

*** `TICoreLocale.Translate` — Элемент скриптового API ****

`function Translate(Value: String): String`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Translate(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorelocale-language"></a>
### `TICoreLocale.Language`

*** `TICoreLocale.Language` — Элемент скриптового API ****

`property Language: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Language` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorelocale-languagecode"></a>
### `TICoreLocale.LanguageCode`

*** `TICoreLocale.LanguageCode` — Элемент скриптового API ****

`property LanguageCode: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `LanguageCode` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorelocale-languageid"></a>
### `TICoreLocale.LanguageID`

*** `TICoreLocale.LanguageID` — Элемент скриптового API ****

`property LanguageID: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `LanguageID` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoremessages"></a>
## `TICoreMessages`

<a id="ticoremessages-hashandlerfor"></a>
### `TICoreMessages.HasHandlerFor`

*** `TICoreMessages.HasHandlerFor` — Элемент скриптового API ****

`function HasHandlerFor(MsgName: String): Boolean`

**Входные параметры:**
- `MsgName: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := HasHandlerFor(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoremessages-newmessage"></a>
### `TICoreMessages.NewMessage`

*** `TICoreMessages.NewMessage` — Создание сообщения ****

`function NewMessage(MsgName: String; Value: Variant): Variant`

**Входные параметры:**
- `MsgName: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Value: Variant` — полезная нагрузка сообщения (тип Variant по RTTI)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Имя сообщения имеет вид `ИмяПлагина.ИмяСообщения`.

**Пример вызова:**

```pascal
var
  LMsg: Variant;             // сообщение
begin
  LMsg := NewMessage('Camera1.FrameJpg', ''); // создать сообщение по имени
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticoremessages-newmessageex"></a>
### `TICoreMessages.NewMessageEx`

*** `TICoreMessages.NewMessageEx` — Создание расширенного сообщения ****

`function NewMessageEx(MsgName: String; Value: Variant; Blob, CurrentUser: Variant; Timeout: Integer): Variant`

**Входные параметры:**
- `MsgName: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Value: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Blob: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `CurrentUser: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Timeout: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Имя сообщения имеет вид `ИмяПлагина.ИмяСообщения`.

**Пример вызова:**

```pascal
var
  LMsg: Variant;
begin
  // Blob/User/Timeout — по сигнатуре RTTI; точная семантика полей требует дополнения тимлида
  LMsg := NewMessageEx('Camera1.FrameJpg', '', Null, Null, 0);
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="ticoremessages-newmessagefromjson"></a>
### `TICoreMessages.NewMessageFromJson`

*** `TICoreMessages.NewMessageFromJson` — Элемент скриптового API ****

`function NewMessageFromJson(Json, NewMsgName: String; Remote: Boolean): Variant`

**Входные параметры:**
- `Json: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `NewMsgName: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Remote: Boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := NewMessageFromJson(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticoremessages-postmsg"></a>
### `TICoreMessages.PostMsg`

*** `TICoreMessages.PostMsg` — Асинхронная отправка сообщения ****

`function PostMsg(Msg: Variant): Boolean`

**Входные параметры:**
- `Msg: Variant` — сообщение для асинхронной постановки в очередь (по PluginAPI_desc.odt)

**Возвращает:**

по PluginAPI_desc.odt для интерфейса ядра PostMsg возвращает WordBool/False при отсутствии обработчиков; в глобальной RTTI-процедуре `procedure PostMsg` возвращаемого значения нет

**Сведения из исходников / ODT:**

- Постановка в очередь выполняется асинхронно; возвращает `False`, если обработчиков нет.

**Пример вызова:**

```pascal
var
  LMsg: Variant;
begin
  LMsg := NewMessage('Camera1.FrameJpg', ''); // подготовить сообщение
  PostMsg(LMsg);                              // отправить асинхронно
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="ticoremessages-sendmsg"></a>
### `TICoreMessages.SendMsg`

*** `TICoreMessages.SendMsg` — Синхронная отправка сообщения ****

`function SendMsg(Msg: Variant; Timeout: Integer): Variant`

**Входные параметры:**
- `Msg: Variant` — сообщение для синхронной отправки (по PluginAPI_desc.odt)
- `Timeout: Integer` — таймаут ожидания в миллисекундах; `-1` — бесконечное ожидание (по PluginAPI_desc.odt)

**Возвращает:**

результат обработки (поле Result сообщения) после ожидания до Timeout (по PluginAPI_desc.odt)

**Сведения из исходников / ODT:**

- Ожидает обработку до `Timeout` мс; `-1` означает бесконечное ожидание.
- Результат берётся из поля `Result` сообщения.

**Пример вызова:**

```pascal
var
  LMsg, LRes: Variant;
begin
  LMsg := NewMessage('Camera1.FrameJpg', ''); // подготовить сообщение
  LRes := SendMsg(LMsg, 1000);                // отправить синхронно, ждать до 1000 мс
  DebugLog(LRes);                             // результат обработки
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`

---

<a id="ticoremessages-registeredmessages"></a>
### `TICoreMessages.RegisteredMessages`

*** `TICoreMessages.RegisteredMessages` — Элемент скриптового API ****

`property RegisteredMessages: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `RegisteredMessages` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorescheduler"></a>
## `TICoreScheduler`

<a id="ticorescheduler-addtask"></a>
### `TICoreScheduler.AddTask`

*** `TICoreScheduler.AddTask` — Элемент скриптового API ****

`function AddTask(Tab, UpdateTaskID: String; Msg: Variant; RunOnce: Boolean): String`

**Входные параметры:**
- `Tab: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `UpdateTaskID: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Msg: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `RunOnce: Boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := AddTask(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorescheduler-addtimer"></a>
### `TICoreScheduler.AddTimer`

*** `TICoreScheduler.AddTimer` — Элемент скриптового API ****

`function AddTimer(Seconds: Integer; Msg: Variant): String`

**Входные параметры:**
- `Seconds: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Msg: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := AddTimer(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorescheduler-removetask"></a>
### `TICoreScheduler.RemoveTask`

*** `TICoreScheduler.RemoveTask` — Элемент скриптового API ****

`procedure RemoveTask(TaskID: String)`

**Входные параметры:**
- `TaskID: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // RemoveTask(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="ticorescheduler-removetimer"></a>
### `TICoreScheduler.RemoveTimer`

*** `TICoreScheduler.RemoveTimer` — Элемент скриптового API ****

`procedure RemoveTimer(TimerID: String)`

**Входные параметры:**
- `TimerID: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // RemoveTimer(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiuser"></a>
## `TIUser`

<a id="tiuser-hasrole"></a>
### `TIUser.HasRole`

*** `TIUser.HasRole` — Элемент скриптового API ****

`function HasRole(RoleName: String): Boolean`

**Входные параметры:**
- `RoleName: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := HasRole(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiuser-tojson"></a>
### `TIUser.ToJson`

*** `TIUser.ToJson` — Элемент скриптового API ****

`function ToJson: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := ToJson(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiuser-displayname"></a>
### `TIUser.DisplayName`

*** `TIUser.DisplayName` — Элемент скриптового API ****

`property DisplayName: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `DisplayName` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiuser-groupid"></a>
### `TIUser.GroupID`

*** `TIUser.GroupID` — Элемент скриптового API ****

`property GroupID: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `GroupID` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiuser-groupname"></a>
### `TIUser.GroupName`

*** `TIUser.GroupName` — Элемент скриптового API ****

`property GroupName: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `GroupName` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiuser-id"></a>
### `TIUser.ID`

*** `TIUser.ID` — Элемент скриптового API ****

`property ID: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `ID` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiuser-ip"></a>
### `TIUser.IP`

*** `TIUser.IP` — Элемент скриптового API ****

`property IP: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `IP` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiuser-name"></a>
### `TIUser.Name`

*** `TIUser.Name` — Элемент скриптового API ****

`property Name: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Name` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiuser-roles"></a>
### `TIUser.Roles`

*** `TIUser.Roles` — Элемент скриптового API ****

`property Roles: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Roles` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="timessage"></a>
## `TIMessage`

<a id="timessage-tojson"></a>
### `TIMessage.ToJson`

*** `TIMessage.ToJson` — Элемент скриптового API ****

`function ToJson: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := ToJson(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="timessage-blob"></a>
### `TIMessage.Blob`

*** `TIMessage.Blob` — Элемент скриптового API ****

`property Blob: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Blob` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="timessage-expired"></a>
### `TIMessage.Expired`

*** `TIMessage.Expired` — Элемент скриптового API ****

`property Expired: Boolean`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Expired` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="timessage-remote"></a>
### `TIMessage.Remote`

*** `TIMessage.Remote` — Элемент скриптового API ****

`property Remote: Boolean`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Boolean` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Remote` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="timessage-result"></a>
### `TIMessage.Result`

*** `TIMessage.Result` — Элемент скриптового API ****

`property Result: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Result` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="timessage-timeout"></a>
### `TIMessage.Timeout`

*** `TIMessage.Timeout` — Элемент скриптового API ****

`property Timeout: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Timeout` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="timessage-timestamp"></a>
### `TIMessage.Timestamp`

*** `TIMessage.Timestamp` — Элемент скриптового API ****

`property Timestamp: TDateTime`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `TDateTime` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Timestamp` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="timessage-user"></a>
### `TIMessage.User`

*** `TIMessage.User` — Элемент скриптового API ****

`property User: TIUser`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `TIUser` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `User` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="timessage-value"></a>
### `TIMessage.Value`

*** `TIMessage.Value` — Элемент скриптового API ****

`property Value: Variant`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Value` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest"></a>
## `TIWebServerRequest`

<a id="tiwebserverrequest-cookie"></a>
### `TIWebServerRequest.Cookie`

*** `TIWebServerRequest.Cookie` — Элемент скриптового API ****

`function Cookie(Name: String): String`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Cookie(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest-header"></a>
### `TIWebServerRequest.Header`

*** `TIWebServerRequest.Header` — Элемент скриптового API ****

`function Header(Name: String): String`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Header(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest-input"></a>
### `TIWebServerRequest.Input`

*** `TIWebServerRequest.Input` — Элемент скриптового API ****

`function Input(Name: String): Variant`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := Input(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest-inputarr"></a>
### `TIWebServerRequest.InputArr`

*** `TIWebServerRequest.InputArr` — Элемент скриптового API ****

`function InputArr(Name: String): Variant`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := InputArr(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest-inputstr"></a>
### `TIWebServerRequest.InputStr`

*** `TIWebServerRequest.InputStr` — Элемент скриптового API ****

`function InputStr(Name: String): String`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := InputStr(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest-tojson"></a>
### `TIWebServerRequest.ToJson`

*** `TIWebServerRequest.ToJson` — Элемент скриптового API ****

`function ToJson: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  r: Variant; // результат (тип уточняется сигнатурой)
begin
  // r := ToJson(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest-currentuser"></a>
### `TIWebServerRequest.CurrentUser`

*** `TIWebServerRequest.CurrentUser` — Элемент скриптового API ****

`property CurrentUser: TIUser`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `TIUser` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `CurrentUser` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest-method"></a>
### `TIWebServerRequest.Method`

*** `TIWebServerRequest.Method` — Элемент скриптового API ****

`property Method: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Method` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest-page"></a>
### `TIWebServerRequest.Page`

*** `TIWebServerRequest.Page` — Элемент скриптового API ****

`property Page: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `Page` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverrequest-uri"></a>
### `TIWebServerRequest.URI`

*** `TIWebServerRequest.URI` — Элемент скриптового API ****

`property URI: String`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `URI` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverresponse"></a>
## `TIWebServerResponse`

<a id="tiwebserverresponse-redirect"></a>
### `TIWebServerResponse.Redirect`

*** `TIWebServerResponse.Redirect` — Элемент скриптового API ****

`procedure Redirect(PageName: String)`

**Входные параметры:**
- `PageName: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Redirect(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverresponse-returnblob"></a>
### `TIWebServerResponse.ReturnBlob`

*** `TIWebServerResponse.ReturnBlob` — Элемент скриптового API ****

`procedure ReturnBlob(Blob: Variant; Status: Integer)`

**Входные параметры:**
- `Blob: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Status: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // ReturnBlob(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverresponse-returnerror"></a>
### `TIWebServerResponse.ReturnError`

*** `TIWebServerResponse.ReturnError` — Страница ошибки ****

`procedure ReturnError(Text: String; Status: Integer)`

**Входные параметры:**
- `Text: String` — текст ошибки
- `Status: Integer` — HTTP-статус

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Формирует страницу ошибки по шаблону `Error.html`.

**Пример вызова:**

```pascal
begin
  // ReturnError(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="tiwebserverresponse-returnpage"></a>
### `TIWebServerResponse.ReturnPage`

*** `TIWebServerResponse.ReturnPage` — Ответ страницей ****

`procedure ReturnPage(Name: String; InputJSON: Variant)`

**Входные параметры:**
- `Name: String` — имя HTML-шаблона в Views (по PluginAPI_desc.odt)
- `InputJSON: Variant` — данные (scope) для шаблона (по RTTI / практике ReturnPage в исходниках)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Формирует встроенную в основной шаблон сайта страницу по указанному шаблону.

**Пример вызова:**

```pascal
begin
  // ReturnPage(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="tiwebserverresponse-returntext"></a>
### `TIWebServerResponse.ReturnText`

*** `TIWebServerResponse.ReturnText` — Текстовый HTTP-ответ ****

`procedure ReturnText(Text, ContentType: String; Status: Integer)`

**Входные параметры:**
- `Text: String` — текст ответа
- `ContentType: String` — тип содержимого (Content-Type)
- `Status: Integer` — HTTP-статус ответа

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Передаёт полный текст ответа, тип содержимого и HTTP-статус.

**Пример вызова:**

```pascal
begin
  // ReturnText(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="tiwebserverresponse-setcookie"></a>
### `TIWebServerResponse.SetCookie`

*** `TIWebServerResponse.SetCookie` — Элемент скриптового API ****

`procedure SetCookie(Name, Value: String; Expires: TDateTime)`

**Входные параметры:**
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Expires: TDateTime` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // SetCookie(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverresponse-setheader"></a>
### `TIWebServerResponse.SetHeader`

*** `TIWebServerResponse.SetHeader` — Элемент скриптового API ****

`procedure SetHeader(Value: String)`

**Входные параметры:**
- `Value: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // SetHeader(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="tiwebserverresponse-cachecontrol"></a>
### `TIWebServerResponse.CacheControl`

*** `TIWebServerResponse.CacheControl` — Элемент скриптового API ****

`property CacheControl: Integer`

**Входные параметры:**
_Параметры отсутствуют._

**Возвращает:**

Значение типа `Integer` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // Свойство `CacheControl` доступно у соответствующего объекта интерфейса.
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: пример чтения/записи конкретного свойства в материалах отсутствует.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---
