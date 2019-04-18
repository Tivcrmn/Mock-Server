import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import history from "./plugins/history";
import { AuthRoute } from "./plugins/auth"


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <AuthRoute path="*" component={Main} />
        </Switch>
      </Router>
    )
  }
}

export default App;
