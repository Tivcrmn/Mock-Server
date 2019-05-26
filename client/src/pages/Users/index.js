import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { getUsers, getUserList, addUser, deleteUser } from "store/user";
import { showAlert } from "store/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateDialog from "./CreateDialog";
import DeleteDialog from "components/DeleteDialog";
import { cloneDeep } from "lodash";
import { withRouter } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateDialog: false,
      openDeleteDialog: false,
      deleteId: "",
      user: {
        userName: "",
        password: "",
      },
    };
  }

  momentFormat = time => moment(time).format("MMMM Do YYYY, h:mm:ss a")

  componentDidMount() {
    const { getUserList } = this.props;
    getUserList();
  }

  handleCreateClickOpen = () => {
    this.setState({
      openCreateDialog: true,
    });
  }

  handleCreateClickClose = () => {
    this.setState({
      openCreateDialog: false,
    });
  }

  handleDeleteClickOpen = (id) => {
    this.setState({
      openDeleteDialog: true,
      deleteId: id,
    });
  }

  handleDeleteClickClose = () => {
    this.setState({
      openDeleteDialog: false,
      deleteId: "",
    });
  }

  goUserdetail = (id) => {
    this.props.history.push(`/user/${id}`);
  }

  async deleteUser(id) {
    const { deleteUser, getUserList, showAlert } = this.props;
    this.setState({
      openDeleteDialog: false,
      deleteId: "",
    });
    let res = await deleteUser(id);
    if (res.success) {
      showAlert("delete user successfully");
      getUserList();
    } else {
      showAlert("delete user failed");
    }
  }

  async submit(e) {
    const { addUser, getUserList, showAlert } = this.props;
    // const { username, password } = this.state;
    // TODO: need to validate the username and password
    let res = await addUser(this.state.user);
    this.setState({
      user: {
        userName: "",
        password: "",
      },
    });
    if (res.success) {
      showAlert("add user successful");
      getUserList();
    } else {
      showAlert("add user failed");
    }
    this.handleCreateClickClose();
  }

  handleInputChange = (e) => {
    let user = cloneDeep(this.state.user);
    user[e.target.name] = e.target.value;
    this.setState({ user });
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>Users</h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>UserName</TableCell>
                <TableCell>createTime</TableCell>
                <TableCell>updateTime</TableCell>
                <TableCell>isAdmin</TableCell>
                <TableCell>
                  <Button color="primary" onClick={this.handleCreateClickOpen}>add user</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {user.userName}
                  </TableCell>
                  <TableCell>{this.momentFormat(user.createTime)}</TableCell>
                  <TableCell>{this.momentFormat(user.updateTime)}</TableCell>
                  <TableCell>{user.isAdmin + ""}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => this.goUserdetail(user._id)}>detail</Button>
                    <Button color="secondary" onClick={() => this.handleDeleteClickOpen(user._id)}>delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <CreateDialog
          data={this.state.user}
          open={this.state.openCreateDialog}
          handleClose={this.handleCreateClickClose}
          handleInputChange={this.handleInputChange}
          submit={() => this.submit()}
        />

        <DeleteDialog
          open={this.state.openDeleteDialog}
          handleClose={this.handleDeleteClickClose}
          submit={() => this.deleteUser(this.state.deleteId)}
          message="Do you want to delete the user?"
        />
      </div>
    );
  }
}

Users.propTypes = {
  getUserList: PropTypes.func,
  addUser: PropTypes.func,
  deleteUser: PropTypes.func,
  users: PropTypes.array,
  showAlert: PropTypes.func,
};

const mapStateToProps = state => ({
  users: getUsers(state),
});

export default withRouter(connect(mapStateToProps, { getUserList, addUser, deleteUser, showAlert })(Users));
