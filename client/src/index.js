import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import Layout from "pages/Layout";
import Login from "pages/Login";
import history from "plugins/history";
import AuthRoute from "plugins/auth"

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <AuthRoute path="*" component={Layout} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
