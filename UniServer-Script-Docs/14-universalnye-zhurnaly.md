# Работа с универсальными журналами и справочниками

Универсальные журналы — постоянное хранилище бизнес-данных UniServer (взвешивания, справочники, связанные документы). Скрипт обращается к журналу по имени: `GetRecord` / `GetRecords` читают, `SetRecord` сохраняет документ-`Variant`. Варианты `*NT` выполняют изменение без запуска триггеров (антирекурсия в ScriptsJournal); `Async*` ставят операцию в очередь без ожидания. `GetQuery` — SQL к SQLite-таблице `Journal`; `GetQueryEx` — к внешней БД. Связи (`SetLink*` / `DeleteLinks*`, типы SLAVE/MASTER/LINK) и вложения (`SetBlob`) дополняют документ. Триггеры `On*` и процедуры `Proc_*` (вызов через `ExecProc`) задают бизнес-логику журнала. Сохранение в реализации связано с шиной сообщений (`Journal.Operation`).

## Паттерны журналов (ScriptsJournal)

Контекст триггеров и процедур журнала (production):

| Идентификатор | Роль |
|---------------|------|
| `JournalName` | имя текущего журнала |
| `NewDoc` / `OldDoc` | документ до/после изменения |
| `UpdatedProps` | набор изменённых полей; проверка `UpdatedProps.Exists('FIELD')` |
| `Args` | аргументы хранимой процедуры |
| `Result` | возвращаемое значение триггера/процедуры (`OnBefore*` обычно `Result := True`) |

**Sync vs Async / NT**

- `*NT` — без триггеров (антирекурсия при каскадах).
- `Async*` — не блокировать `OnAfterUpdate`.
- `AsyncSetRecord` (без NT) — когда нужно, чтобы сработали триггеры (уведомление AutoScale о `Doc_Link`).

**Связи:** `SLAVE` (отвес→документ), `MASTER` (документ→отвес), `LINK` (отвес↔отвес).

**Хранимые процедуры:** файл `Proc_Name.pas` → вызов `ExecProc(JournalName, 'Name', Args)`.


<a id="getquery"></a>
### `GetQuery`

*** `GetQuery` — SQL-запрос к журналу ****

`function GetQuery(Journal, SQL: String): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (по EventScript_desc.odt)
- `SQL: String` — SQL-запрос; синтаксис SQLite; имя таблицы всегда Journal (по EventScript_desc.odt)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Использует SQLite; имя таблицы журнала всегда `Journal`.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(GetQuery('WeighingJournal', 'SELECT MAX(RowID) FROM Journal'))); // SQL к журналу
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getqueryex"></a>
### `GetQueryEx`

*** `GetQueryEx` — SQL-запрос к внешней БД ****

`function GetQueryEx(Journal, SQL: String): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (по EventScript_desc.odt)
- `SQL: String` — SQL-запрос к внешней БД; синтаксис внешней БД (по EventScript_desc.odt)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Выполняет запрос к внешней базе данных.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(GetQueryEx('WeighingJournal', 'SELECT MAX(ID) FROM Weighing'))); // SQL к внешней БД
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getrecord"></a>
### `GetRecord`

*** `GetRecord` — Чтение записи журнала ****

`function GetRecord(Journal, Code: String): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (EventScript ODT; ScriptsJournal)
- `Code: String` — идентификатор записи CODE (EventScript ODT; ScriptsJournal)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Получает запись по идентификатору `Code`.

**Пример вызова:**

```pascal
var
  Doc: Variant;
begin
  Doc := GetRecord('WeighingJournal', 'D307EB...205027'); // запись по CODE
  DebugLog(Doc.NUMB_TS);                                  // поле записи
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getrecords"></a>
### `GetRecords`

*** `GetRecords` — Поиск записей журнала ****

`function GetRecords(Journal: String; Args: Variant): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (EventScript ODT)
- `Args: Variant` — объект: Filter (поля и операторы NotEqual/Range/OR), SortField, SortDesc, FirstRow, MaxRows (ScriptsJournal / ScriptsAutoControl)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- В `Args` используются поля `Filter`, `SortField`, `SortDesc`, `MaxRows`.
- В `Args` используются `Filter`, `SortField`, `SortDesc`, `FirstRow`, `MaxRows` (ScriptsJournal / EventScript ODT).
- В `Filter` поддерживаются равенство полей, операторы `NotEqual`, `Range` (с `_ArrEx([from, to])`), вложенный `OR` через `_ObjEx` (ScriptsJournal, ScriptsAutoControl).
- Пустой результат удобно проверять как `_ToStr(Docs) <> '[]'` и/или `Docs._Count > 0` (ScriptsJournal).

**Пример вызова:**

```pascal
var
  Args, Docs, Doc: Variant;
