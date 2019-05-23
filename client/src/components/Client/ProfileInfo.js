import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

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

function PersonalInfo(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Typography variant="title" gutterBottom align="center">
              Personal Info
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography
              variant="body1"
              gutterBottom
              align="left"
              style={{
                fontWeight: "bold"
              }}
            >
              Date of birth:
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="left"
              style={{
                fontWeight: "bold"
              }}
            >
              Position:
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="left"
              style={{
                fontWeight: "bold"
              }}
            >
              Height:
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="left"
              style={{
                fontWeight: "bold"
              }}
            >
              Weight:
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="left"
              style={{
                fontWeight: "bold"
              }}
            >
              Wingspan:
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="left"
              style={{
                fontWeight: "bold"
              }}
            >
              Vertical leap:
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography variant="body1" gutterBottom align="left">
              12th Dec, 1997
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              Point Guard
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              6'4"
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              342lbs
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              2m
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              3m
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

PersonalInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonalInfo);
