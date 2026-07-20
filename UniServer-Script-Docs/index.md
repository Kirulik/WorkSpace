# UniServer Script API

Справка по API сценариев UniServer (PascalScript / FastScript).

Документация собрана по регистрации RTTI, исходникам (`fsCommon`, `fsCoreScript`, `fsJsonVar`, `PluginAPI_TLB`) и описаниям PluginAPI / EventScript. Неподтверждённые сведения не дополняются предположениями.

## Как пользоваться

1. Откройте раздел в меню слева.
2. Воспользуйтесь **поиском** (поле в шапке или клавиша `/`) — ищет по всем страницам: именам функций, описаниям и примерам.
3. На странице раздела используйте оглавление справа для перехода к конкретной функции.

## Разделы

| Раздел | Содержание |
|--------|------------|
| [Общие функции](01-obshchie-funktsii.md) | Variant, GUID, Sleep, проверки пустоты |
| [Работа с файлами](02-rabota-s-faylami.md) | Чтение/запись относительно MyPath |
| [Работа со строками](03-rabota-so-strokami.md) | Строки и Format* |
| [Дата и время](04-data-i-vremya.md) | ISO 8601, интервалы, NowPrecise |
| [Hex-преобразование](05-hex-preobrazovanie.md) | Числа ↔ hex для протоколов |
| [Формат вещественных](06-format-veschestvennyh.md) | Округление по точности и дискрету |
| [CRC8 и CRC16](07-crc8-crc16.md) | Контрольные суммы пакетов |
| [Типы данных](08-tipy-dannyh.md) | TDocVariantKind |
| [JSON-объекты](09-json-obekty.md) | _Obj, _Arr, _Json и методы |
| [Функции сервера](10-obshchie-funktsii-servera.md) | DebugLog, GetConfig* |
| [Отправка сообщений](11-otpravka-soobscheniy.md) | PostMsg / SendMsg |
| [Глобальные переменные](12-globalnye-peremennye.md) | Переменные конструктора |
| [Интерфейс сервера](13-interfeys-servera.md) | TICoreConfig, Request/Response, … |
| [Универсальные журналы](14-universalnye-zhurnaly.md) | GetRecord, SetRecord, связи |

## Сборка HTML

Статический сайт с поиском (для просмотра и последующего встраивания в веб-UI конструктора):

```bash
pip install -r requirements.txt
mkdocs serve          # локальный просмотр: http://127.0.0.1:8000
mkdocs build          # результат в папке site/
```

Папка `site/` — самодостаточный набор HTML/CSS/JS; его можно открыть локально или скопировать в ресурсы плагина-конструктора.
