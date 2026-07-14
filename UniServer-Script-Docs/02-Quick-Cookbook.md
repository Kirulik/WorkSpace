# Cookbook: типовые сценарии скриптов UniServer

Краткие рецепты. Полные сигнатуры — в [01-Script-API-Reference.md](01-Script-API-Reference.md).

---

## 1. Отдать HTML-страницу плагина

```pascal
var
  LScope: Variant;
begin
  LScope := _Obj();
  LScope.PluginIndex := PluginIndex;
  LScope.PluginName := PluginName;
  LScope.PluginCaption := PluginCaption;
  LScope.PageTitle := PluginName;
  Response.ReturnPage('Panel.html', LScope);
end
```

**Цепочка:** браузер → `/core/plugins/ИмяПлагина/ИмяСтраницы` → скрипт Pages → шаблон в `Views/`.

---

## 2. API-кнопка: поставить флаг → автомат сделает переход

```pascal
const
  HTTP_SUCCESS = 200;
  HTTP_ERROR = 500;
begin
  if CurrentState = 'Idle' then begin
    fActivate := true;
    Response.ReturnText('OK', 'text/plain', HTTP_SUCCESS);
  end else
    Response.ReturnText('Нельзя', 'text/plain', HTTP_ERROR);
end
```

Переход в автомате:

```pascal
begin
  Result := fActivate;
end
```

Фронт после POST опрашивает `/Parameters` и видит новый `CurrentState`.

---

## 3. Принять JSON с формы и записать в переменные

```pascal
var
  LData: Variant;
  i: Integer;
  LName: String;
begin
  LData := _Json(Request.InputStr('')); // или как отдаёт ваш фронт
  // Часто удобнее явный список полей:
  SetVarValue('Result_FULL_NUMB_TS', Request.InputStr('Result_FULL_NUMB_TS'));
  Response.ReturnText('OK', 'text/plain', 200);
end
```

(Точный способ чтения тела зависит от того, как страница объявлена и что шлёт jQuery/`fetch`.)

---

## 4. Синхронный вызов другого плагина

```pascal
var
  LParam, LMsg, LRes: Variant;
begin
  LParam := _Obj();
  LParam.Field := 'value';

  LMsg := NewMessage('AutoScale1.SetUpdateFieldWeighingResult', _ToStr(LParam));
  LRes := SendMsg(LMsg, 1000);

  if VarIsEmptyOrNull(LRes) then
    DebugLog('нет ответа от AutoScale1')
  else
    DebugLog(LRes);
end
```

---

## 5. Асинхронный вызов (печать, фоновая запись)

```pascal
begin
  PostMsg(NewMessage('FastReport.PrintReport', _ToStr(LParam)));
  Response.ReturnText('OK', 'text/plain', 200);
end
```

---

## 6. Выборка из справочника / журнала

```pascal
var
  LFilter, LArgs, LRows: Variant;
begin
  LFilter := _Obj();
  LFilter.NUMB_TS := 'А123АА';

  LArgs := _ObjEx(['Filter', LFilter, 'MaxRows', 50]);
  LRows := GetRecords('TransportTable', LArgs);

  if IsEmpty(LRows) then
    Response.ReturnText('[]', 'application/json', 200)
  else
    Response.ReturnText(_ToStr(LRows), 'application/json', 200);
end
```

---

## 7. Запись в журнал

```pascal
var
  LDoc: Variant;
  LCode: String;
begin
  LDoc := _Obj();
  LDoc.CODE := '';
  LDoc.NAME := 'Новая запись';
  LCode := SetRecord('MyJournal', LDoc);
  DebugLog('CODE=' + LCode);
end
```

Без ожидания ответа:

```pascal
AsyncSetRecord('MyJournal', LDoc);
```

---

## 8. Контроль «живости» переменной (worker)

```pascal
var
  LFreq: Double;
begin
  LFreq := SetFormatPrecision(GetVarModFreq('AutoScaleMassa'), 1);
  fErrorConnect := (LFreq = 0.0);
end
```

---

## 9. Сборка сложного JSON

```pascal
var
  LRoot, LItem, LArr: Variant;
begin
  LRoot := _Obj();
  LRoot.Title := 'Отчёт';
  LArr := _Arr();

  LItem := _ObjEx(['Name', 'A', 'Value', 1.5]);
  LArr.Add(LItem);

  LRoot.Items := LArr;
  DebugLog(_ToStr(LRoot, True));
end
```

---

## 10. Работа со временем

```pascal
var
  t0, t1: TDateTime;
  sec: Integer;
begin
  t0 := NowPrecise;
  // …
  t1 := NowPrecise;
  sec := SecondsBetween(t1, t0);
  DebugLog('Прошло сек: ' + _ToStr(sec));
  DebugLog(DateTimeToIso8601(t1));
end
```

---

## 11. Округление массы под дискрет весов

```pascal
massa := SetFormatRoundFromDiscret(RawMassa, 2, 0.02);
```

---

## Чек-лист отладки

1. `DebugLog(...)` — смотреть лог UniServer.  
2. Кнопка **Компилировать** в SMC — ловит синтаксис до сохранения.  
3. Страница мониторинга параметров плагина (`Default`) — значения глобалов в реальном времени.  
4. Для `SendMsg` — проверять таймаут и `VarIsEmptyOrNull`.  
5. Для журналов — имя журнала должно совпадать с установленным на объекте плагином журнала.
