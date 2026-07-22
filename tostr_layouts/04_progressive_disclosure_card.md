<a id="tostr"></a>

# `_ToStr` — Преобразование значения в строку

```pascal
function _ToStr(V: Variant; Format: Boolean = False): String
```

Преобразует `V` в строку. Для JSON возвращает JSON-текст.

| Параметр | Назначение |
|---|---|
| `V: Variant` | JSON-объект, JSON-массив или иное значение. |
| `Format: Boolean = False` | При `True` форматирует JSON с переводами строк и отступами. |

**Возвращает:** `String` — строковое представление значения.

<details>
<summary><strong>Подробное поведение</strong></summary>

- Для JSON-объекта или JSON-массива возвращает его текстовое представление.
- При `Format = True` применяет `JsonReformat`.
- Для даты формирует ISO 8601 с разделителем `T` и миллисекундами.
- Формулировки параметров и результата основаны на `EventScript_desc.odt` и `fsCommon.pas`.

</details>

<details>
<summary><strong>Пример вызова</strong></summary>

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

<sub>Источники: `Материалы для документации/source/_odt_extract/EventScript_desc.txt`; `Материалы для документации/source/fsCommon.pas`.</sub>
