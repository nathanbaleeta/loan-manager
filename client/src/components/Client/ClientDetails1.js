import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//import Typography from "@material-ui/core/Typography";

import ProfileInfo from "../Client/ProfileInfo";

import LoanList from "../Loan/LoanList";

import ExpensesList from "../Expenses/ExpensesList";

const styles = theme => ({});

class ClientDetails1 extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid
            item
            xs={3}
            sm={3}
            style={{
              marginLeft: "-1%"
              //backgroundColor: "white"
            }}
          >
            <LoanList />
          </Grid>
          <Grid item xs={6} sm={6}>
            <ExpensesList />
          </Grid>
          <Grid item xs={3} sm={3}>
            <ProfileInfo />
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
