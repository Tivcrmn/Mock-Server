import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import history from "./history";
import { tokenAuth, getRedirect } from "store/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const { tokenAuth } = this.props;
      await tokenAuth(token);
      this.setState({
        loading: false,
      });
    } else {
      history.push("/login");
    }
  }

  render() {
    const { loading } = this.state;
    const { redirect, component: Component, ...rest } = this.props;
    if (loading) return <h1>loading</h1>;
    return (
      <Route
        {...rest}
        render={props =>
          redirect ? (
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
  tokenAuth: PropTypes.func,
  redirect: PropTypes.bool,
  getDoShowLoading: PropTypes.func,
};

const mapStateToProps = state => ({
  redirect: getRedirect(state),
});

export default connect(mapStateToProps, { tokenAuth })(AuthRoute);
