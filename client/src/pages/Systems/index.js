import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { getSystems, getSystemList, addSystem, deleteSystem, updateSystem } from "store/system";
import { withStyles } from "@material-ui/core/styles";
import { getCurrentUser } from "store/auth";
import { showAlert } from "store/alert";
import { connect } from "react-redux";
import CreateDialog from "./CreateDialog";
import DeleteDialog from "components/DeleteDialog";
import { cloneDeep } from "lodash";
import { withRouter } from "react-router-dom";

const styles = theme => {
  return {
    grid: {
      paddingLeft: `${theme.spacing.unit * 3}px!important`,
      paddingBottom: `${theme.spacing.unit * 2}px!important`,
      color: theme.palette.text.secondary,
    },
  };
};

class Systems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateDialog: false,
      type: "create",
      openDeleteDialog: false,
      deleteId: "",
      system: {
        systemName: "",
      },
    };
  }

  componentDidMount() {
    const { getSystemList } = this.props;
    getSystemList();
  }

  handleCreateClickOpen = (type, system) => {
    if (!system) system = cloneDeep(this.state.system);
    this.setState({
      openCreateDialog: true,
      system,
      type,
    });
  }

  handleCreateClickClose = () => {
    this.setState({
      openCreateDialog: false,
      system: {
        systemName: "",
      },
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

  handleInputChange = (e) => {
    let system = cloneDeep(this.state.system);
    system[e.target.name] = e.target.value;
    this.setState({ system });
  }

  goDetail = (id) => {
    this.props.history.push(`/systems/${id}`);
  }

  async deleteSystem(id) {
    const { deleteSystem, getSystemList, showAlert } = this.props;
    this.setState({
      openDeleteDialog: false,
      deleteId: "",
    });
    let res = await deleteSystem(id);
    if (res.success) {
      showAlert("delete system successfully");
      getSystemList();
    } else {
      showAlert("delete system failed");
    }
  }

  async submit(e) {
    const { addSystem, getSystemList, showAlert, currentUserId, updateSystem } = this.props;
    let res = null;
    if (this.state.type === "create") {
      res = await addSystem({ adminId: currentUserId, ...this.state.system });
    } else {
      res = await updateSystem(this.state.system);
    }
    if (res.success) {
      showAlert(`${this.state.type} system successful`);
      getSystemList();
    } else {
      showAlert(`${this.state.type} system failed`);
    }
    this.handleCreateClickClose();
  }

  render() {
    const { systems, classes } = this.props;
    return (
      <div>
        <h1>Systems</h1>
        <Fab color="primary" style={{ position: "fixed", bottom: 20, right: 20 }} onClick={() => this.handleCreateClickOpen("create")}>
          <AddIcon />
        </Fab>
        <Grid container spacing={16}>
          {
            systems.map((system) => (
              <Grid item key={system._id} className={classes.grid}>
                <Card style={{ maxWidth: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      style={{ height: 140 }}
                      image="https://blog.ionicframework.com/wp-content/uploads/2019/02/react-beta.png"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        { system.systemName }
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => this.handleCreateClickOpen("edit", system)}>
                      Edit
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.goDetail(system._id)}>
                      Learn More
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.handleDeleteClickOpen(system._id)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>

        <CreateDialog
          data={this.state.system}
          open={this.state.openCreateDialog}
          handleClose={this.handleCreateClickClose}
          handleInputChange={this.handleInputChange}
          submit={() => this.submit()}
        />

        <DeleteDialog
          open={this.state.openDeleteDialog}
          handleClose={this.handleDeleteClickClose}
          submit={() => this.deleteSystem(this.state.deleteId)}
          message="Do you want to delete the system?"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  systems: getSystems(state),
  currentUserId: getCurrentUser(state)._id,
});

export default withRouter(connect(mapStateToProps, { getSystemList, addSystem, showAlert, deleteSystem, updateSystem })(withStyles(styles)(Systems)));
