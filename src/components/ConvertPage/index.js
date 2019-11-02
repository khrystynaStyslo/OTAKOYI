import { connect } from 'react-redux';
import { ConvertPage } from './ConvertPage';
import { getInputValue, convertMoney } from '../../store';

const mapDispatch2Props = dispatch => ({
  getInputValue: (event) => dispatch(getInputValue(event)),
  convertMoney: () => dispatch(convertMoney()),
});

function mapState2Props(state) {
  return {
    exchangeRate: state.exchangeRate,
    convertValue: state.convertValue,
    inputValue: state.inputValue,
  };
}

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(ConvertPage);

export {
  Enhanced as ConvertPage,
};
