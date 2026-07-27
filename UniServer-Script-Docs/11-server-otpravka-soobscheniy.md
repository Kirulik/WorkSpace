# Сервер. Отправка сообщений

Сообщения — шина взаимодействия плагинов и ядра UniServer. Имя имеет вид `ИмяПлагина.ИмяСообщения`; в Scripts* команду почти всегда собирают как `PluginName + '.Command'`. У сообщения есть `Value` (`Variant`), опциональный `Blob`, метка времени и признак устаревания. `NewMessage` / `NewMessageEx` создают объект; `PostMsg` ставит в очередь асинхронно; `SendMsg` ждёт обработки до `Timeout` мс и возвращает поле `Result`. В cmd-скриптах ответ кладут в `Msg.Result`. Через эту же шину уходят операции журналов (`Journal.Operation`).

<a id="newmessage"></a>

# `NewMessage` — Создание сообщения

## Синтаксис

```pascal
function NewMessage(MsgName: String; Value: Variant): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `MsgName` | `String` | имя сообщения вида `ИмяПлагина.ИмяСообщения` (по PluginAPI_desc.odt) |
| `Value` | `Variant` | полезная нагрузка сообщения (тип Variant по RTTI) |

## Описание

Возвращает новый объект сообщения с именем `ИмяПлагина.ИмяСообщения` и полезной нагрузкой `Value`. Точка входа для отправки команд и событий по шине.

> **Особенности:** Имя сообщения имеет вид `ИмяПлагина.ИмяСообщения`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  LMsg: Variant;             // сообщение
begin
  LMsg := NewMessage('Camera1.FrameJpg', ''); // создать сообщение по имени
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="newmessageex"></a>

# `NewMessageEx` — Создание расширенного сообщения

## Синтаксис

```pascal
function NewMessageEx(MsgName: String; Value: Variant; Blob, CurrentUser: Variant; Timeout: Integer): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `MsgName` | `String` | имя сообщения вида `ИмяПлагина.ИмяСообщения` (по PluginAPI_desc.odt) |
| `Value` | `Variant` | полезная нагрузка сообщения (`Variant`, по PluginAPI_desc.odt / RTTI) |
| `Blob` | `Variant` | двоичные данные сообщения (`IBlob` / `TIBlob`, по PluginAPI_desc.odt) |
| `CurrentUser` | `Variant` | пользователь, от имени которого создаётся сообщение (`IUser` / `TIUser`, по TLB) |
| `Timeout` | `Integer` | таймаут сообщения в миллисекундах (по RTTI / TLB) |

## Описание

Возвращает новый объект сообщения с дополнительной привязкой Blob, пользователя и таймаута. Расширенный вариант `NewMessage`, когда нужны двоичные данные или явный контекст пользователя.

> **Особенности:** Имя сообщения имеет вид `ИмяПлагина.ИмяСообщения`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  LMsg: Variant;
begin
  // Blob/User/Timeout — по сигнатуре RTTI; точная семантика полей требует дополнения тимлида
  LMsg := NewMessageEx('Camera1.FrameJpg', '', Null, Null, 0);
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="postmsg"></a>

# `PostMsg` — Асинхронная отправка сообщения

## Синтаксис

```pascal
function PostMsg(Msg: Variant): Boolean
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Msg` | `Variant` | сообщение для асинхронной постановки в очередь (по PluginAPI_desc.odt) |

## Описание

Ставит сообщение в очередь асинхронно (fire-and-forget): скрипт не ждёт ответа обработчиков.

> **Особенности:** Постановка в очередь выполняется асинхронно; возвращает `False`, если обработчиков нет. Асинхронная постановка в очередь; в Scripts* — FixPhoto, SaveRecord, Enable (fire-and-forget). Глобальная RTTI-процедура `procedure PostMsg` не возвращает значение (в отличие от `TICoreMessages.PostMsg`).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  PostMsg(NewMessage(PluginName + '.FixPhoto', '')); // fire-and-forget
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/Скрипты/ScriptsAutoControl`

---

<a id="sendmsg"></a>

# `SendMsg` — Синхронная отправка сообщения

## Синтаксис

```pascal
function SendMsg(Msg: Variant; Timeout: Integer): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Msg` | `Variant` | сообщение для синхронной отправки (по PluginAPI_desc.odt) |
| `Timeout` | `Integer` | таймаут ожидания в миллисекундах; `-1` — бесконечное ожидание (по PluginAPI_desc.odt) |

## Описание

Возвращает поле `Result` сообщения после синхронной обработки подписчиками (ожидание до `Timeout` мс, `-1` — без лимита). Так вызывают команды, которым нужен ответ.

> **Особенности:** Ожидает обработку до `Timeout` мс; `-1` означает бесконечное ожидание. Результат берётся из поля `Result` сообщения. Синхронная отправка; результат — поле `Result` сообщения после ожидания. В cmd-скриптах ответ кладут в `Msg.Result`; снаружи читают значение `SendMsg(...)`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  LMsg, LRes: Variant;
begin
  // ScriptsAutoControl: имя = PluginName + '.Command'
  LMsg := NewMessage(PluginName + '.FindPassDoc', _ToStr(_ObjEx(['Method', 'RFID', 'Label', RFID])));
  LRes := SendMsg(LMsg, 2000);
  DebugLog(_ToStr(LRes));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/Скрипты/ScriptsAutoControl`

---
