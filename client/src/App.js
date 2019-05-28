import React from "react";
import { CssBaseline, withStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

import ClientList from "./components/Client/ClientList";
import ClientForm from "./components/Client/ClientForm";
import ClientDetails from "./components/Client/ClientDetails";
import ClientDetails1 from "./components/Client/ClientDetails1";

import ExpensesList from "./components/Expenses/ExpensesList";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import InstallmentForm from "./components/Installment/InstallmentForm";

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
        <Route path="/clients/:id" component={ClientDetails1} />

        {/*  <Route path="/clients/:id" component={ClientDetails} /> */}
        <Route path="/clients/:id" component={InstallmentForm} />
        <Route path="/clients" component={ClientList} />
        <Route path="/clients" component={ClientForm} />

        <Route path="/expenses" component={ExpensesList} />
        <Route path="/expenses" component={ExpenseForm} />

        <Route exact path="/" />
        <Route path="/data-analytics" component={Dashboard} />
      </Switch>
    </main>
  </React.Fragment>
);

export default withStyles(styles)(App);