begin
  // ScriptsJournal: NotEqual + Range + FirstRow/MaxRows
  Args := _ObjEx([
    'Filter', _ObjEx([
      'NUMB_TS', 'A999AB45',
      'CODE', _ObjEx(['NotEqual', 'D307EB...']),
      'DATETIME_CREATE', _ObjEx(['Range', _ArrEx([
        DateTimeToIso8601(IncHour(Now(), -48)),
        DateTimeToIso8601(Now())
      ])]),
      'DELETED', 0
    ]),
    'SortField', 'DATETIME_CREATE',
    'SortDesc', True,
    'FirstRow', 0,
    'MaxRows', 1
  ]);
  Docs := GetRecords(JournalName, Args);
  if (_ToStr(Docs) <> '[]') and (Docs._Count > 0) then
    Doc := _Json(_ToStr(Docs.Value(0)));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/Скрипты/ScriptsJournal`; `Материалы для документации/Скрипты/ScriptsAutoControl`

---

<a id="setrecord"></a>
### `SetRecord`

*** `SetRecord` — Сохранение записи журнала ****

`function SetRecord(Journal: String; Doc: Variant): String`

**Входные параметры:**
- `Journal: String` — имя журнала (EventScript ODT; ScriptsAutoControl)
- `Doc: Variant` — документ записи (JSON-объект); часто содержит CODE (EventScript ODT; ScriptsAutoControl)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Перед отправкой удаляет поле `DBID` из документа.
- Операция передаётся сообщением `Journal.Operation` через `SendMsg`.
- Возвращает код записи; в ScriptsAutoControl результат кладут в `Result_CODE` / `Msg.Result`.
- После сохранения часто вызывают `SetBlob(Journal, Code, Field, Blob)` для фото (ScriptsAutoControl / ScriptsCraneScale).
- Операция в реализации уходит через `Journal.Operation` / `SendMsg` (fsCoreScript).

**Пример вызова:**

```pascal
var
  LNewDoc: Variant;
  LCode: String;
begin
  LNewDoc := _Obj();
  LNewDoc.CODE := Result_DocId;
  LNewDoc.NUMB_TS := Result_NUMB_TS;
  LCode := SetRecord(TrafficJournalName, LNewDoc); // ScriptsAutoControl
  if not IsEmpty(Result_PHOTO1) then
    SetBlob(TrafficJournalName, Result_DocId, 'PHOTO1', Result_PHOTO1);
  Msg.Result := True;
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsAutoControl`; `Материалы для документации/Скрипты/ScriptsCraneScale`

---

<a id="setrecordnt"></a>
### `SetRecordNT`

*** `SetRecordNT` — Сохранение без триггеров ****

`function SetRecordNT(Journal: String; Doc: Variant): String`

**Входные параметры:**
- `Journal: String` — имя журнала (EventScript ODT; ScriptsJournal)
- `Doc: Variant` — документ записи без запуска триггеров (ScriptsJournal)

**Возвращает:**

результат операции записи; изменение выполняется без запуска триггеров (по EventScript_desc.odt)

**Сведения из исходников / ODT:**

- Выполняет изменение записи без запуска триггеров.
- Операция передаётся сообщением `Journal.Operation` через `SendMsg`.
- Без запуска триггеров журнала — для антирекурсии при каскадных правках (ScriptsJournal).
- Операция передаётся сообщением `Journal.Operation` через `SendMsg` (fsCoreScript).

**Пример вызова:**

```pascal
var
  LDocID: String;
begin
  // ScriptsJournal Proc_SetSlaveDoc — без триггеров DocsJournal
  LDocID := SetRecordNT('DocsJournal', LNewDocument);
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getview"></a>
### `GetView`

*** `GetView` — Данные представления ****

