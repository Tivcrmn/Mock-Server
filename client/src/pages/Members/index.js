import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Loading from "components/Loading";
import { getList } from "store/actions/user";
import { connect } from "react-redux";

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      listsLoading: true,
      listsError: false,
      deleteLoading: true,
      deleteError: false,
    };
  }

  momentFormat = time => moment(time).format("MMMM Do YYYY, h:mm:ss a")

  componentDidMount() {
    this.props.getList();
  }

  deleteItem(id) {
    this.setState({
      listsLoading: true,
    }, () => {
      this.props.del(id);
      this.props.getList();
    });
  }

  render() {
    const { listsLoading, listsError, members } = this.props;
    return (
      <div>
        <h1>Members</h1>
        {
          listsLoading ? <Loading />
            : listsError ? <div>{listsError}</div>
              : <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>UserName</TableCell>
                      <TableCell>createTime</TableCell>
                      <TableCell>updateTime</TableCell>
                      <TableCell>isAdmin</TableCell>
                      <TableCell>
                        <Button color="primary">add member</Button>
                      </TableCell>
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
                        <TableCell>
                          <Button color="primary">detail</Button>
                          <Button color="secondary" onClick={() => this.deleteItem(member._id)}>delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  members: state.user.lists,
  listsLoading: state.user.listsLoading,
  listsError: state.user.listsError,
});

export default connect(mapStateToProps, { getList })(Members);
