# Плагин Конструктор / Работа с глобальными переменными Конструктора

Глобальные переменные конструктора — общее состояние сценария плагина: входные и выходные параметры страниц, настройки, внутренние флаги, значения, публикуемые сообщениями. Скрипт читает и пишет объявленные переменные через `GetVarValue` / `SetVarValue` (в production часто по имени напрямую: `Result_CURRENT_MASSA`, `modeAuto`). `GetVarModTime` / `GetVarModFreq` в ScriptsCraneScale / BunkerScale используют для таймаутов авторежима и мониторинга канала массы. Отдельно среда внедряет `CoreConfig`, `Request`, `Response`, `PluginName`, `CurrentState` и др. (см. ниже) — их не объявляют в SMC. FSM: переходы `smt.*` только вычисляют следующее состояние (`Result := …`); эффекты — в `sme.*` / `cmd.*`. При отсутствии пользовательской переменной `GetVar*` / `SetVar*` вызывают исключение. Это не замена журналам.

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
