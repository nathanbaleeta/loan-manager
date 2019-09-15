import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ProfileInfo from "../Client/ProfileInfo";
import LoanList from "../Loan/LoanList";
//import InstallmentForm from "../Installment/InstallmentForm";
import InstallmentList from "../Installment/InstallmentList";

import { Switch, Route } from "react-router-dom";

//import firebase from "../common/firebase";

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

class ClientDetails1 extends Component {
  state = {
    // target ID retrieved from another component(ClientList) using onClick event listener from route
    clientID: this.props.match.params.id
  };

  componentDidMount() {}
  render() {
    //const { classes } = this.props;
    //const {} = this.state;

    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid
            item
            xs={3}
            sm={3}
            style={{
              marginLeft: "-2%",
              marginTop: "-2%"
              //borderRight: "1px solid #d4d4d4",
              //backgroundColor: "white"
            }}
          >
            <LoanList id={this.state.clientID} />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            style={{
              marginLeft: "1%",
              marginRight: "1%"
            }}
          >
            <br />

            <Switch>
              <Route
                path="/clients/:id/loans/:id"
                component={InstallmentList}
              />
            </Switch>
          </Grid>
          <Grid item xs={3} sm={3}>
            <ProfileInfo id={this.state.clientID} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ClientDetails1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientDetails1);
