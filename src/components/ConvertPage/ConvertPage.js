import React from 'react';

export const ConvertPage = ({getInputValue, convertValue, convertMoney}) => {
  return (
    <>
      USD:<input type="text" placeholder="Input your value" onChange={getInputValue} />
      UAN:<input type="text" disabled placeholder="Converted value" value={convertValue || ''}/>
      <button onClick={convertMoney}>Convert</button>
    </>
  )
};
