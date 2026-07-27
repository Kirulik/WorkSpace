# Сервер. Универсальные журналы/справочники

Универсальные журналы — постоянное хранилище бизнес-данных UniServer (взвешивания, справочники, связанные документы). Скрипт обращается к журналу по имени: `GetRecord` / `GetRecords` читают, `SetRecord` сохраняет документ-`Variant`. Варианты `*NT` выполняют изменение без запуска триггеров (антирекурсия в ScriptsJournal); `Async*` ставят операцию в очередь без ожидания. `GetQuery` — SQL к SQLite-таблице `Journal`; `GetQueryEx` — к внешней БД. Связи (`SetLink*` / `DeleteLinks*`, типы SLAVE/MASTER/LINK) и вложения (`SetBlob`) дополняют документ. Триггеры `On*` и процедуры `Proc_*` (вызов через `ExecProc`) задают бизнес-логику журнала.

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

# `GetQuery` — SQL-запрос к журналу

## Синтаксис

```pascal
function GetQuery(Journal, SQL: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (по EventScript_desc.odt) |
| `SQL` | `String` | SQL-запрос; синтаксис SQLite; имя таблицы всегда Journal (по EventScript_desc.odt) |

## Описание

Возвращает результат SQL-запроса к SQLite-таблице журнала (имя таблицы всегда `Journal`).

> **Особенности:** Использует SQLite; имя таблицы журнала всегда `Journal`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(GetQuery('WeighingJournal', 'SELECT MAX(RowID) FROM Journal'))); // SQL к журналу
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getqueryex"></a>

# `GetQueryEx` — SQL-запрос к внешней БД

## Синтаксис

```pascal
function GetQueryEx(Journal, SQL: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (по EventScript_desc.odt) |
| `SQL` | `String` | SQL-запрос к внешней БД; синтаксис внешней БД (по EventScript_desc.odt) |

## Описание

Возвращает результат SQL-запроса к внешней БД журнала (синтаксис — синтаксис этой БД).

> **Особенности:** Выполняет запрос к внешней базе данных.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(GetQueryEx('WeighingJournal', 'SELECT MAX(ID) FROM Weighing'))); // SQL к внешней БД
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getrecord"></a>

# `GetRecord` — Чтение записи журнала

## Синтаксис

```pascal
function GetRecord(Journal, Code: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (EventScript ODT; ScriptsJournal) |
| `Code` | `String` | идентификатор записи CODE (EventScript ODT; ScriptsJournal) |

## Описание

Возвращает документ записи журнала по идентификатору `Code`.

> **Особенности:** Получает запись по идентификатору `Code`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  Doc: Variant;
begin
  Doc := GetRecord('WeighingJournal', 'D307EB...205027'); // запись по CODE
  DebugLog(Doc.NUMB_TS);                                  // поле записи
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getrecords"></a>

# `GetRecords` — Поиск записей журнала

## Синтаксис

```pascal
function GetRecords(Journal: String; Args: Variant): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (EventScript ODT) |
| `Args` | `Variant` | объект: Filter (поля и операторы NotEqual/Range/OR), SortField, SortDesc, FirstRow, MaxRows (ScriptsJournal / ScriptsAutoControl) |

## Описание

Возвращает набор записей журнала по параметрам поиска (`Filter`, сортировка, лимит строк). Основной способ выборки документов без ручного SQL.

> **Особенности:** В `Args` используются поля `Filter`, `SortField`, `SortDesc`, `MaxRows`. В `Args` используются `Filter`, `SortField`, `SortDesc`, `FirstRow`, `MaxRows` (ScriptsJournal / EventScript ODT). В `Filter` поддерживаются равенство полей, операторы `NotEqual`, `Range` (с `_ArrEx([from, to])`), вложенный `OR` через `_ObjEx` (ScriptsJournal, ScriptsAutoControl). Пустой результат удобно проверять как `_ToStr(Docs) <> '[]'` и/или `Docs._Count > 0` (ScriptsJournal).

