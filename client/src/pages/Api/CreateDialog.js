import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class CreateDialog extends Component {
  render() {
    const { open, data, handleClose, submit, handleInputChange } = this.props;
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Url"
            name="url"
            value={data.url}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            margin="dense"
            label="version"
            name="version"
            value={data.version}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="repeat"
            name="repeat"
            value={data.repeat}
            onChange={handleInputChange}
            fullWidth
          />

          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Method</InputLabel>
            <Select
              value={data.method}
              onChange={handleInputChange}
              inputProps={{
                name: "method",
              }}
              fullWidth
            >
              <MenuItem value={"get"}>GET</MenuItem>
              <MenuItem value={"post"}>POST</MenuItem>
              <MenuItem value={"put"}>PUT</MenuItem>
              <MenuItem value={"delete"}>DELETE</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreateDialog;
