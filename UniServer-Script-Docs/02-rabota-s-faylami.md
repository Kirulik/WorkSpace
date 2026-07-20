# Работа с Файлами

Документ сформирован по регистрации RTTI и проверенным сведениям исходников/ODT.

<a id="stringfromfile"></a>
### `StringFromFile`

*** `StringFromFile` — Чтение текста из файла ****

`function StringFromFile(FileName: String): String`

**Входные параметры:**
- `FileName: String` — путь к файлу; относительный путь резолвится от MyPath (по `fsCoreScript.pas`)

**Возвращает:**

Значение типа `String` (тип подтверждён сигнатурой RTTI).

**Сведения из исходников / ODT:**

- Относительный путь разрешается относительно `MyPath`.

**Пример вызова:**

```pascal
var
  s: String;                 // содержимое файла
begin
  s := StringFromFile('data.txt'); // прочитать файл
  DebugLog(s);                     // вывести содержимое
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="filefromstring"></a>
### `FileFromString`

*** `FileFromString` — Запись текста в файл ****

`procedure FileFromString(Content: String; FileName: String)`

**Входные параметры:**
- `Content: String` — текст для записи в файл
- `FileName: String` — путь к файлу; относительный путь резолвится от MyPath (по `fsCoreScript.pas`)

**Возвращает:**

_Процедура ничего не возвращает._

**Сведения из исходников / ODT:**

- Относительный путь разрешается относительно `MyPath`.

**Пример вызова:**

```pascal
begin
  FileFromString('text', 'out.txt'); // записать строку в файл
end
```

_Источник сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---
