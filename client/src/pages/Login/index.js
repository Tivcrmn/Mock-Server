import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "store/auth";
import history from "plugins/history";
import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  handlInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  _login = (state) => {
    const { login } = this.props;
    login(state).then(r => {
      history.push("/");
    });
  }

  render() {
    return (
      <div className="login-page">
        <p>Mock Server</p>
        <input type="text" value={this.state.userName} name="userName" onChange={this.handlInputChange}></input>
        <input type="password" value={this.state.password} name="password" onChange={this.handlInputChange}></input>
        <button type="button" onClick={() => this._login(this.state)}>Login</button>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
};

export default connect(null, { login })(Login);
