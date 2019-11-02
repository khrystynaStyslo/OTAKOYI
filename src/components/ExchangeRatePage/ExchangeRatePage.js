import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function getDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return (dd + '.' + mm + '.' + yyyy);
}

export const ExchangeRatePage = ({ baseExchangeRate, date, getInputDate, exchangeRate, getArchiveDataFromApi }) => {
  return (
    <>
    <table className="table table-striped">
      <thead>
      <tr>
        <th scope="col">Currency code</th>
        <th scope="col">Buying rate</th>
        <th scope="col">Sales rate</th>
      </tr>
      </thead>
      <tbody>
      {baseExchangeRate.map(item => (
        <tr key={item.ccy}>
          <th scope="row">{item.ccy}</th>
          <td>{item.buy}</td>
          <td>{item.sale}</td>
        </tr>
      ))}

      </tbody>
    </table>
      <div>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={date}
          onChange={(date) => getInputDate(date)}
          onSelect={(date) => getArchiveDataFromApi(getDate(date))}
          minDate={new Date("2015/01/01")}
          maxDate={new Date()}
          showYearDropdown
          dateFormatCalendar="MMMM"
          yearDropdownItemNumber={5}
          scrollableYearDropdown
        />
        {exchangeRate.length !== 0 && (
          <div>
            <table className="table table-striped">
              <thead>
              <tr>
                <th scope="col">Currency code</th>
                <th scope="col">Buying rate</th>
                <th scope="col">Sales rate</th>
              </tr>
              </thead>
              <tbody>
              {exchangeRate.map(item =>
                item.currency && (
                  <tr key={item.currency}>
                  <th scope="row">{item.currency}</th>
                  <td>{item.purchaseRateNB}</td>
                  <td>{item.saleRateNB}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </>
  )
};