`function GetView(Journal, Name: String; Params, Filter: Variant; SortField: String; SortDesc: Boolean; FirstRow, MaxRows: Integer): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (EventScript ODT / RTTI)
- `Name: String` — имя представления (EventScript ODT / RTTI)
- `Params: Variant` — параметры представления (RTTI; уточнение семантики — по конфигурации журнала)
- `Filter: Variant` — фильтр представления (RTTI)
- `SortField: String` — поле сортировки (RTTI; как в GetRecords)
- `SortDesc: Boolean` — сортировка по убыванию (RTTI)
- `FirstRow: Integer` — смещение первой строки (RTTI; ScriptsJournal для GetRecords)
- `MaxRows: Integer` — максимум строк (RTTI)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Получает данные именованного представления журнала.
- В RTTI сигнатура: `Params`, `Filter`, `SortField`, `SortDesc`, `FirstRow`, `MaxRows` (functions.txt).
- В EventScript ODT пример со старой сигнатурой `(Args, Params)` — ориентироваться на RTTI.

**Пример вызова:**

```pascal
begin
  // EventScript ODT (сигнатура в RTTI шире: Params, Filter, SortField, SortDesc, FirstRow, MaxRows)
  DebugLog(_ToStr(GetView('WeighingJournal', 'Test',
    _ArrEx(['CODE', '']), Null, '', False, 0, 100)));
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/functions.txt`

---

<a id="execproc"></a>
### `ExecProc`

*** `ExecProc` — Хранимая процедура журнала ****

`function ExecProc(Journal, Name: String; Args: Variant): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (ScriptsJournal; EventScript ODT)
- `Name: String` — имя процедуры без префикса Proc_ (ScriptsJournal: 'SetSlaveDoc')
- `Args: Variant` — аргументы; в ScriptsJournal — объект `_ObjEx([...])`

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Выполняет хранимую процедуру журнала.
- Вызывает хранимую процедуру журнала; имя без префикса файла `Proc_` (файл `Proc_SetSlaveDoc` → `'SetSlaveDoc'`).
- В ScriptsJournal аргументы передают как `_ObjEx([...])`, не позиционный `_ArrEx` (пример ODT устарел относительно практики).
- Синхронный вызов из триггеров `OnBefore*` / процедур; для фона после update — `AsyncExecProc`.

**Пример вызова:**

```pascal
var
  LDocID: String;
begin
  // ScriptsJournal: имя без Proc_; аргументы — объект
  LDocID := ExecProc(JournalName, 'SetSlaveDoc',
    _ObjEx(['CODE', Args.CODE, 'NAME', 'DOC1', 'CAPTION', 'Документ']));
  DebugLog(LDocID);
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getblobs"></a>
### `GetBlobs`

*** `GetBlobs` — Список вложений записи ****

`function GetBlobs(Journal, Code: String): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (RTTI / Scripts*)
- `Code: String` — CODE записи (RTTI / Scripts*)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает вложения (blob) записи журнала.
- Возвращает набор вложений записи журнала по CODE.

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(GetBlobs(TrafficJournalName, Result_DocId))); // все вложения записи
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getblob"></a>
### `GetBlob`

*** `GetBlob` — Чтение вложения ****

