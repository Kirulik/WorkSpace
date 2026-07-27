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

Подробности методов `CoreConfig` / `Request` / `Response` в отдельном справочнике интерфейсов пока не публикуются (раздел на рассмотрении); в скриптах используют свойства и методы объектов среды напрямую.

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

Возвращает текущее значение глобальной переменной Конструктора по имени. При отсутствии переменной вызывается исключение.

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

Записывает новое значение в глобальную переменную Конструктора по имени. При отсутствии переменной вызывается исключение.

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
