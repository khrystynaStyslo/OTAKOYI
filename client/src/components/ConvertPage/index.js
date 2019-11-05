import { connect } from 'react-redux';
import { ConvertPage } from './ConvertPage';
import { getInputValue, convertMoney, getFirstSelectValue, getSecondSelectValue, clearInput, swapCurrency } from '../../store/actionCreators';

const mapDispatch2Props = dispatch => ({
  getInputValue: (event) => dispatch(getInputValue(event)),
  convertMoney: () => dispatch(convertMoney()),
  getFirstSelectValue: (event) => dispatch(getFirstSelectValue(event)),
  getSecondSelectValue: (event) => dispatch(getSecondSelectValue(event)),
  clearInput: () => dispatch(clearInput()),
  swapCurrency: () => dispatch(swapCurrency()),
});

function mapState2Props(state) {
  return {
    exchangeRate: state.exchangeRate,
    baseExchangeRate: state.baseExchangeRate,
    convertValue: state.convertValue,
    inputValue: state.inputValue,
    firstSelect: state.firstSelect,
    secondSelect: state.secondSelect,
    allSelected: state.allSelected,
  };
}

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(ConvertPage);

export {
  Enhanced as ConvertPage,
};
