# Плагин Конструктор / Работа с глобальными переменными Конструктора

Глобальные переменные конструктора — общее состояние сценария плагина: входные и выходные параметры страниц, настройки, внутренние флаги, значения, публикуемые сообщениями. В веб-UI конструктора (раздел SMC AutoScaleWebKiosk1) они делятся на входные, выходные, настройки, внутренние, опубликованные и с обработчиком изменения. Скрипт читает и пишет объявленные переменные через `GetVarValue` / `SetVarValue` (часто в production-скриптах к ним обращаются и по имени напрямую); `GetVarModTime`, `GetVarModCount`, `GetVarModFreq` дают метаданные изменений. Отдельно среда Конструктора внедряет встроенные объекты и константы экземпляра плагина (`CoreConfig`, `Request`, `Response`, `PluginName`, `CurrentState` и др. — см. ниже): их не нужно объявлять в списке глобалов SMC. При отсутствии пользовательской переменной с указанным именем `GetVar*` / `SetVar*` вызывают исключение. Это не замена журналам: глобалы живут в контексте работающего плагина-сценария.

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

Подробности методов `CoreConfig` / `Request` / `Response` — в разделе [Интерфейс сервера](13-interfeys-servera.md).

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
- `Name: String` — имя глобальной переменной Конструктора (по `fsCoreScript.pas`)

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
- `Name: String` — имя глобальной переменной Конструктора (по `fsCoreScript.pas`)
- `Value: Variant` — новое значение переменной (по RTTI / `fsCoreScript.pas`)

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
