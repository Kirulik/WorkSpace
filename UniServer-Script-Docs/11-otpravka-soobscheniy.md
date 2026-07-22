# Отправка сообщений

Сообщения — шина взаимодействия плагинов и ядра UniServer. Имя имеет вид `ИмяПлагина.ИмяСообщения`; в ScriptsAutoControl / BunkerScale / CraneScale команду почти всегда собирают как `PluginName + '.Command'` (например `PluginName + '.FindPassDoc'`). У сообщения есть `Value` (`Variant`), опциональный `Blob`, метка времени и признак устаревания. `NewMessage` / `NewMessageEx` создают объект; `PostMsg` ставит в очередь асинхронно (FixPhoto, SaveRecord, Enable — fire-and-forget); `SendMsg` ждёт обработки до `Timeout` мс и возвращает поле `Result`. В cmd-скриптах ответ кладут в **`Msg.Result`**; снаружи его читают как значение `SendMsg(...)`. Обработчики работают в потоках ядра. Через эту же шину уходят операции журналов (`Journal.Operation`) и системные события вроде `Core.ServerStarted`.

<a id="newmessage"></a>
### `NewMessage`

*** `NewMessage` — Создание сообщения ****

`function NewMessage(MsgName: String; Value: Variant): Variant`

**Входные параметры:**
- `MsgName: String` — имя сообщения вида `ИмяПлагина.ИмяСообщения` (по PluginAPI_desc.odt)
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

<a id="newmessageex"></a>
### `NewMessageEx`

*** `NewMessageEx` — Создание расширенного сообщения ****

`function NewMessageEx(MsgName: String; Value: Variant; Blob, CurrentUser: Variant; Timeout: Integer): Variant`

**Входные параметры:**
- `MsgName: String` — имя сообщения вида `ИмяПлагина.ИмяСообщения` (по PluginAPI_desc.odt)
- `Value: Variant` — полезная нагрузка сообщения (`Variant`, по PluginAPI_desc.odt / RTTI)
- `Blob: Variant` — двоичные данные сообщения (`IBlob` / `TIBlob`, по PluginAPI_desc.odt)
- `CurrentUser: Variant` — пользователь, от имени которого создаётся сообщение (`IUser` / `TIUser`, по TLB)
- `Timeout: Integer` — таймаут сообщения в миллисекундах (по RTTI / TLB)

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

<a id="postmsg"></a>
### `PostMsg`

*** `PostMsg` — Асинхронная отправка сообщения ****

`function PostMsg(Msg: Variant): Boolean`

**Входные параметры:**
- `Msg: Variant` — сообщение для асинхронной постановки в очередь (по PluginAPI_desc.odt)

**Возвращает:**

по PluginAPI_desc.odt для интерфейса ядра PostMsg возвращает WordBool/False при отсутствии обработчиков; в глобальной RTTI-процедуре `procedure PostMsg` возвращаемого значения нет

**Сведения из исходников / ODT:**

- Постановка в очередь выполняется асинхронно; возвращает `False`, если обработчиков нет.
- Асинхронная постановка в очередь; в Scripts* — FixPhoto, SaveRecord, Enable (fire-and-forget).
- Глобальная RTTI-процедура `procedure PostMsg` не возвращает значение (в отличие от `TICoreMessages.PostMsg`).

**Пример вызова:**

```pascal
begin
  PostMsg(NewMessage(PluginName + '.FixPhoto', '')); // fire-and-forget
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/Скрипты/ScriptsAutoControl`

---

<a id="sendmsg"></a>
### `SendMsg`

*** `SendMsg` — Синхронная отправка сообщения ****

`function SendMsg(Msg: Variant; Timeout: Integer): Variant`

**Входные параметры:**
- `Msg: Variant` — сообщение для синхронной отправки (по PluginAPI_desc.odt)
- `Timeout: Integer` — таймаут ожидания в миллисекундах; `-1` — бесконечное ожидание (по PluginAPI_desc.odt)

**Возвращает:**

результат обработки (поле Result сообщения) после ожидания до Timeout (по PluginAPI_desc.odt)

**Сведения из исходников / ODT:**

- Ожидает обработку до `Timeout` мс; `-1` означает бесконечное ожидание.
- Результат берётся из поля `Result` сообщения.
- Синхронная отправка; результат — поле `Result` сообщения после ожидания.
- В cmd-скриптах ответ кладут в `Msg.Result`; снаружи читают значение `SendMsg(...)`.

**Пример вызова:**

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

_Источник сведений:_ `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`; `Материалы для документации/Скрипты/ScriptsAutoControl`

---
