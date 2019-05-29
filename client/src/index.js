import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "pages/Layout";
import Login from "pages/Login";
import AuthRoute from "plugins/auth";
import { Provider } from "react-redux";
import store from "store";
import Alert from "components/Alert";
import "./index.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <AuthRoute path="*" component={Layout} />
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
