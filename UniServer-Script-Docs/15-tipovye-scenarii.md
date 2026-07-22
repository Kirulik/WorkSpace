# Типовые сценарии (по production-скриптам)

Ниже — сжатые цепочки вызовов API из реальных пакетов Scripts*. Полные карточки функций — в соответствующих разделах.

## АвтоКПП (ScriptsAutoControl)

1. Идентификация → команда поиска пропуска: `SendMsg(NewMessage(PluginName + '.FindPassDoc', …))`.
2. В cmd: `_Json(Msg.Value)` → `GetRecords` с `Filter` / `OR` / `MaxRows` → ответ в **`Msg.Result`**.
3. Завершение проезда: `SetRecord(TrafficJournalName, Doc)` → `SetBlob(..., 'PHOTOn', …)`.
4. Веб-действие: проверка `CurrentState` → `SendMsg`/`PostMsg` → `Response.ReturnText(..., 200|500)`.
5. Страница UI: `Response.ReturnPage('Control', Scope)` с `PluginName` / `PluginIndex` в scope.

Ключевые файлы: `cmd.AutoControl1.FindPassDoc`, `cmd.AutoControl1.SaveRecord`, `web.ConfigPage`, `web.UpdateParam`.

## Бункерные / крановые весы (ScriptsBunkerScale, ScriptsCraneScale)

1. Масса из `evt.*` → округление `SetFormatPrecision(..., Massa_Precision)`.
2. Воркеры: `GetVarModTime` / `GetVarModFreq` + `MillisecondsBetween` / ISO8601 для стабилизации и автостарта.
3. FSM: `smt.*` только `Result := …`; эффекты в `sme.*` / `cmd.*`.
4. Операция: `Result_DocId := NewPackedGuid` → события → `SetRecord` / `PostMsg(...SaveRecord...)`.
5. Веб: `Request.Input` / `ToJSON` → `SetVarValue` или команда плагина.

Ключевые файлы: `wrk.StabilControl`, `wrk.AutoWeighingControl`, `sme.Empty_OnExit`, `cmd.*.SaveRecord`.

## Журнал отвесов (ScriptsJournal)

1. `OnBeforeInsert` / `OnBeforeUpdate`: `ExecProc` пересчёта → правка `NewDoc`.
2. `OnAfterInsert` / `OnAfterUpdate`: `SetLinkNT` / `AsyncExecProc` / при DELETED — `DeleteLinksNT`.
3. Подчинённый документ: `SetRecordNT('DocsJournal', …)` + `AsyncSetLinkNT` (SLAVE/MASTER).
4. Поиск пары: `GetRecords` с `NotEqual`, `Range`, `FirstRow`, `MaxRows`.
5. Оси: `NewMessage('AutoScale1.…')` + `SendMsg` из процедуры журнала.

Ключевые файлы: `OnAfterUpdate`, `Proc_SetSlaveDoc`, `Proc_FindUnfinishedWeighing`, `Proc_CalcNettoFromNumberTS`.

## Общие законы Конструктора

- Имя сообщения: `PluginName + '.Command'`.
- `SendMsg` — ждать ответ / `Msg.Result`; `PostMsg` — фон.
- Время в журналах — ISO8601.
- Среда: `CoreConfig`, `Request`, `Response`, `PluginName`, `CurrentState` (см. раздел глобальных переменных).
