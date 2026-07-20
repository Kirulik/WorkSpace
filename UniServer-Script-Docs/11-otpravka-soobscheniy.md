# Отправка сообщений

Сообщения — шина взаимодействия плагинов и ядра UniServer. Имя имеет вид `ИмяПлагина.ИмяСообщения` (например `Camera1.FrameJpg`); у сообщения есть `Value` (`Variant`), опциональный `Blob`, метка времени и признак устаревания. `NewMessage` / `NewMessageEx` создают объект; `PostMsg` ставит его в очередь асинхронно (если нет обработчиков — операция не доставляет сообщение); `SendMsg` ждёт завершения обработки у всех подписчиков до `Timeout` мс (`-1` — без лимита) и возвращает результат из поля `Result`. Обработчики сообщений работают в отдельных потоках ядра; устаревшие сообщения можно не обрабатывать. Через эту же шину уходят операции журналов (`Journal.Operation`) и системные события вроде `Core.ServerStarted`. В конструкторе (AutoScaleWebKiosk1) глобальные переменные могут публиковаться сообщениями — обмен «страница ↔ логика ↔ оборудование» строится на той же модели.

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
