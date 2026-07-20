# Документация UniServer Script API

Справка по API сценариев UniServer, сформированная по исходному коду, регистрации RTTI и извлечениям из исходных ODT. Неподтверждённые назначения намеренно не дополняются предположениями.

## Содержание

<details>
<summary>Общие функции</summary>

- [`_ToStr`](UniServer-Script-Docs/01-obshchie-funktsii.md#tostr)
- [`ToDouble`](UniServer-Script-Docs/01-obshchie-funktsii.md#todouble)
- [`NewPackedGuid`](UniServer-Script-Docs/01-obshchie-funktsii.md#newpackedguid)
- [`IsPackedGuid`](UniServer-Script-Docs/01-obshchie-funktsii.md#ispackedguid)
- [`Sleep`](UniServer-Script-Docs/01-obshchie-funktsii.md#sleep)
- [`IsEmpty`](UniServer-Script-Docs/01-obshchie-funktsii.md#isempty)
- [`VarIsEmptyOrNull`](UniServer-Script-Docs/01-obshchie-funktsii.md#varisemptyornull)

</details>

<details>
<summary>Работа с Файлами</summary>

- [`StringFromFile`](UniServer-Script-Docs/02-rabota-s-faylami.md#stringfromfile)
- [`FileFromString`](UniServer-Script-Docs/02-rabota-s-faylami.md#filefromstring)

</details>

<details>
<summary>Работа со строками</summary>

- [`QuotedStr`](UniServer-Script-Docs/03-rabota-so-strokami.md#quotedstr)
- [`UpperCase`](UniServer-Script-Docs/03-rabota-so-strokami.md#uppercase)
- [`LowerCase`](UniServer-Script-Docs/03-rabota-so-strokami.md#lowercase)
- [`Length`](UniServer-Script-Docs/03-rabota-so-strokami.md#length)
- [`Pos`](UniServer-Script-Docs/03-rabota-so-strokami.md#pos)
- [`StringReplace`](UniServer-Script-Docs/03-rabota-so-strokami.md#stringreplace)
- [`Format`](UniServer-Script-Docs/03-rabota-so-strokami.md#format)
- [`FormatUtf8`](UniServer-Script-Docs/03-rabota-so-strokami.md#formatutf8)
- [`FormatJson`](UniServer-Script-Docs/03-rabota-so-strokami.md#formatjson)
- [`FormatFloat`](UniServer-Script-Docs/03-rabota-so-strokami.md#formatfloat)

</details>

<details>
<summary>работа с датой и временем</summary>

- [`Iso8601ToDateTime`](UniServer-Script-Docs/04-data-i-vremya.md#iso8601todatetime)
- [`DateTimeToIso8601`](UniServer-Script-Docs/04-data-i-vremya.md#datetimetoiso8601)
- [`SecondsBetween`](UniServer-Script-Docs/04-data-i-vremya.md#secondsbetween)
- [`MillisecondsBetween`](UniServer-Script-Docs/04-data-i-vremya.md#millisecondsbetween)
- [`MinutesBetween`](UniServer-Script-Docs/04-data-i-vremya.md#minutesbetween)
- [`HoursBetween`](UniServer-Script-Docs/04-data-i-vremya.md#hoursbetween)
- [`NowPrecise`](UniServer-Script-Docs/04-data-i-vremya.md#nowprecise)
- [`NowUTCPrecise`](UniServer-Script-Docs/04-data-i-vremya.md#nowutcprecise)
- [`IncHour`](UniServer-Script-Docs/04-data-i-vremya.md#inchour)
- [`IncDay`](UniServer-Script-Docs/04-data-i-vremya.md#incday)
- [`IncMinute`](UniServer-Script-Docs/04-data-i-vremya.md#incminute)
- [`IncSecond`](UniServer-Script-Docs/04-data-i-vremya.md#incsecond)
- [`IncMilliSecond`](UniServer-Script-Docs/04-data-i-vremya.md#incmillisecond)
- [`TicksPeriodToText`](UniServer-Script-Docs/04-data-i-vremya.md#ticksperiodtotext)

</details>

<details>
<summary>Hex преобразованеие чисел</summary>

- [`ByteToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#bytetohex)
- [`WordToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#wordtohex)
- [`IntToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#inttohex)
- [`Int64ToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#int64tohex)
- [`DoubleToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#doubletohex)
- [`SingleToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#singletohex)
- [`HexToByte`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextobyte)
- [`HexToWord`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextoword)
- [`HexToLongWord`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextolongword)
- [`HexToInt`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextoint)
- [`HexToInt64`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextoint64)
- [`HexToDouble`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextodouble)
- [`HexToSingle`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextosingle)
- [`StrToHex`](UniServer-Script-Docs/05-hex-preobrazovanie.md#strtohex)
- [`HexToStr`](UniServer-Script-Docs/05-hex-preobrazovanie.md#hextostr)

</details>

<details>
<summary>Формат представления вещественных чисел</summary>

- [`SetFormatPrecision`](UniServer-Script-Docs/06-format-veschestvennyh.md#setformatprecision)
- [`SetFormatRoundFromDiscret`](UniServer-Script-Docs/06-format-veschestvennyh.md#setformatroundfromdiscret)

</details>

<details>
<summary>Функции CRC8 и CRC16</summary>

- [`HexToCRC8SumMod2`](UniServer-Script-Docs/07-crc8-crc16.md#hextocrc8summod2)
- [`HexToCRC8Sum`](UniServer-Script-Docs/07-crc8-crc16.md#hextocrc8sum)
- [`HexToCRC8Polinom`](UniServer-Script-Docs/07-crc8-crc16.md#hextocrc8polinom)
- [`HexToCRC16Polinom`](UniServer-Script-Docs/07-crc8-crc16.md#hextocrc16polinom)

</details>

<details>
<summary>Типы данных</summary>

- [`TDocVariantKind`](UniServer-Script-Docs/08-tipy-dannyh.md#tdocvariantkind)

</details>

<details>
<summary>работы с JSON объектами</summary>

- [`QuotedStrJSON`](UniServer-Script-Docs/09-json-obekty.md#quotedstrjson)
- [`EscapeJSON`](UniServer-Script-Docs/09-json-obekty.md#escapejson)
- [`_Arr`](UniServer-Script-Docs/09-json-obekty.md#arr)
- [`_ArrEx`](UniServer-Script-Docs/09-json-obekty.md#arrex)
- [`_Obj`](UniServer-Script-Docs/09-json-obekty.md#obj)
- [`_ObjEx`](UniServer-Script-Docs/09-json-obekty.md#objex)
- [`_Json`](UniServer-Script-Docs/09-json-obekty.md#json)
- [`_Copy`](UniServer-Script-Docs/09-json-obekty.md#copy)
- [`_Kind`](UniServer-Script-Docs/09-json-obekty.md#json-json-kind)
- [`_Count`](UniServer-Script-Docs/09-json-obekty.md#json-json-count)
- [`Name`](UniServer-Script-Docs/09-json-obekty.md#json-json-name)
- [`Value`](UniServer-Script-Docs/09-json-obekty.md#json-json-value)
- [`Exists`](UniServer-Script-Docs/09-json-obekty.md#json-json-exists)
- [`Add`](UniServer-Script-Docs/09-json-obekty.md#json-json-add)
- [`AddValue`](UniServer-Script-Docs/09-json-obekty.md#json-json-addvalue)
- [`Delete`](UniServer-Script-Docs/09-json-obekty.md#json-json-delete)
- [`ToString`](UniServer-Script-Docs/09-json-obekty.md#json-json-tostring)

</details>

<details>
<summary>Общие функции для работы с сервером</summary>

- [`DebugLog`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#debuglog)
- [`GetConfigValue`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#getconfigvalue)
- [`GetConfigFloatDef`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#getconfigfloatdef)
- [`GetConfigIntDef`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#getconfigintdef)
- [`GetConfigBoolDef`](UniServer-Script-Docs/10-obshchie-funktsii-servera.md#getconfigbooldef)

</details>

<details>
<summary>Отправка сообщений</summary>

- [`NewMessage`](UniServer-Script-Docs/11-otpravka-soobscheniy.md#newmessage)
- [`NewMessageEx`](UniServer-Script-Docs/11-otpravka-soobscheniy.md#newmessageex)
- [`PostMsg`](UniServer-Script-Docs/11-otpravka-soobscheniy.md#postmsg)
- [`SendMsg`](UniServer-Script-Docs/11-otpravka-soobscheniy.md#sendmsg)

</details>

<details>
<summary>Плагин Конструктор / Работа с глобальными переменными Конструктора</summary>

- [`GetVarModTime`](UniServer-Script-Docs/12-globalnye-peremennye.md#getvarmodtime)
- [`GetVarModCount`](UniServer-Script-Docs/12-globalnye-peremennye.md#getvarmodcount)
- [`GetVarModFreq`](UniServer-Script-Docs/12-globalnye-peremennye.md#getvarmodfreq)
- [`GetVarValue`](UniServer-Script-Docs/12-globalnye-peremennye.md#getvarvalue)
- [`SetVarValue`](UniServer-Script-Docs/12-globalnye-peremennye.md#setvarvalue)

</details>

<details>
<summary>Интерфейс сервера</summary>

- [`TIBlob`](UniServer-Script-Docs/13-interfeys-servera.md#tiblob)
- [`TICoreConfig`](UniServer-Script-Docs/13-interfeys-servera.md#ticoreconfig)
- [`TICoreLocale`](UniServer-Script-Docs/13-interfeys-servera.md#ticorelocale)
- [`TICoreMessages`](UniServer-Script-Docs/13-interfeys-servera.md#ticoremessages)
- [`TICoreScheduler`](UniServer-Script-Docs/13-interfeys-servera.md#ticorescheduler)
- [`TIUser`](UniServer-Script-Docs/13-interfeys-servera.md#tiuser)
- [`TIMessage`](UniServer-Script-Docs/13-interfeys-servera.md#timessage)
- [`TIWebServerRequest`](UniServer-Script-Docs/13-interfeys-servera.md#tiwebserverrequest)
- [`TIWebServerResponse`](UniServer-Script-Docs/13-interfeys-servera.md#tiwebserverresponse)

</details>

<details>
<summary>Работа с универсальными журналами и справочниками</summary>

- [`GetQuery`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getquery)
- [`GetQueryEx`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getqueryex)
- [`GetRecord`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getrecord)
- [`GetRecords`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getrecords)
- [`SetRecord`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setrecord)
- [`SetRecordNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setrecordnt)
- [`GetView`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getview)
- [`ExecProc`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#execproc)
- [`GetBlobs`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getblobs)
- [`GetBlob`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getblob)
- [`SetBlob`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setblob)
- [`SetLink`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setlink)
- [`SetLinkNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#setlinknt)
- [`GetLink`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getlink)
- [`GetLink_Link`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getlink-link)
- [`GetLinks`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#getlinks)
- [`DeleteLinks`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#deletelinks)
- [`UnDeleteLinks`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#undeletelinks)
- [`DeleteLinksNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#deletelinksnt)
- [`UnDeleteLinksNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#undeletelinksnt)
- [`AsyncSetRecord`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncsetrecord)
- [`AsyncSetRecordNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncsetrecordnt)
- [`AsyncExecProc`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncexecproc)
- [`AsyncSetLink`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncsetlink)
- [`AsyncSetLinkNT`](UniServer-Script-Docs/14-universalnye-zhurnaly.md#asyncsetlinknt)

</details>

## Использование

Откройте нужный раздел из раскрывающегося содержания ниже.

Каждая функция оформлена по единой схеме: заголовок, сигнатура, входные параметры, возвращаемое значение, сведения из исходников/ODT, пример вызова с комментариями к строкам кода.

Маркер **⚠ ТРЕБУЕТСЯ ДОПОЛНЕНИЕ** означает, что в материалах (`functions.txt`, исходники, ODT) нет достаточного текстового описания — место отмечено для ручного дополнения тимлидом. Самостоятельные домыслы в справку не включались.

## Источники

- `Материалы для документации/functions.txt`
- `Материалы для документации/source/fsCommon.pas`
- `Материалы для документации/source/fsCoreScript.pas`
- `Материалы для документации/source/fsJsonVar.pas`
- `Материалы для документации/source/PluginAPI_TLB.pas`
- `Материалы для документации/source/_odt_extract/EventScript_desc.txt`
- `Материалы для документации/source/_odt_extract/PluginAPI_desc.txt`
