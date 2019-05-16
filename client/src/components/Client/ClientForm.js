import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputMask from "react-input-mask";

import firebase from "../common/firebase";

//import NumberFormat from "react-number-format";

//var NumberFormat = require('react-number-format');

const styles = theme => ({});

class ClientForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      phone1: "",
      phone2: "",
      address: "",
      principal: "",
      interestRate: "",
      amountDue: "",
      totalInterest: "",
      issueDate: "",
      loanTerm: "",
      collateral: ""
    };
  }

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  calculateAmountDue = () => {
    let computedInterestRate = (parseInt(this.state.interestRate) + 100) / 100;

    let computedAmountDue = Math.floor(
      this.state.principal * computedInterestRate
    );

    this.setState({
      amountDue: computedAmountDue
    });
  };

  calculateTotalInterest = () => {
    let computedTotalInterest =
      parseInt(this.state.amountDue) - parseInt(this.state.principal);

    let totalInterest = Math.floor(computedTotalInterest);

    this.setState({
      totalInterest: totalInterest
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const client = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone1: this.state.phone1,
      phone2: this.state.phone2,
      address: this.state.address,
      principal: this.state.principal,
      interestRate: this.state.interestRate,
      amountDue: this.state.amountDue,
      totalInterest: this.state.totalInterest,
      issueDate: this.state.issueDate,
      loanTerm: this.state.loanTerm,
      collateral: this.state.collateral,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Nairobi"
      })
    };

    console.log(client);

    //Save farmer module
    const clientsRef = firebase.database().ref("clients");
    clientsRef.push(client);

    //Clear the Client form inputs
    this.setState({
      firstName: "",
      lastName: "",
      address: "",
      phone1: "",
      phone2: "",
      principal: "",
      interestRate: "",
      amountDue: "",
      totalInterest: "",
      issueDate: "",
      loanTerm: "",
      collateral: ""
    });
  };

  render() {
    const {
      firstName,
      lastName,
      phone1,
      phone2,
      address,
      principal,
      interestRate,
      amountDue,
      totalInterest,
      issueDate,
      loanTerm,
      collateral
    } = this.state;

    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <Typography variant="title" align="left" color="inherit">
            Bio-data
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                label="First name"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                label="Last name"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="address"
                name="address"
                value={address}
                onChange={this.onChange}
                label="Address"
                multiline
                rowsMax="4"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="(+256) 999 999 999"
                value={phone1}
                onChange={this.onChange}
              >
                {() => (
                  <TextField
                    id="phone1"
                    name="phone1"
                    label="Phone 1"
                    fullWidth
                    autoComplete="phone1"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="(+256) 999 999 999"
                value={phone2}
                onChange={this.onChange}
              >
                {() => (
                  <TextField
                    id="phone2"
                    name="phone2"
                    label="Phone 2"
                    fullWidth
                    autoComplete="off"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="title" align="left" color="inherit">
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
                id="amountDue"
                name="amountDue"
                value={amountDue}
                onClick={this.calculateAmountDue}
                label="Amount Due"
                helperText="Amount Due at Loan Maturity"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="totalInterest"
                name="totalInterest"
                value={totalInterest}
                onClick={this.calculateTotalInterest}
                label="Total Interest"
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
                color="primary"
              >
                Save Client
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(ClientForm);
