import React, { Component } from "react";
import { getUserInfo, getUser } from "store/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Detail extends Component {
  componentDidMount() {
    const { getUserInfo } = this.props;
    let id = this.props.history.location.pathname.slice(6);
    getUserInfo(id);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>User Detail</h1>
        <label>UserName: </label>
        <span>{ user.userName }</span>
      </div>
    );
  }
}

Detail.propTypes = {
  getUserInfo: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

export default withRouter(connect(mapStateToProps, { getUserInfo })(Detail));