<details>
<summary><strong>Пример реализации</strong></summary>

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

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/Скрипты/ScriptsJournal`; `Материалы для документации/Скрипты/ScriptsAutoControl`

---

<a id="setrecord"></a>

# `SetRecord` — Сохранение записи журнала

## Синтаксис

```pascal
function SetRecord(Journal: String; Doc: Variant): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (EventScript ODT; ScriptsAutoControl) |
| `Doc` | `Variant` | документ записи (JSON-объект); часто содержит CODE (EventScript ODT; ScriptsAutoControl) |

## Описание

Возвращает код сохранённой записи. Записывает документ в журнал и запускает связанные триггеры (через `Journal.Operation`).

> **Особенности:** Перед отправкой удаляет поле `DBID` из документа. Операция передаётся сообщением `Journal.Operation` через `SendMsg`. Возвращает код записи; в ScriptsAutoControl результат кладут в `Result_CODE` / `Msg.Result`. После сохранения часто вызывают `SetBlob(Journal, Code, Field, Blob)` для фото (ScriptsAutoControl / ScriptsCraneScale). Операция в реализации уходит через `Journal.Operation` / `SendMsg` (fsCoreScript).

<details>
<summary><strong>Пример реализации</strong></summary>

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

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsAutoControl`; `Материалы для документации/Скрипты/ScriptsCraneScale`

---

<a id="setrecordnt"></a>

# `SetRecordNT` — Сохранение без триггеров

## Синтаксис

```pascal
function SetRecordNT(Journal: String; Doc: Variant): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (EventScript ODT; ScriptsJournal) |
| `Doc` | `Variant` | документ записи без запуска триггеров (ScriptsJournal) |

## Описание

Возвращает код сохранённой записи. Сохраняет документ без запуска триггеров — для антирекурсии при каскадных правках.

> **Особенности:** Выполняет изменение записи без запуска триггеров. Операция передаётся сообщением `Journal.Operation` через `SendMsg`. Без запуска триггеров журнала — для антирекурсии при каскадных правках (ScriptsJournal). Операция передаётся сообщением `Journal.Operation` через `SendMsg` (fsCoreScript).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  LDocID: String;
begin
  // ScriptsJournal Proc_SetSlaveDoc — без триггеров DocsJournal
  LDocID := SetRecordNT('DocsJournal', LNewDocument);
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getview"></a>

# `GetView` — Данные представления

## Синтаксис

```pascal
function GetView(Journal, Name: String; Params, Filter: Variant; SortField: String; SortDesc: Boolean; FirstRow, MaxRows: Integer): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (EventScript ODT / RTTI) |
| `Name` | `String` | имя представления (EventScript ODT / RTTI) |
| `Params` | `Variant` | параметры представления (RTTI; уточнение семантики — по конфигурации журнала) |
| `Filter` | `Variant` | фильтр представления (RTTI) |
| `SortField` | `String` | поле сортировки (RTTI; как в GetRecords) |
| `SortDesc` | `Boolean` | сортировка по убыванию (RTTI) |
| `FirstRow` | `Integer` | смещение первой строки (RTTI; ScriptsJournal для GetRecords) |
| `MaxRows` | `Integer` | максимум строк (RTTI) |

## Описание

Возвращает данные именованного представления журнала с учётом параметров, фильтра и сортировки.

> **Особенности:** Получает данные именованного представления журнала. В RTTI сигнатура: `Params`, `Filter`, `SortField`, `SortDesc`, `FirstRow`, `MaxRows` (functions.txt). В EventScript ODT пример со старой сигнатурой `(Args, Params)` — ориентироваться на RTTI.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // EventScript ODT (сигнатура в RTTI шире: Params, Filter, SortField, SortDesc, FirstRow, MaxRows)
  DebugLog(_ToStr(GetView('WeighingJournal', 'Test',
    _ArrEx(['CODE', '']), Null, '', False, 0, 100)));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/functions.txt`

---

<a id="execproc"></a>

# `ExecProc` — Хранимая процедура журнала

## Синтаксис