`function GetBlob(Journal, Code, Name: String): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (ScriptsAutoControl / RTTI)
- `Code: String` — CODE записи (ScriptsAutoControl / RTTI)
- `Name: String` — имя поля вложения, например PHOTO1 (ScriptsAutoControl)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Читает именованное вложение записи.
- Читает именованное вложение записи по журналу, CODE и имени поля (зеркало `SetBlob` в ScriptsAutoControl).

**Пример вызова:**

```pascal
begin
  // зеркало SetBlob из ScriptsAutoControl
  Result_PHOTO1 := GetBlob(TrafficJournalName, Result_DocId, 'PHOTO1');
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsAutoControl`

---

<a id="setblob"></a>
### `SetBlob`

*** `SetBlob` — Запись вложения ****

`procedure SetBlob(Journal, Code, Name: String; Blob: Variant)`

**Входные параметры:**
- `Journal: String` — имя журнала (ScriptsAutoControl)
- `Code: String` — CODE записи (ScriptsAutoControl)
- `Name: String` — имя поля вложения, например PHOTO1 (ScriptsAutoControl)
- `Blob: Variant` — данные вложения; писать после проверки not IsEmpty (ScriptsAutoControl)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Сохраняет именованное вложение записи.
- Пишет именованное вложение записи после `SetRecord`; перед вызовом проверяют `not IsEmpty(Blob)` (ScriptsAutoControl).
- Аргументы: журнал, CODE записи, имя поля (например `PHOTO1`), данные blob.

**Пример вызова:**

```pascal
begin
  // ScriptsAutoControl после SetRecord
  if not IsEmpty(Result_PHOTO1) then
    SetBlob(TrafficJournalName, Result_DocId, 'PHOTO1', Result_PHOTO1);
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsAutoControl`; `Материалы для документации/Скрипты/ScriptsCraneScale`

---

<a id="setlink"></a>
### `SetLink`

*** `SetLink` — Создание связи ****

`function SetLink(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String): String`

**Входные параметры:**
- `Journal: String` — журнал исходной записи (ScriptsJournal)
- `Code: String` — CODE исходной записи (ScriptsJournal)
- `Name: String` — имя/ключ связи, например DOC1 (ScriptsJournal)
- `Caption: String` — отображаемое имя связи, например «Документ» (ScriptsJournal)
- `LinkJournal: String` — журнал связанной записи (ScriptsJournal)
- `LinkType: String` — тип связи: SLAVE / MASTER / LINK (ScriptsJournal)
- `Link: String` — CODE связанной записи (ScriptsJournal)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Создаёт связь записи с другой записью/журналом.
- Создаёт связь записи с записью другого (или того же) журнала **с** запуском триггеров.
- В ScriptsJournal чаще `SetLinkNT`; аргументы те же: `LinkType` = `SLAVE` / `MASTER` / `LINK`.

**Пример вызова:**

```pascal
begin
  // как SetLinkNT (ScriptsJournal), но с запуском триггеров
  SetLink(JournalName, NewDoc.CODE, 'DOC1', 'Документ',
    'DocsJournal', 'SLAVE', NewDoc.Doc_Link);
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="setlinknt"></a>
### `SetLinkNT`

*** `SetLinkNT` — Создание связи без триггеров ****

`function SetLinkNT(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String): String`

**Входные параметры:**
- `Journal: String` — журнал исходной записи (ScriptsJournal)
- `Code: String` — CODE исходной записи (ScriptsJournal)
- `Name: String` — имя/ключ связи (ScriptsJournal)
- `Caption: String` — подпись связи (ScriptsJournal)
- `LinkJournal: String` — журнал связанной записи (ScriptsJournal)
- `LinkType: String` — SLAVE / MASTER / LINK (ScriptsJournal)
- `Link: String` — CODE связанной записи (ScriptsJournal)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Создаёт связь без запуска триггеров.
- Как `SetLink`, но без запуска триггеров — типичный вызов из `OnAfterUpdate` (ScriptsJournal).
- Пример: `SetLinkNT(JournalName, CODE, 'DOC1', 'Документ', 'DocsJournal', 'SLAVE', Doc_Link)`.

**Пример вызова:**

```pascal
begin
  // ScriptsJournal: отвес → DocsJournal (SLAVE) и обратно (MASTER)
  SetLinkNT(JournalName, NewDoc.CODE, 'DOC1', 'Документ',
    'DocsJournal', 'SLAVE', NewDoc.Doc_Link);
  SetLinkNT('DocsJournal', NewDoc.Doc_Link,
    'Weighing' + NewDoc.TYPMASSA, NewDoc.TYPMASSACAPTION,
    JournalName, 'MASTER', NewDoc.CODE);
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getlink"></a>
### `GetLink`

*** `GetLink` — Чтение связи ****

`function GetLink(Journal, Code, Name: String): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (RTTI)
- `Code: String` — CODE записи (RTTI)
- `Name: String` — имя связи (RTTI)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает данные связи по имени.
- Возвращает данные связи по имени (`Name`, как в `SetLink*`).

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(GetLink(JournalName, NewDoc.CODE, 'DOC1'))); // связь по имени
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getlink-link"></a>
### `GetLink_Link`

*** `GetLink_Link` — Идентификатор связанной записи ****

`function GetLink_Link(Journal, Code, Name: String): String`

**Входные параметры:**
- `Journal: String` — имя журнала (RTTI)
- `Code: String` — CODE записи (RTTI)
- `Name: String` — имя связи (RTTI)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает строковый идентификатор связи.
- Возвращает строковый CODE связанной записи по имени связи.

**Пример вызова:**

