import React, { Component } from "react";
import history from "../plugins/history";
import axios from "axios";
import "./index.css";

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleUserNameChange(e) {
    this.setState({
      userName: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  login() {
    axios.post("http://127.0.0.1:5000/api-self/v1/login", {...this.state})
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.data.token);
          history.push("/");
        } else {
          alert(res.data.error);
        }
      })
  }

  render() {
    return (
      <div className="login-page">
        <p>Mock Server</p>
        <input type="text" value={this.state.userName} onChange={this.handleUserNameChange}></input>
        <input type="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
        <button type="button" onClick={this.login}>Login</button>
      </div>
    )
  }
}

export default Login;
