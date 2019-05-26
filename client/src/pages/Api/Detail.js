import React, { Component } from "react";
import { getApiInfo, getApi } from "store/api";
import { getSystem } from "store/system";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Detail extends Component {
  componentDidMount() {
    const { getApiInfo, systemId } = this.props;
    const apiId = this.props.history.location.pathname.split("/")[2];
    getApiInfo(systemId, apiId);
  }

  render() {
    const { api } = this.props;
    return (
      <div>
        <h1>API Detail</h1>
        <div>
          <div>
            <label>Url: </label>
            <span >{ api.url }</span>
          </div>
          <div>
            <label>Method: </label>
            <span >{ api.method }</span>
          </div>
          <div>
            <label>Version: </label>
            <span >{ api.version }</span>
          </div>
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  getApiInfo: PropTypes.func,
  api: PropTypes.object,
};

const mapStateToProps = state => ({
  api: getApi(state),
  systemId: getSystem(state)._id,
});

export default withRouter(connect(mapStateToProps, { getApiInfo })(Detail));
