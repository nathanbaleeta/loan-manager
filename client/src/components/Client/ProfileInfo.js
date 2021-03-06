import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Avatar from "@material-ui/core/Avatar";

import firebase from "../common/firebase";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: "100%",
    maxHeight: "100%"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120
    //border: "4px solid black"
  }
});

class ProfileInfo extends Component {
  state = {
    // target ID retrieved from another component(ClientList) using onClick event listener from route
    clientID: this.props.id,
    firstName: "",
    lastName: "",
    address: "",
    phone1: "",
    phone2: ""
  };

  componentDidMount() {
    // Client profile data.
    const clientRef = firebase.database().ref(`clients/${this.state.clientID}`);
    clientRef.on("value", snapshot => {
      const firstName = snapshot.child("firstName").val();
      const lastName = snapshot.child("lastName").val();
      const address = snapshot.child("address").val();
      const phone1 = snapshot.child("phone1").val();
      const phone2 = snapshot.child("phone2").val();

      this.setState({
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone1: phone1,
        phone2: phone2
      });

      //console.log(this.state);
    });
  }
  render() {
    const { classes } = this.props;
    const { firstName, lastName, address, phone1, phone2 } = this.state;

    return (
      <Fragment>
        <Grid container spacing={4}>
          <Grid
            container
            spacing={24}
            style={{
              background: "white"
            }}
          >
            <Grid item xs={12} sm={12}>
              <Paper className={classes.root} elevation={0} align="center">
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar.png"
                  className={classes.bigAvatar}
                />
                <Typography
                  variant="headline"
                  gutterBottom
                  align="center"
                  color="default"
                  style={{
                    fontWeight: "bold",
                    overflow: "auto"
                  }}
                >
                  {firstName + " " + lastName}
                </Typography>
                <Typography
                  variant="title"
                  gutterBottom
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px"
                  }}
                >
                  {address}
                </Typography>
                <Typography
                  variant="title"
                  gutterBottom
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px"
                  }}
                >
                  {phone1}
                </Typography>
                <Typography
                  variant="title"
                  gutterBottom
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px"
                  }}
                >
                  {phone2}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ProfileInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileInfo);
