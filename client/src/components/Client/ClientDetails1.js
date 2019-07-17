import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import LoanList from "../Loan/LoanList";

import firebase from "../common/firebase";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  avatar: {
    margin: 10
  }
});

class ClientDetails1 extends React.Component {
  state = {
    // target ID retrieved from another component(ClientList) using onClick event listener from route
    clientID: this.props.match.params.id,
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
      <div>
        <Grid container spacing={24}>
          <Grid
            item
            xs={3}
            sm={3}
            style={{
              marginLeft: "-2%",
              marginTop: "-2%",
              borderRight: "1px solid #d4d4d4",
              backgroundColor: "white"
            }}
          >
            <br />
            <LoanList id={this.state.clientID} />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            style={{
              marginLeft: "1%"
            }}
          >
            {/* <LoanList /> */}
          </Grid>
          <Grid item xs={3} sm={3}>
            <Paper className={classes.root} elevation={1}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="title" gutterBottom align="center">
                    Personal Info
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography
                    variant="title"
                    gutterBottom
                    align="left"
                    style={{
                      fontWeight: "bold"
                    }}
                  >
                    Firstname:
                  </Typography>
                  <Typography
                    variant="title"
                    gutterBottom
                    align="left"
                    style={{
                      fontWeight: "bold"
                    }}
                  >
                    Lastname:
                  </Typography>
                  <Typography
                    variant="title"
                    gutterBottom
                    align="left"
                    style={{
                      fontWeight: "bold"
                    }}
                  >
                    Address:
                  </Typography>
                  <Typography
                    variant="title"
                    gutterBottom
                    align="left"
                    style={{
                      fontWeight: "bold"
                    }}
                  >
                    Phone 1:
                  </Typography>
                  <Typography
                    variant="title"
                    gutterBottom
                    align="left"
                    style={{
                      fontWeight: "bold"
                    }}
                  >
                    Phone 2:
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7}>
                  <Typography variant="title" gutterBottom align="left">
                    {firstName}
                  </Typography>
                  <Typography variant="title" gutterBottom align="left">
                    {lastName}
                  </Typography>
                  <Typography variant="title" gutterBottom align="left">
                    {address}
                  </Typography>
                  <Typography variant="title" gutterBottom align="left">
                    {phone1}
                  </Typography>
                  <Typography variant="title" gutterBottom align="left">
                    {phone2}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ClientDetails1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientDetails1);
