<a id="tostr"></a>

# `_ToStr` — Преобразование значения в строку

## Синтаксис

```pascal
function _ToStr(V: Variant; Format: Boolean = False): String
```

## Параметры

| Параметр | Тип | По умолчанию | Описание |
|:--|:--|--:|:--|
| `V` | `Variant` | — | JSON-объект, JSON-массив или иное значение для преобразования в строку. |
| `Format` | `Boolean` | `False` | Форматировать JSON-текст: добавлять переводы строк и отступы. |

## Описание

Возвращает преобразованное значение `V: Variant` в `String`.

> **Особенности:** JSON-объекты и JSON-массивы преобразуются в текстовое представление; при `Format = True` применяется `JsonReformat`; даты формируются в ISO 8601 с разделителем `T` и миллисекундами.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
var
  x: Variant;                // JSON-объект
  s: String;                 // строковый результат
begin
  x := _Json('{"ID":10}');   // разобрать JSON-строку в объект
  s := _ToStr(x);            // преобразовать объект в строку
  s := _ToStr(x, True);      // то же с форматированием JSON
  DebugLog(s);               // записать результат в лог
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`
