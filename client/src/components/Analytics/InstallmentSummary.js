import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";
import numeral from "numeral";

const styles = theme => ({
  bigAvatar: {
    width: 200,
    height: 200
  }
});

class InstallmentSummary extends Component {
  constructor() {
    super();
    this.state = {
      totalLoans: 0
    };
  }

  componentDidMount() {
    // Get expenses amount count
    const query = firebase
      .database()
      .ref("loans")
      .orderByKey();
    query.on("value", snapshot => {
      let loansCounter = 0;
      snapshot.forEach(function(childSnapshot) {
        childSnapshot.forEach(grandChildSnapshot => {
          // Sum up all loan principals
          loansCounter =
            loansCounter +
            parseInt(grandChildSnapshot.child("principal").val());
        });
      });
      this.setState({
        totalLoans: loansCounter
      });
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Card className={classes.card}>
              <CardContent align="center">
                <Typography
                  variant="display1"
                  align="center"
                  //color="primary"
                  style={{
                    color: "#0000CD"
                  }}
                >
                  Total Installments
                </Typography>
                <br />
                <img
                  alt="Remy Sharp"
                  src="/static/images/loans.png"
                  className={classes.bigAvatar}
                />
                <br />
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={3} sm={3} />
                  <Grid item xs={6} sm={6}>
                    <Typography
                      variant="headline"
                      gutterBottom
                      align="center"
                      color="Primary"
                    >
                      {numeral(this.state.totalLoans).format("0,0[.]00")} /=
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} />
                </Grid>
                <br />
              </CardContent>
            </Card>
            <br />

            <br />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(InstallmentSummary);
