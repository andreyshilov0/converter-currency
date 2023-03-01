import React, { useState, useEffect } from "react";
import Block from "./Block";
import "./css/App.css";
import { fixerAPI } from "./api/Apifixer";

const DEFAULT_FROM_CURRENCY = "USD";
const DEFAULT_TO_CURRENCY = "EUR";

function App() {
  const [rates, setRates] = useState({});
  const [symbols, setSymbols] = useState({});
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY);
  const [fromAmount, setFromAmount] = useState();
  const [toAmount, setToAmount] = useState();

  useEffect(() => {
    fixerAPI.getSymbols().then((json) => {
      setRates(json.symbols);
    });
    fixerAPI.getLatest(fromCurrency).then((json) => {
      setSymbols(json.rates);
      onChangeFromPrice(1);
    });
  }, []);

  useEffect(() => {
    onChangeFromPrice(fromAmount);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toAmount);
  }, [toCurrency]);

  const onChangeFromPrice = (value) => {
    const price = value * symbols[toCurrency];
    setToAmount(price.toFixed(3));
    setFromAmount(value);
  };
  const onChangeToPrice = (value) => {
    const result = (symbols[fromCurrency] / symbols[toCurrency]) * value;
    setFromAmount(result.toFixed(3));
    setToAmount(value);
  };
  const onChangeFromCurrency = (cur) => {
    setFromCurrency(cur);
  };
  const onChangeToCurrency = (cur) => {
    setToCurrency(cur);
  };
  const handleClick = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div>
      <h1 className="app-header">Конвертер валют</h1>
      <div className="app">
        <p className="text-input">Вы переводите из</p>
        <Block
          listCurrencies={rates}
          value={fromAmount}
          currency={fromCurrency}
          onChangeCurrency={onChangeFromCurrency}
          onChangeValue={onChangeFromPrice}
          onChangeSelect={(value) => setFromCurrency(value)}
        />
        <p className="text-symbol">в</p>
        <p className="symbol">=</p>
        <Block
          listCurrencies={rates}
          value={toAmount}
          currency={toCurrency}
          onChangeCurrency={onChangeToCurrency}
          onChangeValue={onChangeToPrice}
          onChangeSelect={(value) => setToCurrency(value)}
        />
      </div>
      <button onClick={handleClick} className="button">
        поменять валюты местами
      </button>
    </div>
  );
}

export default App;
