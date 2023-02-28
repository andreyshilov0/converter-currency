import React from "react";

const Block = ({
  listCurrencies,
  value,
  onChangeCurrency,
  onChangeValue,
  currency,
  onChangeSelect,
}) => {
  return (
    <div className="Box">
      <div className="Box-selected">
        <div>
          <select
            className="Box-selector"
            onChange={(event) => {
              onChangeSelect(event.target.value);
            }}
            value={currency}
          >
            {Object.entries(listCurrencies).map((res, id) => {
              return (
                <option
                  onClick={() => onChangeCurrency(res)}
                  key={id}
                  value={res[0]}
                >
                  {res[0]}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="Box-inputed">
        <input
          className="Box-input"
          type="number"
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
        ></input>
      </div>
    </div>
  );
};

export default Block;
