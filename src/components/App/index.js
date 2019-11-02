import { connect } from 'react-redux';
import { App } from './App';
import { getDataFromApi } from '../../store';

const mapDispatch2Props = dispatch => ({
  getDataFromApi: () => dispatch(getDataFromApi()),
});

function mapState2Props(state) {
  return {
    exchangeRate: state.exchangeRate,
  };
}

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(App);

export {
  Enhanced as App,
};
