import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirect: false
    }
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.post("http://127.0.0.1:5000/api-self/v1/auth", {}, {headers: {"Authorization": token}})
        .then(res => {
          if (res.data.success) {
            this.setState({
              loading: false,
              redirect: true
            })
          } else {
            alert(res.data.error);
          }
        })
    } else {
      this.setState({
        loading: false
      })
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
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

export default AuthRoute;