```pascal
begin
  DebugLog(GetLink_Link(JournalName, NewDoc.CODE, 'DOC1')); // CODE связанной записи
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getlinks"></a>
### `GetLinks`

*** `GetLinks` — Список связей ****

`function GetLinks(Journal, Code: String; MaxRows: Integer): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (RTTI)
- `Code: String` — CODE записи (RTTI)
- `MaxRows: Integer` — ограничение числа связей (RTTI)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Возвращает связи записи.
- Возвращает список связей записи (`MaxRows` ограничивает выборку).

**Пример вызова:**

```pascal
begin
  DebugLog(_ToStr(GetLinks(JournalName, NewDoc.CODE, 100))); // список связей
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="deletelinks"></a>
### `DeleteLinks`

*** `DeleteLinks` — Удаление связей ****

`procedure DeleteLinks(Journal, Code, Link: String)`

**Входные параметры:**
- `Journal: String` — имя журнала (RTTI)
- `Code: String` — CODE записи или пусто для обратных (ScriptsJournal для NT)
- `Link: String` — CODE связанной записи или пусто для всех исходящих (ScriptsJournal для NT)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Удаляет связи записи.
- Удаляет связи записи **с** триггерами; семантика пустых Code/Link — как у `DeleteLinksNT` (ScriptsJournal).

**Пример вызова:**

```pascal
begin
  // как DeleteLinksNT (ScriptsJournal), но с триггерами
  DeleteLinks(JournalName, NewDoc.CODE, '');
  DeleteLinks(JournalName, '', NewDoc.CODE);
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="undeletelinks"></a>
### `UnDeleteLinks`

*** `UnDeleteLinks` — Восстановление связей ****

`procedure UnDeleteLinks(Journal, Code, Link: String)`

**Входные параметры:**
- `Journal: String` — имя журнала (RTTI)
- `Code: String` — CODE записи (RTTI)
- `Link: String` — CODE связанной записи (RTTI)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Восстанавливает удалённые связи.
- Восстанавливает удалённые связи записи (с триггерами).

**Пример вызова:**

```pascal
begin
  UnDeleteLinks(JournalName, NewDoc.CODE, ''); // восстановить связи записи
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="deletelinksnt"></a>
### `DeleteLinksNT`

*** `DeleteLinksNT` — Удаление связей без триггеров ****

`procedure DeleteLinksNT(Journal, Code, Link: String)`

**Входные параметры:**
- `Journal: String` — имя журнала (ScriptsJournal)
- `Code: String` — CODE записи; пустая строка — режим «все входящие на Link» (ScriptsJournal)
- `Link: String` — CODE связанной записи; пустая строка — все исходящие с Code (ScriptsJournal)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Удаляет связи без запуска триггеров.
- Удаление связей без триггеров (ScriptsJournal).
- `DeleteLinksNT(J, CODE, '')` — все исходящие с записи; `DeleteLinksNT(J, '', CODE)` — все входящие на запись; оба аргумента заданы — одна пара.

**Пример вызова:**

```pascal
begin
  // ScriptsJournal при пометке DELETED
  DeleteLinksNT(JournalName, NewDoc.CODE, ''); // все исходящие
  DeleteLinksNT(JournalName, '', NewDoc.CODE); // все входящие
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="undeletelinksnt"></a>
### `UnDeleteLinksNT`

*** `UnDeleteLinksNT` — Восстановление связей без триггеров ****

`procedure UnDeleteLinksNT(Journal, Code, Link: String)`

**Входные параметры:**
- `Journal: String` — имя журнала (RTTI)
- `Code: String` — CODE записи (RTTI)
- `Link: String` — CODE связанной записи (RTTI)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Восстанавливает связи без запуска триггеров.
- Восстановление связей без запуска триггеров.

**Пример вызова:**

```pascal
begin
  UnDeleteLinksNT(JournalName, NewDoc.CODE, ''); // без триггеров
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="asyncsetrecord"></a>
### `AsyncSetRecord`

*** `AsyncSetRecord` — Асинхронное сохранение записи ****

`procedure AsyncSetRecord(Journal: String; Doc: Variant)`

**Входные параметры:**
- `Journal: String` — имя журнала (ScriptsJournal)
- `Doc: Variant` — документ для асинхронного сохранения с триггерами (ScriptsJournal)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Ставит сохранение записи в очередь сообщений.
- Асинхронное сохранение **с** триггерами — чтобы уведомить связанные плагины (ScriptsJournal `SetSlaveDoc`).

**Пример вызова:**

```pascal
begin
  // ScriptsJournal SetSlaveDoc — с триггерами (уведомить AutoScale)
  AsyncSetRecord(JournalName, _ObjEx([
    'CODE', Args.CODE, 'Doc_Link', LDocID, 'Doc_Numb', LSlaveDOCUMENT_NUMBER
  ]));
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="asyncsetrecordnt"></a>
### `AsyncSetRecordNT`

