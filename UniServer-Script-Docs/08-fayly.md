# Файлы

Файловые функции позволяют скрипту читать и записывать текст относительно каталога плагина (`MyPath` из конфигурации ядра): относительный путь разрешается именно к нему. Это не замена универсальным журналам: для весовых и учётных записей платформа использует журналы и сообщения. Кодировка веб-страниц и шаблонов в UniServer — UTF-8.

<a id="stringfromfile"></a>

# `StringFromFile` — Чтение текста из файла

## Синтаксис

```pascal
function StringFromFile(FileName: String): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `FileName` | `String` | путь к файлу; относительный путь резолвится от MyPath (по `fsCoreScript.pas`) |

## Описание

Возвращает текстовое содержимое файла. Относительный путь разрешается от каталога плагина (`MyPath`).

> **Особенности:** Относительный путь разрешается относительно `MyPath`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  s: String;                 // содержимое файла
begin
  s := StringFromFile('data.txt'); // прочитать файл
  DebugLog(s);                     // вывести содержимое
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---

<a id="filefromstring"></a>

# `FileFromString` — Запись текста в файл

## Синтаксис

```pascal
procedure FileFromString(Content: String; FileName: String)
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `Content` | `String` | текст для записи в файл |
| `FileName` | `String` | путь к файлу; относительный путь резолвится от MyPath (по `fsCoreScript.pas`) |

## Описание

Записывает текст в файл. Относительный путь разрешается от каталога плагина (`MyPath`).

> **Особенности:** Относительный путь разрешается относительно `MyPath`.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  FileFromString('text', 'out.txt'); // записать строку в файл
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCoreScript.pas`

---
