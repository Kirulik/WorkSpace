# EventScript_desc.odt — извлечённый текст (очищенный)

Источник: `Материалы для документации/source/EventScript_desc.odt`  
Назначение: сырое официальное описание скриптового API (неполное; использовать вместе с `functions.txt` и исходниками).

---

## Общие сведения

Скрипт выполняется библиотекой **FastScript**:  
https://www.fastreport.ru/public_download/fs_ru.pdf

Скрипт может быть на **JScript** или **PascalScript**. Синтаксис определяется автоматически (по наличию угловых скобок `{}` в начале и конце текста).

Кроме стандартных функций FastScript доступны функции для работы с **JSON** и **универсальными журналами**.

---

## Функции (как в ODT)

### JSON

| Функция | Описание | Пример из ODT |
|---------|----------|---------------|
| `_Arr: Variant` | JSON-массив | `x := _Arr(); x.Add(10); Result := _ToStr(x);` |
| `_ArrEx(A: array of Variant): Variant` | Массив с начальными значениями | `x := _ArrEx([1, 2, 3]);` |
| `_Obj: Variant` | JSON-объект | `x := _Obj(); x.AddValue('ID', 10);` |
| `_ObjEx(A: array of Variant): Variant` | Объект из пар имя/значение | `x := _ObjEx(['ID', 10, 'Name', 'X']);` |
| `_Json(S: String): Variant` | Разбор JSON-строки | `x := _Json('{"ID":10}');` |
| `_ToStr(V; Format = False): String` | Объект/массив → строка; `Format` — pretty-print | |

### Прочее

| Функция | Описание по ODT |
|---------|-----------------|
| `DebugLog(S)` | Пишет строку в файл **EventScript.log** |
| `GetConfigValue(Name)` | Значение конфигурации сервера (`'Core.ServerID'`) |
| `Iso8601ToDateTime` / `DateTimeToIso8601` | ISO8601 ↔ TDateTime |
| `SecondsBetween` / `MillisecondsBetween` | Разница дат |

### Журналы

| Функция | Описание по ODT |
|---------|-----------------|
| `GetRecord(Journal, Code)` | Запись по идентификатору `Code` |
| `GetRecords(Journal, Filter)` | Поиск; аргумент — объект с `Filter` и др. |
| `SetRecord(Journal, Doc)` | Изменить запись |
| `SetRecordNT(Journal, Doc)` | Изменить запись **без запуска триггеров** |
| `GetQuery(Journal, SQL)` | SQL к БД журнала; синтаксис **SQLite**; имя таблицы всегда **`Journal`** |
| `GetQueryEx(Journal, SQL)` | SQL к **внешней** БД; синтаксис внешней БД; имя таблицы — из настроек |
| `GetView(Journal, Name, Args, Params)` | Данные представления *(сигнатура в ODT устарела относительно текущего RTTI)* |
| `ExecProc(Journal, Name, Args)` | Хранимая процедура |

---

## Свойства/методы JSON-переменной (из ODT)

| Член | Описание |
|------|----------|
| `_Kind` | `dvObject` или `dvArray` |
| `_Count` | Число элементов |
| `Name(Idx)` | Имя поля объекта |
| `Value(Idx)` | Значение (чтение/запись) |
| `Exists(Name)` | Есть ли имя / значение |
| `Add(V)` | Добавить в массив → индекс |
| `AddValue(Name, V)` | Добавить в объект → индекс |
| `Delete(Idx)` | Удалить |
| `ToString` | В строку |

### Пример: состояние камеры

```pascal
var x: Variant;
begin
  x := _Json(CameraState); // '{ "Enabled":true, "State": "Running", "FPS": 22.1 }'
  if x.Enabled then begin
    if x.State <> 'Running' then
      ...
  end;
end
```

```pascal
var x: Variant; i: Integer;
begin
  x := _Json(CameraState);
  if x._Kind = dvObject then
    for i := 0 to x._Count - 1 do
      DebugLog(x.Name(i) + ':' + x.Value(i))
  else if x._Kind = dvArray then
    for i := 0 to x._Count - 1 do
      DebugLog(x.Value(i));
end
```

### Пример: последние 10 записей по номеру ТС

```pascal
var
  Numb: String;
  Args, Docs, Doc: Variant;
  i: Integer;
begin
  Numb := 'A999AB45';
  Args := _Obj();
  Args.Filter := _Obj();
  Args.Filter.NUMB_TS := Numb;
  Args.SortField := 'DATETIME_CREATE';
  Args.SortDesc := True;
  Args.MaxRows := 10;
  Docs := GetRecords('WeighingJournal', Args);
  for i := 0 to Docs._Count - 1 do begin
    Doc := Docs.Value(i);
    DebugLog(Doc.NUMB_TS);
  end;
end
```

---

## Замечания при использовании как источника

1. Текст ODT **сырой**: местами слеплены слова (`языкеJScriptилиPascalScript`), опечатки (`Milli-secondsBetween`, `Obj()` вместо `_Obj()`).
2. Покрывает **не весь** актуальный `functions.txt` (нет hex/CRC, workers-утилит, полного списка объектов ядра, Async*, переменных `GetVar*` и т.д.).
3. Сигнатура `GetView` в ODT **не совпадает** с текущим RTTI в `fsCoreScript.pas` / `functions.txt` — для документации приоритет у исходников.
4. Формулировка **`SetRecordNT` = без запуска триггеров** — ценная, в исходниках скриптового слоя не раскрыта.
