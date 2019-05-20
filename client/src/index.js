import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import Layout from "pages/Layout";
import Login from "pages/Login";
import history from "plugins/history";
import AuthRoute from "plugins/auth";
import { Provider } from "react-redux";
import store from "store";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <AuthRoute path="*" component={Layout} />
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
