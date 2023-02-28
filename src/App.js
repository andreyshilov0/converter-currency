import React, { useState, useEffect } from "react";
import Block from "./Block";

import "./css/App.css";

function App() {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };
  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };
  const onChangeFromCurrency = (cur) => {
    setFromCurrency(cur);
    onChangeFromPrice(fromPrice);
    console.log(fromPrice);
  };
  const handleClick = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromPrice(toPrice);
    setToPrice(fromPrice);
  };

  return (
    <div>
      <h1 className="App-header">Конвертер валют</h1>
      <div className="App">
        <p className="Text-input">Вы переводите из</p>
        <Block
          listCurrencies={rates}
          value={fromPrice}
          currency={fromCurrency}
          onChangeCurrency={onChangeFromCurrency}
          onChangeValue={onChangeFromPrice}
          onChangeSelect={(value) => setFromCurrency(value)}
        />
        <div className="Text-symbol">в</div>
        <div className="Symbol">=</div>
        <Block
          listCurrencies={rates}
          value={toPrice}
          currency={toCurrency}
          onChangeCurrency={setToCurrency}
          onChangeValue={onChangeToPrice}
          onChangeSelect={(value) => setToCurrency(value)}
        />
      </div>
      <div className="Button">
        {" "}
        <u onClick={handleClick} className="Button">
          поменять валюты местами
        </u>
      </div>
    </div>
  );
}

export default App;
