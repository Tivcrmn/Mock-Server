import React, { Component } from "react";
import API from "plugins/axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";
import Loading from "components/Loading";

class Members extends Component{
  state = {
    members: [],
    loading: true
  }

  momentFormat = time => moment(time).format("MMMM Do YYYY, h:mm:ss a")

  componentDidMount() {
    API.get("api-self/v1/user")
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false,
            members: res.data.data
          })
        } else {
          alert(res.data.error);
        }
      })
  }
  render() {
    const {loading, members} = this.state;
    return (
      <div>
        <h1>Members</h1>
        {
          loading ? <Loading /> :
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>UserName</TableCell>
                  <TableCell>createTime</TableCell>
                  <TableCell>updateTime</TableCell>
                  <TableCell>isAdmin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map(member => (
                  <TableRow key={member._id}>
                    <TableCell component="th" scope="row">
                      {member.userName}
                    </TableCell>
                    <TableCell>{this.momentFormat(member.createTime)}</TableCell>
                    <TableCell>{this.momentFormat(member.updateTime)}</TableCell>
                    <TableCell>{member.isAdmin + ""}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        }
      </div>
    )
  }
}

export default Members;
