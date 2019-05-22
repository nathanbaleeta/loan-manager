import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import ExpensesReport from "../components/analytics/ExpensesReport";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class Visualization extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <div>
        <Typography variant="display1" align="center" color="primary">
          Loan Analytics
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <ExpensesReport />
          </Grid>
          <Grid item xs={4}>
            <ExpensesReport />
          </Grid>
          <Grid item xs={4}>
            <ExpensesReport />
          </Grid>
        </Grid>
        <br /> <br /> <br />
        <Typography variant="display1" align="center" color="primary">
          Expenses Analytics
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <ExpensesReport />
          </Grid>
          <Grid item xs={3}>
            <ExpensesReport />
          </Grid>
          <Grid item xs={3}>
            <ExpensesReport />
          </Grid>
          <Grid item xs={3}>
            <ExpensesReport />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Visualization.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Visualization);
