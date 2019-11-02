import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { ExchangeRatePage } from '../ExchangeRatePage';
import { ConvertPage } from '../ConvertPage';
import "./App.scss";

export class App extends React.Component {
  componentDidMount() {
    this.props.getDataFromApi();
  }

  render() {
    return (
      <div className="main">
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <NavLink to="/home" className="badge badge-warning">
                Home page
              </NavLink>
            </li>
            <li>
              <NavLink to="/convertMoney" className="badge badge-warning">
                Convert money
              </NavLink>
            </li>
          </ul>
        </nav>
          <Switch>
            <Route path="/home" exact component={ExchangeRatePage} />
            <Route path="/convertMoney" component={ConvertPage}/>}
            />
          </Switch>
      </div>
    );
  }
}