```pascal
function ExecProc(Journal, Name: String; Args: Variant): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (ScriptsJournal; EventScript ODT) |
| `Name` | `String` | имя процедуры без префикса Proc_ (ScriptsJournal: 'SetSlaveDoc') |
| `Args` | `Variant` | аргументы; в ScriptsJournal — объект `_ObjEx([...])` |

## Описание

Возвращает результат хранимой процедуры журнала. Имя процедуры указывают без префикса файла `Proc_`.

> **Особенности:** Выполняет хранимую процедуру журнала. Вызывает хранимую процедуру журнала; имя без префикса файла `Proc_` (файл `Proc_SetSlaveDoc` → `'SetSlaveDoc'`). В ScriptsJournal аргументы передают как `_ObjEx([...])`, не позиционный `_ArrEx` (пример ODT устарел относительно практики). Синхронный вызов из триггеров `OnBefore*` / процедур; для фона после update — `AsyncExecProc`.

<details>
<summary><strong>Пример реализации</strong></summary>

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

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getblobs"></a>

# `GetBlobs` — Список вложений записи

## Синтаксис

```pascal
function GetBlobs(Journal, Code: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (RTTI / Scripts*) |
| `Code` | `String` | CODE записи (RTTI / Scripts*) |

## Описание

Возвращает набор вложений (blob) записи журнала по её `Code`.

> **Особенности:** Возвращает вложения (blob) записи журнала. Возвращает набор вложений записи журнала по CODE.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(GetBlobs(TrafficJournalName, Result_DocId))); // все вложения записи
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getblob"></a>

# `GetBlob` — Чтение вложения

## Синтаксис

```pascal
function GetBlob(Journal, Code, Name: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (ScriptsAutoControl / RTTI) |
| `Code` | `String` | CODE записи (ScriptsAutoControl / RTTI) |
| `Name` | `String` | имя поля вложения, например PHOTO1 (ScriptsAutoControl) |

## Описание

Возвращает содержимое именованного вложения записи (например фото по полю `PHOTO1`).

> **Особенности:** Читает именованное вложение записи. Читает именованное вложение записи по журналу, CODE и имени поля (зеркало `SetBlob` в ScriptsAutoControl).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // зеркало SetBlob из ScriptsAutoControl
  Result_PHOTO1 := GetBlob(TrafficJournalName, Result_DocId, 'PHOTO1');
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsAutoControl`

---

<a id="setblob"></a>

# `SetBlob` — Запись вложения

## Синтаксис

