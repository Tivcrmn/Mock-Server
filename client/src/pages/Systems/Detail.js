import React, { Component } from "react";
import { getSystemInfo, getSystem } from "store/system";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ApiTable from "pages/Api";

class Detail extends Component {
  componentDidMount() {
    const { getSystemInfo } = this.props;
    let id = this.props.history.location.pathname.slice(9);
    getSystemInfo(id);
  }

  render() {
    const { system } = this.props;
    return (
      <div>
        <h1>System Detail</h1>
        <div style={{ marginBottom: 20 }}>
          <label>SystemName: </label>
          <span >{ system.systemName }</span>
        </div>
        <ApiTable />
      </div>
    );
  }
}

Detail.propTypes = {
  getSystemInfo: PropTypes.func,
  system: PropTypes.object,
};

const mapStateToProps = state => ({
  system: getSystem(state),
});

export default withRouter(connect(mapStateToProps, { getSystemInfo })(Detail));
