import React, { Component } from "react";
import image from "assets/404.jpg";
import { withRouter } from "react-router-dom";

class F0F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 5,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((state, props) => ({
        counter: state.counter - 1,
      }));
    }, 1000);
    setTimeout(() => {
      this.props.history.push("/");
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <img src={image} alt="" />
        <h2>After { this.state.counter } s you will go to dashboard</h2>
      </div>
    );
  }
}

export default withRouter(F0F);