```pascal
procedure SetBlob(Journal, Code, Name: String; Blob: Variant)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (ScriptsAutoControl) |
| `Code` | `String` | CODE записи (ScriptsAutoControl) |
| `Name` | `String` | имя поля вложения, например PHOTO1 (ScriptsAutoControl) |
| `Blob` | `Variant` | данные вложения; писать после проверки not IsEmpty (ScriptsAutoControl) |

## Описание

Сохраняет именованное вложение записи журнала (обычно после `SetRecord`).

> **Особенности:** Сохраняет именованное вложение записи. Пишет именованное вложение записи после `SetRecord`; перед вызовом проверяют `not IsEmpty(Blob)` (ScriptsAutoControl). Аргументы: журнал, CODE записи, имя поля (например `PHOTO1`), данные blob.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // ScriptsAutoControl после SetRecord
  if not IsEmpty(Result_PHOTO1) then
    SetBlob(TrafficJournalName, Result_DocId, 'PHOTO1', Result_PHOTO1);
end
```

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsAutoControl`; `Материалы для документации/Скрипты/ScriptsCraneScale`

---

<a id="setlink"></a>

# `SetLink` — Создание связи

## Синтаксис

```pascal
function SetLink(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | журнал исходной записи (ScriptsJournal) |
| `Code` | `String` | CODE исходной записи (ScriptsJournal) |
| `Name` | `String` | имя/ключ связи, например DOC1 (ScriptsJournal) |
| `Caption` | `String` | отображаемое имя связи, например «Документ» (ScriptsJournal) |
| `LinkJournal` | `String` | журнал связанной записи (ScriptsJournal) |
| `LinkType` | `String` | тип связи: SLAVE / MASTER / LINK (ScriptsJournal) |
| `Link` | `String` | CODE связанной записи (ScriptsJournal) |

## Описание

Возвращает результат создания связи между записями журналов (типы вроде `SLAVE` / `MASTER` / `LINK`) с запуском триггеров.

> **Особенности:** Создаёт связь записи с другой записью/журналом. Создаёт связь записи с записью другого (или того же) журнала **с** запуском триггеров. В ScriptsJournal чаще `SetLinkNT`; аргументы те же: `LinkType` = `SLAVE` / `MASTER` / `LINK`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // как SetLinkNT (ScriptsJournal), но с запуском триггеров
  SetLink(JournalName, NewDoc.CODE, 'DOC1', 'Документ',
    'DocsJournal', 'SLAVE', NewDoc.Doc_Link);
end
```

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="setlinknt"></a>

# `SetLinkNT` — Создание связи без триггеров

## Синтаксис

```pascal
function SetLinkNT(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | журнал исходной записи (ScriptsJournal) |
| `Code` | `String` | CODE исходной записи (ScriptsJournal) |
| `Name` | `String` | имя/ключ связи (ScriptsJournal) |
| `Caption` | `String` | подпись связи (ScriptsJournal) |
| `LinkJournal` | `String` | журнал связанной записи (ScriptsJournal) |
| `LinkType` | `String` | SLAVE / MASTER / LINK (ScriptsJournal) |
| `Link` | `String` | CODE связанной записи (ScriptsJournal) |

## Описание

Возвращает результат создания связи без запуска триггеров. Типичный вызов из `OnAfterUpdate` при каскадной разметке связей.

> **Особенности:** Создаёт связь без запуска триггеров. Как `SetLink`, но без запуска триггеров — типичный вызов из `OnAfterUpdate` (ScriptsJournal). Пример: `SetLinkNT(JournalName, CODE, 'DOC1', 'Документ', 'DocsJournal', 'SLAVE', Doc_Link)`.

<details>
<summary><strong>Пример реализации</strong></summary>

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

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getlink"></a>

# `GetLink` — Чтение связи

## Синтаксис

```pascal
function GetLink(Journal, Code, Name: String): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (RTTI) |
| `Code` | `String` | CODE записи (RTTI) |
| `Name` | `String` | имя связи (RTTI) |

## Описание

Возвращает данные связи записи по имени связи.

> **Особенности:** Возвращает данные связи по имени. Возвращает данные связи по имени (`Name`, как в `SetLink*`).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(GetLink(JournalName, NewDoc.CODE, 'DOC1'))); // связь по имени
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getlink-link"></a>

# `GetLink_Link` — Идентификатор связанной записи

## Синтаксис

```pascal
function GetLink_Link(Journal, Code, Name: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (RTTI) |
| `Code` | `String` | CODE записи (RTTI) |
| `Name` | `String` | имя связи (RTTI) |

## Описание

Возвращает строковый `CODE` связанной записи по имени связи.

> **Особенности:** Возвращает строковый идентификатор связи. Возвращает строковый CODE связанной записи по имени связи.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(GetLink_Link(JournalName, NewDoc.CODE, 'DOC1')); // CODE связанной записи
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`; `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="getlinks"></a>

# `GetLinks` — Список связей

## Синтаксис

```pascal
function GetLinks(Journal, Code: String; MaxRows: Integer): Variant
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (RTTI) |
| `Code` | `String` | CODE записи (RTTI) |
| `MaxRows` | `Integer` | ограничение числа связей (RTTI) |

## Описание

Возвращает список связей записи (объём выборки ограничивает `MaxRows`).

> **Особенности:** Возвращает связи записи. Возвращает список связей записи (`MaxRows` ограничивает выборку).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(_ToStr(GetLinks(JournalName, NewDoc.CODE, 100))); // список связей
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="deletelinks"></a>

# `DeleteLinks` — Удаление связей

## Синтаксис

```pascal
procedure DeleteLinks(Journal, Code, Link: String)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (RTTI) |
| `Code` | `String` | CODE записи или пусто для обратных (ScriptsJournal для NT) |
| `Link` | `String` | CODE связанной записи или пусто для всех исходящих (ScriptsJournal для NT) |

## Описание

Удаляет связи записи журнала (с запуском триггеров).

> **Особенности:** Удаляет связи записи. Удаляет связи записи **с** триггерами; семантика пустых Code/Link — как у `DeleteLinksNT` (ScriptsJournal).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // как DeleteLinksNT (ScriptsJournal), но с триггерами
  DeleteLinks(JournalName, NewDoc.CODE, '');
  DeleteLinks(JournalName, '', NewDoc.CODE);
end
```

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="undeletelinks"></a>

# `UnDeleteLinks` — Восстановление связей

## Синтаксис

```pascal
procedure UnDeleteLinks(Journal, Code, Link: String)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (RTTI) |
| `Code` | `String` | CODE записи (RTTI) |
| `Link` | `String` | CODE связанной записи (RTTI) |

## Описание

Восстанавливает ранее удалённые связи записи (с запуском триггеров).

> **Особенности:** Восстанавливает удалённые связи. Восстанавливает удалённые связи записи (с триггерами).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  UnDeleteLinks(JournalName, NewDoc.CODE, ''); // восстановить связи записи
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="deletelinksnt"></a>

# `DeleteLinksNT` — Удаление связей без триггеров

## Синтаксис

```pascal
procedure DeleteLinksNT(Journal, Code, Link: String)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (ScriptsJournal) |
| `Code` | `String` | CODE записи; пустая строка — режим «все входящие на Link» (ScriptsJournal) |
| `Link` | `String` | CODE связанной записи; пустая строка — все исходящие с Code (ScriptsJournal) |

## Описание

Удаляет связи записи без запуска триггеров. Пустой `Code` или `Link` задаёт режим «все исходящие» / «все входящие».

> **Особенности:** Удаляет связи без запуска триггеров. Удаление связей без триггеров (ScriptsJournal). `DeleteLinksNT(J, CODE, '')` — все исходящие с записи; `DeleteLinksNT(J, '', CODE)` — все входящие на запись; оба аргумента заданы — одна пара.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // ScriptsJournal при пометке DELETED
  DeleteLinksNT(JournalName, NewDoc.CODE, ''); // все исходящие
  DeleteLinksNT(JournalName, '', NewDoc.CODE); // все входящие
end
```

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="undeletelinksnt"></a>

# `UnDeleteLinksNT` — Восстановление связей без триггеров

## Синтаксис

```pascal
procedure UnDeleteLinksNT(Journal, Code, Link: String)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (RTTI) |
| `Code` | `String` | CODE записи (RTTI) |
| `Link` | `String` | CODE связанной записи (RTTI) |

## Описание

Восстанавливает ранее удалённые связи записи без запуска триггеров.

> **Особенности:** Восстанавливает связи без запуска триггеров. Восстановление связей без запуска триггеров.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  UnDeleteLinksNT(JournalName, NewDoc.CODE, ''); // без триггеров
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="asyncsetrecord"></a>

# `AsyncSetRecord` — Асинхронное сохранение записи

## Синтаксис

```pascal
procedure AsyncSetRecord(Journal: String; Doc: Variant)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (ScriptsJournal) |
| `Doc` | `Variant` | документ для асинхронного сохранения с триггерами (ScriptsJournal) |

## Описание

Ставит сохранение записи журнала в очередь сообщений асинхронно (с триггерами; скрипт не ждёт завершения).

> **Особенности:** Ставит сохранение записи в очередь сообщений. Асинхронное сохранение **с** триггерами — чтобы уведомить связанные плагины (ScriptsJournal `SetSlaveDoc`).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // ScriptsJournal SetSlaveDoc — с триггерами (уведомить AutoScale)
  AsyncSetRecord(JournalName, _ObjEx([
    'CODE', Args.CODE, 'Doc_Link', LDocID, 'Doc_Numb', LSlaveDOCUMENT_NUMBER
  ]));
end
```

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="asyncsetrecordnt"></a>

# `AsyncSetRecordNT` — Асинхронное сохранение без триггеров

## Синтаксис

```pascal
procedure AsyncSetRecordNT(Journal: String; Doc: Variant)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (ScriptsJournal) |
| `Doc` | `Variant` | документ для асинхронного сохранения без триггеров (ScriptsJournal) |

## Описание

Ставит сохранение записи без триггеров в очередь сообщений асинхронно.

> **Особенности:** Асинхронное сохранение без запуска триггеров. Асинхронное сохранение без триггеров — массовые правки пары отвесов без рекурсии (ScriptsJournal).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  AsyncSetRecordNT(JournalName, _ObjEx([
    'CODE', LMasterLinkDoc.CODE, 'Doc_Link', LDocID, 'Doc_Numb', LSlaveDOCUMENT_NUMBER
  ]));
end
```

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="asyncexecproc"></a>

# `AsyncExecProc` — Асинхронный вызов процедуры

## Синтаксис

```pascal
procedure AsyncExecProc(Journal, Name: String; Args: Variant)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | имя журнала (ScriptsJournal) |
| `Name` | `String` | имя процедуры без префикса Proc_ (ScriptsJournal) |
| `Args` | `Variant` | аргументы процедуры (обычно `_ObjEx` / документ, ScriptsJournal) |

## Описание

Ставит вызов хранимой процедуры журнала в очередь асинхронно (не блокирует, например, `OnAfterUpdate`).

> **Особенности:** Ставит выполнение хранимой процедуры в очередь. Асинхронный вызов хранимой процедуры (не блокирует `OnAfterUpdate`, ScriptsJournal).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // ScriptsJournal OnAfterUpdate — не блокировать сохранение
  if IsPackedGuid(NewDoc.RECORD_LINK) then
    AsyncExecProc(JournalName, 'UpdateWeighing2', NewDoc);
end
```

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---

<a id="asyncsetlink"></a>

# `AsyncSetLink` — Асинхронное создание связи

## Синтаксис

```pascal
procedure AsyncSetLink(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | журнал исходной записи (RTTI / ScriptsJournal) |
| `Code` | `String` | CODE исходной записи |
| `Name` | `String` | имя связи |
| `Caption` | `String` | подпись связи |
| `LinkJournal` | `String` | журнал связанной записи |
| `LinkType` | `String` | SLAVE / MASTER / LINK (ScriptsJournal) |
| `Link` | `String` | CODE связанной записи |

## Описание

Ставит создание связи записей в очередь сообщений асинхронно (с триггерами).

> **Особенности:** Ставит создание связи в очередь сообщений. Асинхронное создание связи с триггерами; аргументы как у `AsyncSetLinkNT` (ScriptsJournal).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // как AsyncSetLinkNT (ScriptsJournal), но с триггерами
  AsyncSetLink(JournalName, Args.CODE, Args.NAME, Args.CAPTION,
    'DocsJournal', 'SLAVE', LDocID);
end
```

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="asyncsetlinknt"></a>

# `AsyncSetLinkNT` — Асинхронная связь без триггеров

## Синтаксис

```pascal
procedure AsyncSetLinkNT(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Journal` | `String` | журнал исходной записи (ScriptsJournal) |
| `Code` | `String` | CODE исходной записи (ScriptsJournal) |
| `Name` | `String` | имя связи (ScriptsJournal) |
| `Caption` | `String` | подпись связи (ScriptsJournal) |
| `LinkJournal` | `String` | журнал связанной записи (ScriptsJournal) |
| `LinkType` | `String` | SLAVE / MASTER / LINK (ScriptsJournal) |
| `Link` | `String` | CODE связанной записи (ScriptsJournal) |

## Описание

Ставит создание связи без триггеров в очередь сообщений асинхронно.

> **Особенности:** Асинхронное создание связи без триггеров. Асинхронное создание связи без триггеров (ScriptsJournal `Proc_SetSlaveDoc`).

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  AsyncSetLinkNT(JournalName, Args.CODE, Args.NAME, Args.CAPTION,
    'DocsJournal', 'SLAVE', LDocID);
end
```

</details>

_Источники сведений:_ `Материалы для документации/Скрипты/ScriptsJournal`

---
