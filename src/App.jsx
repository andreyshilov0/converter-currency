import React, { useState, useEffect } from "react";
import Block from "./Block";
import "./css/App.css";
import { fixerAPI } from "./api/Apifixer";

function App() {
  const [rates, setRates] = useState({});
  const [symbols, setSymbols] = useState({});
  const [DEFAULT_FROM_CURRENCY, SET_DEFAULT_FROM_CURRENCY] = useState("USD");
  const [DEFAULT_TO_CURRENCY, SET_DEFAULT_TO_CURRENCY] = useState("EUR");
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, SetToAmount] = useState(1);

  useEffect(() => {
    fixerAPI.getSymbols().then((json) => {
      setRates(json.symbols);
    });
    fixerAPI.getLatest(DEFAULT_FROM_CURRENCY).then((json) => {
      setSymbols(json.rates);
      onChangeFromPrice(1);
    });
  }, []);

  useEffect(() => {
    onChangeFromPrice(fromAmount);
  }, [DEFAULT_FROM_CURRENCY]);

  useEffect(() => {
    onChangeToPrice(toAmount);
  }, [DEFAULT_TO_CURRENCY]);

  const onChangeFromPrice = (value) => {
    const price = value * symbols[DEFAULT_TO_CURRENCY];
    SetToAmount(price.toFixed(3));
    setFromAmount(value);
  };
  const onChangeToPrice = (value) => {
    const result =
      (symbols[DEFAULT_FROM_CURRENCY] / symbols[DEFAULT_TO_CURRENCY]) * value;
    setFromAmount(result.toFixed(3));
    SetToAmount(value);
  };
  const onChangeFromCurrency = (cur) => {
    SET_DEFAULT_FROM_CURRENCY(cur);
  };
  const handleClick = () => {
    SET_DEFAULT_FROM_CURRENCY(DEFAULT_TO_CURRENCY);
    SET_DEFAULT_TO_CURRENCY(DEFAULT_FROM_CURRENCY);
    setFromAmount(toAmount);
    SetToAmount(fromAmount);
  };

  return (
    <div>
      <h1 className="app-header">Конвертер валют</h1>
      <div className="app">
        <p className="text-input">Вы переводите из</p>
        <Block
          listCurrencies={rates}
          value={fromAmount}
          currency={DEFAULT_FROM_CURRENCY}
          onChangeCurrency={onChangeFromCurrency}
          onChangeValue={onChangeFromPrice}
          onChangeSelect={(value) => SET_DEFAULT_FROM_CURRENCY(value)}
        />
        <p className="text-symbol">в</p>
        <p className="symbol">=</p>
        <Block
          listCurrencies={rates}
          value={toAmount}
          currency={DEFAULT_TO_CURRENCY}
          onChangeCurrency={SET_DEFAULT_TO_CURRENCY}
          onChangeValue={onChangeToPrice}
          onChangeSelect={(value) => SET_DEFAULT_TO_CURRENCY(value)}
        />
      </div>
      <button onClick={handleClick} className="button">
        поменять валюты местами
      </button>
    </div>
  );
}

export default App;
