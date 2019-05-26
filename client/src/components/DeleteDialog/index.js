import React, { Component } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class DeleteDialog extends Component {
  render() {
    const { open, handleClose, submit, message } = this.props;
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>
          <DialogContentText>{ message }</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={submit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteDialog;
