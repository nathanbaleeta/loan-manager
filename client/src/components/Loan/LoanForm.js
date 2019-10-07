import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import NumberFormat from "react-number-format";

import firebase from "../common/firebase";

const styles = theme => ({
  // Overiding css properties on material ui textbox
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
});

class LoanForm extends React.Component {
  constructor() {
    super();
    this.state = {
      principal: "",
      interestRate: "",
      issueDate: "",
      loanTerm: "",
      collateral: "",
      bbf: ""
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

  handleChange = name => event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  capitalize = str => {
    return str.toUpperCase();
  };

  // remove commas before saving to firebase
  removeCommas = num => {
    //Convert number to string before attempting string manipulation
    let str = num.toString();

    // Check if string contains comma before attempting to sanitize
    let result = str.includes(",") ? str.replace(/,/g, "") : str;
    return Number(result);
  };

  // Calculate BBF
  calculateBBF = (principal, interestRate) => {
    let newPrincipal = this.removeCommas(principal);
    let computedInterestRate = (parseFloat(interestRate) + 100) / 100;

    let bbf = parseFloat(newPrincipal * computedInterestRate);
    return bbf;
  };

  handleSubmit = event => {
    event.preventDefault();

    const key = this.props.id;

    // get our form data out of state
    const loan = {
      principal: this.removeCommas(this.state.principal),
      bbf: this.calculateBBF(this.state.principal, this.state.interestRate),
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
      //bbf: "",
      interestRate: "",
      issueDate: "",
      loanTerm: "",
      collateral: ""
    });
  };

  render() {
    const { classes } = this.props;
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
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="left" color="primary">
                Loan Calculator
              </Typography>
            </Grid>
            {/* Number formatting using thousand separator */}
            <Grid item xs={12} sm={6}>
              <NumberFormat
                value={principal}
                thousandSeparator={true}
                onValueChange={values => {
                  const { formattedValue } = values;

                  this.setState({ principal: formattedValue });
                }}
                customInput={TextField}
                label="Principal"
                fullWidth
                margin="normal"
                variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>
            {/*  Number formatting using thousand separator */}

            {/*  <Grid item xs={12} sm={6}>
              <TextField
                required
                id="principal"
                name="principal"
                value={principal}
                onChange={this.onChange}
                type="number"
                label="Principal"
                fullWidth
                margin="normal"
                variant="outlined"
                autoComplete="off"
              />
            </Grid> */}
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
                margin="normal"
                variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
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
                margin="normal"
                variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
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
                margin="normal"
                variant="outlined"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
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
                margin="normal"
                variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
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
