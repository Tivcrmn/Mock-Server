import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { getUsers, getUserList } from "store/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Users extends Component {
  momentFormat = time => moment(time).format("MMMM Do YYYY, h:mm:ss a")

  componentDidMount() {
    const { getUserList } = this.props;
    getUserList();
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
                  <Button color="primary">add user</Button>
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
                    <Button color="primary">detail</Button>
                    <Button color="secondary">delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

Users.propTypes = {
  getUserList: PropTypes.func,
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  users: getUsers(state),
});

export default connect(mapStateToProps, { getUserList })(Users);
