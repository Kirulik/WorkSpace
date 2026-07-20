# Работа с универсальными журналами и справочниками

Универсальные журналы — постоянное хранилище бизнес-данных UniServer (взвешивания, справочники, связанные документы). Скрипт обращается к журналу по имени: `GetRecord` / `GetRecords` читают, `SetRecord` сохраняет документ-`Variant` (часто JSON-объект с полями вроде `CODE`, `NUMB_TS`). Варианты `*NT` выполняют изменение без запуска триггеров; `Async*` ставят операцию в очередь сообщений без ожидания. `GetQuery` выполняет SQL к SQLite-таблице журнала (имя таблицы всегда `Journal`); `GetQueryEx` — к внешней БД с синтаксисом этой БД. Связи (`SetLink` / `GetLink` / `DeleteLinks`) и вложения (`GetBlob` / `SetBlob`) дополняют документ без дублирования всей структуры. Сохранение идёт через шину сообщений (`Journal.Operation` и `SendMsg` в реализации) — журнал связан с общей моделью обмена платформы, а не является изолированным SQL-API.

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

*** `GetRecord` — Элемент скриптового API ****

`function GetRecord(Journal, Code: String): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (по EventScript_desc.odt)
- `Code: String` — идентификатор записи (по EventScript_desc.odt)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  Doc: Variant;
begin
  Doc := GetRecord('WeighingJournal', 'D307EB...205027'); // запись по CODE
  DebugLog(Doc.NUMB_TS);                                  // поле записи
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="getrecords"></a>
### `GetRecords`

*** `GetRecords` — Поиск записей журнала ****

`function GetRecords(Journal: String; Args: Variant): Variant`

**Входные параметры:**
- `Journal: String` — имя журнала (по EventScript_desc.odt)
- `Args: Variant` — параметры поиска (в примерах ODT: Filter, SortField, SortDesc, MaxRows)

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- В `Args` используются поля `Filter`, `SortField`, `SortDesc`, `MaxRows`.

**Пример вызова:**

```pascal
var
  Args, Docs, Doc: Variant;
  i: Integer;
begin
  Args := _Obj();                        // аргументы выборки
  Args.Filter := _Obj();                 // фильтр
  Args.Filter.NUMB_TS := 'A999AB45';     // условие по полю
  Args.SortField := 'DATETIME_CREATE';   // сортировка
  Args.SortDesc := True;                 // по убыванию
  Args.MaxRows := 10;                    // лимит строк
  Docs := GetRecords('WeighingJournal', Args); // выполнить поиск
  for i := 0 to Docs._Count - 1 do begin
    Doc := Docs.Value(i);                // очередная запись
    DebugLog(Doc.NUMB_TS);               // вывести поле
  end;
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="setrecord"></a>
### `SetRecord`

*** `SetRecord` — Сохранение записи журнала ****

`function SetRecord(Journal: String; Doc: Variant): String`

**Входные параметры:**
- `Journal: String` — имя журнала (по EventScript_desc.odt)
- `Doc: Variant` — данные записи (по EventScript_desc.odt)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Перед отправкой удаляет поле `DBID` из документа.
- Операция передаётся сообщением `Journal.Operation` через `SendMsg`.

**Пример вызова:**

```pascal
var
  Doc: Variant;
  Code: String;
begin
  Doc := _Obj();                         // документ записи
  Doc.CODE := 'D307EB...205027';         // код записи
  Doc.NUMB_TS := 'A999AB45';              // поле данных
  Code := SetRecord('WeighingJournal', Doc); // сохранить запись
  DebugLog(Code);                        // результат операции
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="setrecordnt"></a>
### `SetRecordNT`

*** `SetRecordNT` — Сохранение без триггеров ****

`function SetRecordNT(Journal: String; Doc: Variant): String`

**Входные параметры:**
- `Journal: String` — имя журнала (по EventScript_desc.odt)
- `Doc: Variant` — данные записи (по EventScript_desc.odt)

**Возвращает:**

результат операции записи; изменение выполняется без запуска триггеров (по EventScript_desc.odt)

**Сведения из исходников / ODT:**

- Выполняет изменение записи без запуска триггеров.
- Операция передаётся сообщением `Journal.Operation` через `SendMsg`.

**Пример вызова:**

```pascal
var
  Doc: Variant;
begin
  Doc := _Obj();
  Doc.CODE := 'D307EB...205027';
  Doc.NUMB_TS := 'A999AB45';
  DebugLog(SetRecordNT('WeighingJournal', Doc)); // сохранить без запуска триггеров
end
```

_Источник сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCoreScript.pas`

---

<a id="getview"></a>
### `GetView`

*** `GetView` — Элемент скриптового API ****

