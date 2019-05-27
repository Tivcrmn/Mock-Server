import React, { Component } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { getShow, getMessage, hideAlert } from "store/alert";
import { connect } from "react-redux";

class Alert extends Component {
  handleClose = () => {
    const { hideAlert } = this.props;
    hideAlert();
  }

  render() {
    const { show, message } = this.props;
    return (
      <Dialog open={show} onClose={this.handleClose}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>
          <DialogContentText>{ message }</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  show: getShow(state),
  message: getMessage(state),
});

const mapDispatchToProps = {
  hideAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
