import React, { Component } from "react";
import { getSystemInfo, getSystem } from "store/system";
import { connect } from "react-redux";
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

const mapStateToProps = state => ({
  system: getSystem(state),
});

const mapDispatchToProps = {
  getSystemInfo,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
