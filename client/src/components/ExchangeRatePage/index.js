import { connect } from 'react-redux';
import { ExchangeRatePage } from './ExchangeRatePage';
import { getInputDate, getArchiveDataFromApi } from '../../store/actionCreators';

const mapDispatch2Props = dispatch => ({
  getArchiveDataFromApi: (value) => dispatch(getArchiveDataFromApi(value)),
  getInputDate: (value) => dispatch(getInputDate(value)),
});

function mapState2Props(state) {
  return {
    baseExchangeRate: state.baseExchangeRate,
    exchangeRate: state.exchangeRate,
    date: state.date,
    isLoading: state.isLoading,
    isLoaded: state.isLoaded,
    isLoadingArchive: state.isLoadingArchive,
    isLoadedArchive: state.isLoadedArchive,
    hasError: state.hasError,
  };
}

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(ExchangeRatePage);

export {
  Enhanced as ExchangeRatePage,
};
