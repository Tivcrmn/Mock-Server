import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "store/auth";
import history from "plugins/history";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
        <h2>Mock Server</h2>
        <div>
          <TextField
            label="userName"
            value={this.state.userName}
            name="userName"
            style={{ width: 200 }}
            onChange={this.handlInputChange}
          />
        </div>
        <div>
          <TextField
            label="password"
            value={this.state.password}
            name="password"
            type="password"
            style={{ width: 200 }}
            onChange={this.handlInputChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this._login(this.state)}
          style={{ width: 200, marginTop: 10 }}
        >
          Login
        </Button>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
};

export default connect(null, { login })(Login);
