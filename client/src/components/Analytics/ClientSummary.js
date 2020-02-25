import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";
import numeral from "numeral";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zoom: "80%"
  },
  bigAvatar: {
    width: 200,
    height: 200
  }
});

class ClientSummary extends Component {
  constructor() {
    super();
    this.state = {
      numOfClients: 0
    };
  }

  componentDidMount() {
    // Get client count
    const clientsRef = firebase.database().ref("clients");
    clientsRef.on("value", snapshot => {
      const clientCount = snapshot.numChildren();
      this.setState({
        numOfClients: clientCount
      });
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
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
                    Clients
                  </Typography>
                  <br />
                  <img
                    alt="Remy Sharp"
                    src="/static/images/clients.png"
                    className={classes.bigAvatar}
                  />
                  <br />
                  <br />
                  <Grid container spacing={24}>
                    <Grid item xs={4} sm={4} />
                    <Grid item xs={4} sm={4}>
                      <Typography
                        variant="headline"
                        gutterBottom
                        align="center"
                        color="Primary"
                      >
                        {numeral(this.state.numOfClients).format("0,0")}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} />
                  </Grid>
                  <br />
                </CardContent>
              </Card>
              <br />

              <br />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ClientSummary);
