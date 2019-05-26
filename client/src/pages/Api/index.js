import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { showAlert } from "store/alert";
import { getApiList, getApis, deleteApi, addApi, updateApi } from "store/api";
import { getSystem } from "store/system";
import { getCurrentUser } from "store/auth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import DeleteDialog from "components/DeleteDialog";
import { cloneDeep } from "lodash";
import CreateDialog from "./CreateDialog";

class Api extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateDialog: false,
      type: "create",
      openDeleteDialog: false,
      deleteSystemId: "",
      deleteApiId: "",
      api: {
        url: "",
        adminId: "",
        method: "",
        systemId: "",
        query: [],
        fields: [],
        version: "",
        repeat: "",
      },
    };
  }

  componentDidMount() {
    const { getApiList } = this.props;
    const systemId = this.props.history.location.pathname.slice(9);
    getApiList(systemId);
  }

  momentFormat = time => moment(time).format("MMMM Do YYYY, h:mm:ss a")

  handleCreateClickOpen = (type, api) => {
    if (!api) api = cloneDeep(this.state.api);
    this.setState({
      openCreateDialog: true,
      type,
      api,
    });
  }

  handleCreateClickClose = () => {
    this.setState({
      openCreateDialog: false,
      api: {
        url: "",
        adminId: "",
        method: "",
        systemId: "",
        query: [],
        fields: [],
        version: "",
        repeat: "",
      },
    });
  }

  handleDeleteClickOpen = (systemId, apiId) => {
    this.setState({
      openDeleteDialog: true,
      deleteSystemId: systemId,
      deleteApiId: apiId,
    });
  }

  handleDeleteClickClose = () => {
    this.setState({
      openDeleteDialog: false,
      deleteSystemId: "",
      deleteApiId: "",
    });
  }

  async deleteApi(systemId, apiId) {
    const { deleteApi, getApiList, showAlert } = this.props;
    this.setState({
      openDeleteDialog: false,
      deleteSystemId: "",
      deleteApiId: "",
    });
    let res = await deleteApi(systemId, apiId);
    if (res.success) {
      showAlert("delete api successfully");
      getApiList(systemId);
    } else {
      showAlert("delete api failed");
    }
  }

  async submit(e) {
    const { addApi, getApiList, showAlert, systemId, adminId, updateApi } = this.props;
    let res = null;
    if (this.state.type === "create") {
      res = await addApi(systemId, { ...this.state.api, systemId, adminId });
    } else {
      res = await updateApi(this.state.api);
    }
    if (res.success) {
      showAlert(`${this.state.type} api successful`);
      getApiList(systemId);
    } else {
      showAlert(`${this.state.type} api failed`);
    }
    this.handleCreateClickClose();
  }

  handleInputChange = (e) => {
    let api = cloneDeep(this.state.api);
    api[e.target.name] = e.target.value;
    this.setState({ api });
  }

  goDetail = (apiId) => {
    this.props.history.push(`/api/${apiId}`);
  }

  render() {
    const { apis } = this.props;
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>URL name</TableCell>
                <TableCell>createTime</TableCell>
                <TableCell>method</TableCell>
                <TableCell>version</TableCell>
                <TableCell align="center">
                  <Button color="primary" onClick={() => this.handleCreateClickOpen("create")}>add api</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apis.map(api => (
                <TableRow key={api._id}>
                  <TableCell component="th" scope="row">
                    {api.url}
                  </TableCell>
                  <TableCell>{this.momentFormat(api.createTime)}</TableCell>
                  <TableCell>{api.method}</TableCell>
                  <TableCell>{api.version}</TableCell>
                  <TableCell>
                    <Button color="default" onClick={() => this.handleCreateClickOpen("edit", api)}>edit</Button>
                    <Button color="primary" onClick={() => this.goDetail(api._id)}>detail</Button>
                    <Button color="secondary" onClick={() => this.handleDeleteClickOpen(api.systemId, api._id)}>delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <CreateDialog
          type={this.state.type}
          data={this.state.api}
          open={this.state.openCreateDialog}
          handleClose={this.handleCreateClickClose}
          handleInputChange={this.handleInputChange}
          submit={() => this.submit()}
        />

        <DeleteDialog
          open={this.state.openDeleteDialog}
          handleClose={this.handleDeleteClickClose}
          submit={() => this.deleteApi(this.state.deleteSystemId, this.state.deleteApiId)}
          message="Do you want to delete the api?"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apis: getApis(state),
  systemId: getSystem(state)._id,
  adminId: getCurrentUser(state)._id,
});

export default withRouter(connect(mapStateToProps, { getApiList, showAlert, deleteApi, addApi, updateApi })(Api));
