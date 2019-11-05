import { connect } from 'react-redux';
import { App } from './App';
import { getDataFromApi, loadDataRequest } from '../../store/actionCreators';

const mapDispatch2Props = dispatch => ({
  getDataFromApi: () => dispatch(getDataFromApi()),
  loadDataRequest: () => dispatch(loadDataRequest()),
});

function mapState2Props(state) {
  return {
    baseExchangeRate: state.baseExchangeRate,
    isLoading: state.isLoading,
  };
}

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(App);

export {
  Enhanced as App,
};
