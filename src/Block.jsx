import React from "react";

function Block({
  listCurrencies,
  value,
  onChangeCurrency,
  onChangeValue,
  currency,
  onChangeSelect,
}) {
  return (
    <div className="box">
      <div className="box-selected">
        <div>
          <select
            className="box-selector"
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
      <div className="box-inputed">
        <input
          className="box-input"
          type="number"
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
}

export default Block;
