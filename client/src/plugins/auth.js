import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import history from "./history";
import API from "./axios";
import PropTypes from "prop-types";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirect: false,
    };
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      API.post("api-self/v1/auth", {}, { headers: { "Authorization": token } })
        .then(res => {
          if (res.data.success) {
            this.setState({
              loading: false,
              redirect: true,
            });
          } else {
            alert(res.data.error);
            localStorage.removeItem("token");
            history.push("/login");
          }
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) return <h1>loading...</h1>;
    return (
      <Route
        {...rest}
        render={props =>
          this.state.redirect ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

AuthRoute.propTypes = {
  component: PropTypes.any,
};

export default AuthRoute;
