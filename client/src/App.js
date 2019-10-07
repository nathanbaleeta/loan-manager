import React from "react";
import { CssBaseline, withStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Dashboard from "./components/Analytics/Dashboard";

import ClientList from "./components/Client/ClientList";
import ClientDetails from "./components/Client/ClientDetails";

import ExpensesList from "./components/Expenses/ExpensesList";
//import InstallmentForm from "./components/Installment/InstallmentForm";
import InstallmentList from "./components/Installment/InstallmentList";

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
    <br />
    <br />
    <br />
    <br />
    <main className={classes.main}>
      <Switch>
        <Route path="/clients/:id" component={ClientDetails} />
        <Route path="/clients/:id/loans/:id" component={InstallmentList} />
        <Route path="/clients" component={ClientList} />

        <Route exact path="/" component={Dashboard} />
        <Route path="/expenses" component={ExpensesList} />
      </Switch>
    </main>
  </React.Fragment>
);

export default withStyles(styles)(App);
