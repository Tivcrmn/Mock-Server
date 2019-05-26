import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import routes from "plugins/routes";
import logo from "assets/logo.svg";
import Button from "@material-ui/core/Button";
import "./index.css";

class Layout extends Component {
  logout = () => {
    this.props.history.push("/login");
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

export default withRouter(Layout);
