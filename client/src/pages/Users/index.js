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
import { connect } from "react-redux";
import PropTypes from "prop-types";
import history from "plugins/history";
import UserCreateDialog from "./UserCreateDialog";
import { cloneDeep } from "lodash";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = (e) => {
    this.setState({
      open: false,
    });
  }

  goUserdetail = (id) => {
    // TODO: bug. did not go to the detail page and need to refresh the page
    console.log(`go to user and is ${id}`);
    history.push(`/user/${id}`);
  }

  async deleteUser(id) {
    const { deleteUser, getUserList } = this.props;
    let res = await deleteUser(id);
    // TODO: using message component
    if (res.success) {
      alert("delete user successful");
      getUserList();
    } else {
      alert("delete user failed");
    }
  }

  async submit(e) {
    const { addUser, getUserList } = this.props;
    // const { username, password } = this.state;
    // TODO: need to validate the username and password
    let res = await addUser(this.state.user);
    // TODO: using message component
    if (res.success) {
      alert("add user successful");
      getUserList();
    } else {
      alert("add user failed");
    }
    this.handleClose();
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
                  <Button color="primary" onClick={this.handleClickOpen}>add user</Button>
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
                    <Button color="secondary" onClick={() => this.deleteUser(user._id)}>delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <UserCreateDialog
          data={this.state.user}
          open={this.state.open}
          handleClose={this.handleClose}
          handleInputChange={this.handleInputChange}
          submit={() => this.submit()}
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
};

const mapStateToProps = state => ({
  users: getUsers(state),
});

export default connect(mapStateToProps, { getUserList, addUser, deleteUser })(Users);
