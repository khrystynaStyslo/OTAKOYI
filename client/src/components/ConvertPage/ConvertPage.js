import React from "react";
import './ConvertPage.scss';

export const ConvertPage = ({
  getInputValue,
  clearInput,
  inputValue,
  convertValue,
  convertMoney,
  exchangeRate,
  baseExchangeRate,
  firstSelect,
  secondSelect,
  getFirstSelectValue,
  getSecondSelectValue,
  swapCurrency,
  allSelected
}) => {
  return (
    <>
      {baseExchangeRate.length !== 0 && (
        <div className="convert_page">
          <select
            onChange={event => getFirstSelectValue(event)}
            value={firstSelect}
            className="select"
          >
            <option disabled selected>
              Choose currency
            </option>
            {baseExchangeRate.length+1 === exchangeRate.length &&
            exchangeRate.map(item => (
              <option value={item.ccy} key={item.ccy}>
                {item.ccy}
              </option>
            ))}
            {baseExchangeRate !== exchangeRate && exchangeRate.map(
              item =>
                item.currency && (
                  <option value={item.currency} key={item.currency}>
                    {item.currency}
                  </option>
                )
            )}
          </select>
          <i className="fas fa-arrows-alt-h" onClick={swapCurrency}/>
          <select
            className="select"
            onChange={event => getSecondSelectValue(event)}
            value={secondSelect}
          >
            <option disabled selected>
              Choose currency
            </option>
            {baseExchangeRate.length+1 === exchangeRate.length &&
            exchangeRate.map(item => (
              <option value={item.ccy} key={item.ccy}>
                {item.ccy}
              </option>
            ))}
            {baseExchangeRate !== exchangeRate && exchangeRate.map(
              item =>
                item.currency && (
                  <option value={item.currency} key={item.currency}>
                    {item.currency}
                  </option>
                )
            )}
          </select>
          <input
            type="text"
            placeholder="Input your value"
            onChange={getInputValue}
            onClick={clearInput}
            value={inputValue}
            className="input_value"
          /> <br/>
          <input
            type="text"
            disabled
            placeholder="Converted value"
            value={convertValue || ""}
            className="input_value"
          /> <br/>
          <button onClick={convertMoney} disabled={!allSelected} className="badge badge-danger btn_convert">Convert</button>
          {firstSelect && secondSelect && (
            <>
              {baseExchangeRate.length+1 === exchangeRate.length && (
                <>
                  <h4>{firstSelect}:{exchangeRate.find(elem => elem.ccy === firstSelect).sale}</h4>
                  <h4>{secondSelect}:{exchangeRate.find(elem => elem.ccy === secondSelect).buy}</h4>
                </>
              )}
              {exchangeRate.length > 5 && (
                <>
                  <h3>Archive exchange rate</h3>
                  <h4>{firstSelect}:{exchangeRate.find(elem => elem.currency === firstSelect).saleRateNB}</h4>
                  <h4>{secondSelect}:{exchangeRate.find(elem => elem.currency === secondSelect).purchaseRateNB}</h4>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
