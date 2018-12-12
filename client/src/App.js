import React from "react";
import { CssBaseline, withStyles } from "@material-ui/core";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      padding: 2 * theme.spacing.unit
    }
  }
});

const App = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <Header />
    <main className={classes.main}>
      <Dashboard />
    </main>
  </React.Fragment>
);

export default withStyles(styles)(App);
