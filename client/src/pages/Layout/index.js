import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from "plugins/history";
import routes from "plugins/routes";
import logo from "assets/logo.svg";
import Button from "@material-ui/core/Button";
import "./index.css";
import Alert from "components/Alert";

class Layout extends Component {
  logout = () => {
    history.push("/login");
  }

  render() {
    return (
      <div className="Main">
        <Router>
          <div id="navigation">
            <img src={logo} className="Main-logo" alt="logo" />
            <ul>
              {
                routes.filter(route => route.show).map((route, index) => (
                  <li key={index}>
                    <Button variant="contained" color="primary">
                      <Link to={route.path}>{route.name}</Link>
                    </Button>
                  </li>
                ))
              }

              <li>
                <Button variant="contained" onClick={this.logout}>
                 Logout
                </Button>
              </li>
            </ul>
          </div>
          <div className="main">
            <Alert />
            <Switch>
              {
                routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Layout;
