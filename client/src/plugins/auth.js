import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { tokenAuth, getRedirect } from "store/auth";
import { connect } from "react-redux";
import Loading from "components/Loading";

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
      this.props.history.push("/login");
    }
  }

  render() {
    const { loading } = this.state;
    const { redirect, component: Component, ...rest } = this.props;
    if (loading) return <Loading />;
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

const mapStateToProps = state => ({
  redirect: getRedirect(state),
});

export default withRouter(connect(mapStateToProps, { tokenAuth })(AuthRoute));
