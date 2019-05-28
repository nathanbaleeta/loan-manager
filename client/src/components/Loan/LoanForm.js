import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

//import NumberFormat from "react-number-format";
//var NumberFormat = require('react-number-format');

const styles = theme => ({});

class LoanForm extends React.Component {
  constructor() {
    super();
    this.state = {
      principal: "",
      interestRate: "",
      issueDate: "",
      loanTerm: "",
      collateral: ""
    };
  }

  componentDidMount() {
    // target ID retrieved from another component(ClientList) using onClick event listener from route
    //console.log(this.props.id);
  }

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  capitalize(str) {
    return str.toUpperCase();
  }

  handleSubmit = event => {
    event.preventDefault();

    const key = this.props.id;
    // get our form data out of state
    const loan = {
      principal: this.state.principal,
      interestRate: this.state.interestRate,
      issueDate: this.state.issueDate,
      loanTerm: this.state.loanTerm,
      collateral: this.capitalize(this.state.collateral),
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Nairobi"
      })
    };

    console.log(loan);

    //Save new loan to given client
    const loansRef = firebase.database().ref(`loans/${key}`);
    loansRef.push(loan);

    //Clear the Client form inputs
    this.setState({
      principal: "",
      interestRate: "",
      issueDate: "",
      loanTerm: "",
      collateral: ""
    });
  };

  render() {
    const {
      principal,
      interestRate,
      loanTerm,
      issueDate,
      collateral
    } = this.state;

    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="left" color="primary">
                Loan Calculator
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="principal"
                name="principal"
                value={principal}
                onChange={this.onChange}
                type="number"
                label="Principal"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="interestRate"
                name="interestRate"
                value={interestRate}
                onChange={this.onChange}
                label="Interest rate"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="loanTerm"
                name="loanTerm"
                value={loanTerm}
                onChange={this.onChange}
                label="Loan term"
                helperText="Duration in months"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="issueDate"
                name="issueDate"
                value={issueDate}
                onChange={this.onChange}
                label="Issue Date"
                type="date"
                fullWidth
                autoComplete="off"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id="collateral"
                type="string"
                name="collateral"
                value={collateral}
                onChange={this.onChange}
                label="Collateral*"
                multiline
                rowsMax="4"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
              >
                Save Loan
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(LoanForm);
