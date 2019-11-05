import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { ExchangeRatePage } from '../ExchangeRatePage';
import { ConvertPage } from '../ConvertPage';
import "./App.scss";

export class App extends React.Component {
  componentDidMount() {
    this.props.getDataFromApi();
    this.props.loadDataRequest();
  }

  render() {
    const { isLoading, baseExchangeRate } = this.props;
    return (
      <div className="main">
        {isLoading && baseExchangeRate.length === 0 && (
          <div className="spinner spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {baseExchangeRate.length !== 0 && (
          <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <NavLink to="/" className="badge badge-light">
                Exchange rate
              </NavLink>
            </li>
            <li>
              <NavLink to="/convertMoney" className="badge badge-light">
                Convert money
              </NavLink>
            </li>
          </ul>
        </nav>
        )}
          <Switch>
            <Route path="/" exact component={ExchangeRatePage} />
            <Route path="/convertMoney" component={ConvertPage}/>}
            />
          </Switch>
      </div>
    );
  }
}
