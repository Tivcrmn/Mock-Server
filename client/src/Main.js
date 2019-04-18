import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Main.css";
import history from "./plugins/history"
import routes from "./plugins/routes";
import logo from "./assets/logo.svg";
import logout_logo from "./assets/logout.svg";

class Main extends Component {
  logout() {
    localStorage.removeItem("token");
    history.push("/login");
  }

  render() {
    return (
      <div className="Main">
        <Router>
          <div id="navigation">
            <img src={logo} className="Main-logo" alt="logo"/>
            <ul>
              <li>
                <Link className="link" to="/">Dashboard</Link>
              </li>
              <li>
                <Link className="link" to="/systems">Systems</Link>
              </li>
              <li>
                <Link className="link" to="/members">Members</Link>
              </li>
              <li>
                <Link className="link" to="/profile">Profile</Link>
              </li>
            </ul>
            <img className="logout"
                 src={logout_logo}
                 alt="logout_logo"
                 onClick={this.logout.bind(this)}/>
          </div>
          <div className="main">
            <Switch>
              {routes.map((route, index) => (
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
    )
  }
}

export default Main;