*** `AsyncSetRecordNT` — Асинхронное сохранение без триггеров ****

`procedure AsyncSetRecordNT(Journal: String; Doc: Variant)`

**Входные параметры:**
- `Journal: String` — имя журнала (ScriptsJournal)
- `Doc: Variant` — документ для асинхронного сохранения без триггеров (ScriptsJournal)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Асинхронное сохранение без запуска триггеров.
- Асинхронное сохранение без триггеров — массовые правки пары отвесов без рекурсии (ScriptsJournal).

**Пример вызова:**

```pascal
begin
  AsyncSetRecordNT(JournalName, _ObjEx([
    'CODE', LMasterLinkDoc.CODE, 'Doc_Link', LDocID, 'Doc_Numb', LSlaveDOCUMENT_NUMBER
  ]));
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="asyncexecproc"></a>
### `AsyncExecProc`

*** `AsyncExecProc` — Асинхронный вызов процедуры ****

`procedure AsyncExecProc(Journal, Name: String; Args: Variant)`

**Входные параметры:**
- `Journal: String` — имя журнала (ScriptsJournal)
- `Name: String` — имя процедуры без префикса Proc_ (ScriptsJournal)
- `Args: Variant` — аргументы процедуры (обычно `_ObjEx` / документ, ScriptsJournal)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Ставит выполнение хранимой процедуры в очередь.
- Асинхронный вызов хранимой процедуры (не блокирует `OnAfterUpdate`, ScriptsJournal).

**Пример вызова:**

```pascal
begin
  // ScriptsJournal OnAfterUpdate — не блокировать сохранение
  if IsPackedGuid(NewDoc.RECORD_LINK) then
    AsyncExecProc(JournalName, 'UpdateWeighing2', NewDoc);
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="asyncsetlink"></a>
### `AsyncSetLink`

*** `AsyncSetLink` — Асинхронное создание связи ****

`procedure AsyncSetLink(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String)`

**Входные параметры:**
- `Journal: String` — журнал исходной записи (RTTI / ScriptsJournal)
- `Code: String` — CODE исходной записи
- `Name: String` — имя связи
- `Caption: String` — подпись связи
- `LinkJournal: String` — журнал связанной записи
- `LinkType: String` — SLAVE / MASTER / LINK (ScriptsJournal)
- `Link: String` — CODE связанной записи

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Ставит создание связи в очередь сообщений.
- Асинхронное создание связи с триггерами; аргументы как у `AsyncSetLinkNT` (ScriptsJournal).

**Пример вызова:**

```pascal
begin
  // как AsyncSetLinkNT (ScriptsJournal), но с триггерами
  AsyncSetLink(JournalName, Args.CODE, Args.NAME, Args.CAPTION,
    'DocsJournal', 'SLAVE', LDocID);
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="asyncsetlinknt"></a>
### `AsyncSetLinkNT`

*** `AsyncSetLinkNT` — Асинхронная связь без триггеров ****

`procedure AsyncSetLinkNT(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String)`

**Входные параметры:**
- `Journal: String` — журнал исходной записи (ScriptsJournal)
- `Code: String` — CODE исходной записи (ScriptsJournal)
- `Name: String` — имя связи (ScriptsJournal)
- `Caption: String` — подпись связи (ScriptsJournal)
- `LinkJournal: String` — журнал связанной записи (ScriptsJournal)
- `LinkType: String` — SLAVE / MASTER / LINK (ScriptsJournal)
- `Link: String` — CODE связанной записи (ScriptsJournal)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Асинхронное создание связи без триггеров.
- Асинхронное создание связи без триггеров (ScriptsJournal `Proc_SetSlaveDoc`).

**Пример вызова:**

```pascal
begin
  AsyncSetLinkNT(JournalName, Args.CODE, Args.NAME, Args.CAPTION,
    'DocsJournal', 'SLAVE', LDocID);
end
```

_Источник сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---
