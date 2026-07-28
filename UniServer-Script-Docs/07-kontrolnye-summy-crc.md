# Контрольные суммы CRC8 и CRC16

Контрольные суммы CRC8/CRC16 входят в проверку целостности пакетов устройств: скрипт получает данные как hex-строку, считает сумму по выбранному алгоритму и сравнивает с полем контрольной суммы в кадре. Результаты возвращаются снова в hex (2 символа для CRC8, 4 для CRC16). Раздел описывает только вычислительный слой; параметры полинома задаёт документация устройства.

<a id="hextocrc8summod2"></a>

# `HexToCRC8SumMod2` — CRC8 в hex

## Синтаксис

```pascal
function HexToCRC8SumMod2(SourceStr: String; AIndex, Count: integer; FirstByte: byte): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `SourceStr` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `AIndex` | `integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `Count` | `integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `FirstByte` | `byte` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает CRC8 для данных в hex по алгоритму суммы по модулю 2.

> **Особенности:** Результат CRC8 представлен hex-строкой из 2 символов.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(HexToCRC8SumMod2('0102', 0, 2, 0)); // CRC8 SumMod2 по hex-данным
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextocrc8sum"></a>

# `HexToCRC8Sum` — CRC8 в hex

## Синтаксис

```pascal
function HexToCRC8Sum(SourceStr: String; AIndex, ACount: integer; FirstByte: byte): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `SourceStr` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `AIndex` | `integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `ACount` | `integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `FirstByte` | `byte` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает CRC8 для данных в hex по алгоритму простой суммы.

> **Особенности:** Результат CRC8 представлен hex-строкой из 2 символов.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  DebugLog(HexToCRC8Sum('0102', 0, 2, 0)); // CRC8 Sum по hex-данным
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextocrc8polinom"></a>

# `HexToCRC8Polinom` — CRC8 по полиному

## Синтаксис

```pascal
function HexToCRC8Polinom(SourceStr: String; AIndex, ACount: integer; Poly, Init: word; ReflIn: boolean; XorOut: word): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `SourceStr` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `AIndex` | `integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `ACount` | `integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `Poly` | `word` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `Init` | `word` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `ReflIn` | `boolean` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `XorOut` | `word` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает CRC8 для данных в hex по заданному полиному.

> **Особенности:** Результат CRC8 представлен hex-строкой из 2 символов.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Параметры Poly/Init/ReflIn/XorOut задаются по требованиям протокола оборудования
  DebugLog(HexToCRC8Polinom('0102', 0, 2, 0, 0, False, 0));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---

<a id="hextocrc16polinom"></a>

# `HexToCRC16Polinom` — CRC16 по полиному

## Синтаксис

```pascal
function HexToCRC16Polinom(SourceStr: String; AIndex, ACount: integer; Poly, Init: word; ReflIn: boolean; XorOut: word): String
```

## Параметры

| Параметр | Тип | Описание |
|:--|:--|:--|
| `SourceStr` | `String` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `AIndex` | `integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `ACount` | `integer` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `Poly` | `word` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `Init` | `word` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `ReflIn` | `boolean` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |
| `XorOut` | `word` | <span style="color:#b00020;font-weight:bold;background:#fff3cd;padding:2px 6px;">⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ</span> |

## Описание

Возвращает CRC16 для данных в hex по заданному полиному.

> **Особенности:** Результат CRC16 представлен hex-строкой из 4 символов.

<details>
<summary><strong>Пример реализации</strong></summary>

```pascal
begin
  // Параметры Poly/Init/ReflIn/XorOut задаются по требованиям протокола оборудования
  DebugLog(HexToCRC16Polinom('0102', 0, 2, 0, 0, False, 0));
end
```

</details>

_Источники сведений:_ `Материалы для документации/source/fsCommon.pas`

---
