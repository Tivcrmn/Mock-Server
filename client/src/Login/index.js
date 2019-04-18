import React, { Component } from "react";
import history from "../plugins/history";
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
  componentWillMount() {
    let token = localStorage.getItem("token");
    if (token) {
      console.log("the token is in browser");
      history.push("/");
    }
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
    let {userName, password} = this.state;
    localStorage.setItem("token", `${userName} ${password}`);
    history.push("/");
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