`function GetView(Journal, Name: String; Params, Filter: Variant; SortField: String; SortDesc: Boolean; FirstRow, MaxRows: Integer): Variant`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Params: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Filter: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `SortField: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `SortDesc: Boolean` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `FirstRow: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `MaxRows: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

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
  // r := GetView(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="execproc"></a>
### `ExecProc`

*** `ExecProc` — Элемент скриптового API ****

`function ExecProc(Journal, Name: String; Args: Variant): Variant`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Args: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

Значение типа `Variant` (тип подтверждён сигнатурой RTTI).

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> семантика возвращаемого значения в текстовых материалах не описана.

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
var
  Code: String;
begin
  Code := '';
  DebugLog(_ToStr(ExecProc('WeighingJournal', 'SetSlaveDoc', _ArrEx([Code])))); // хранимая процедура
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="getblobs"></a>
### `GetBlobs`

*** `GetBlobs` — Элемент скриптового API ****

`function GetBlobs(Journal, Code: String): Variant`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

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
  // r := GetBlobs(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="getblob"></a>
### `GetBlob`

*** `GetBlob` — Элемент скриптового API ****

`function GetBlob(Journal, Code, Name: String): Variant`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
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
  // r := GetBlob(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="setblob"></a>
### `SetBlob`

*** `SetBlob` — Элемент скриптового API ****

`procedure SetBlob(Journal, Code, Name: String; Blob: Variant)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Blob: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // SetBlob(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="setlink"></a>
### `SetLink`

*** `SetLink` — Элемент скриптового API ****

`function SetLink(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String): String`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Caption: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `LinkJournal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `LinkType: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Link: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

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
  // r := SetLink(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="setlinknt"></a>
### `SetLinkNT`

*** `SetLinkNT` — Элемент скриптового API ****

`function SetLinkNT(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String): String`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Caption: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `LinkJournal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `LinkType: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Link: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

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
  // r := SetLinkNT(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="getlink"></a>
### `GetLink`

*** `GetLink` — Элемент скриптового API ****

`function GetLink(Journal, Code, Name: String): Variant`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
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
  // r := GetLink(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="getlink-link"></a>
### `GetLink_Link`

*** `GetLink_Link` — Элемент скриптового API ****

`function GetLink_Link(Journal, Code, Name: String): String`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
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
  // r := GetLink_Link(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="getlinks"></a>
### `GetLinks`

*** `GetLinks` — Элемент скриптового API ****

`function GetLinks(Journal, Code: String; MaxRows: Integer): Variant`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `MaxRows: Integer` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

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
  // r := GetLinks(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой функции.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="deletelinks"></a>
### `DeleteLinks`

*** `DeleteLinks` — Элемент скриптового API ****

`procedure DeleteLinks(Journal, Code, Link: String)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Link: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // DeleteLinks(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="undeletelinks"></a>
### `UnDeleteLinks`

*** `UnDeleteLinks` — Элемент скриптового API ****

`procedure UnDeleteLinks(Journal, Code, Link: String)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Link: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // UnDeleteLinks(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="deletelinksnt"></a>
### `DeleteLinksNT`

*** `DeleteLinksNT` — Элемент скриптового API ****

`procedure DeleteLinksNT(Journal, Code, Link: String)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Link: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // DeleteLinksNT(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="undeletelinksnt"></a>
### `UnDeleteLinksNT`

*** `UnDeleteLinksNT` — Элемент скриптового API ****

`procedure UnDeleteLinksNT(Journal, Code, Link: String)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Link: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // UnDeleteLinksNT(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="asyncsetrecord"></a>
### `AsyncSetRecord`

*** `AsyncSetRecord` — Элемент скриптового API ****

`procedure AsyncSetRecord(Journal: String; Doc: Variant)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Doc: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // AsyncSetRecord(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="asyncsetrecordnt"></a>
### `AsyncSetRecordNT`

*** `AsyncSetRecordNT` — Элемент скриптового API ****

`procedure AsyncSetRecordNT(Journal: String; Doc: Variant)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Doc: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // AsyncSetRecordNT(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="asyncexecproc"></a>
### `AsyncExecProc`

*** `AsyncExecProc` — Элемент скриптового API ****

`procedure AsyncExecProc(Journal, Name: String; Args: Variant)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Args: Variant` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // AsyncExecProc(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="asyncsetlink"></a>
### `AsyncSetLink`

*** `AsyncSetLink` — Элемент скриптового API ****

`procedure AsyncSetLink(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Caption: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `LinkJournal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `LinkType: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Link: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // AsyncSetLink(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---

<a id="asyncsetlinknt"></a>
### `AsyncSetLinkNT`

*** `AsyncSetLinkNT` — Элемент скриптового API ****

`procedure AsyncSetLinkNT(Journal, Code, Name, Caption, LinkJournal, LinkType, Link: String)`

**Входные параметры:**
- `Journal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Code: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Name: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Caption: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `LinkJournal: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `LinkType: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).
- `Link: String` — > <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в материалах нет текстового описания назначения этого параметра (есть только тип из RTTI).

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Доступность и типы подтверждены регистрацией RTTI в `functions.txt`.

> <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ:</span> в источниках найдена в основном сигнатура RTTI; развёрнутое назначение уточнить у тимлида.

**Пример вызова:**

```pascal
begin
  // AsyncSetLinkNT(...);
  // > ТРЕБУЕТСЯ ДОПОЛНЕНИЕ: в материалах нет готового примера вызова для этой процедуры.
end
```

_Источник сведений:_ `Материалы для документации/functions.txt`

---
