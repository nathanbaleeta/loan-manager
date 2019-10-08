import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
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

class InstallmentForm extends Component {
  constructor() {
    super();
    this.state = {
      targetClientID: "",
      amountPaid: "",
      dateReturned: ""
    };
  }

  componentDidMount() {
    // target client ID retrieved from another component using onClick event listener from route
    //const key = this.props.match.params.id;
    //this.setState({ targetClientID: key });
  }

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  /* calculateAmountDue = () => {
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
  }; */

  handleSubmit = event => {
    // set firebase node to current loan
    const key = this.props.id;
    event.preventDefault();

    // get our form data out of state
    const installment = {
      amountPaid: this.state.amountPaid,
      dateReturned: this.state.dateReturned,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Nairobi"
      })
    };

    console.log(installment);

    //Save installment
    const installmentsRef = firebase.database().ref(`installments/${key}`);
    installmentsRef.push(installment);

    //Clear the Installment form inputs
    this.setState({
      amountPaid: "",
      dateReturned: ""
    });
  };

  render() {
    const { classes } = this.props;
    const { amountPaid, dateReturned } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="left" color="default">
                Installment Calculator
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <NumberFormat
                value={amountPaid}
                thousandSeparator={true}
                onValueChange={values => {
                  const { formattedValue } = values;

                  this.setState({ amountPaid: formattedValue });
                }}
                customInput={TextField}
                label="Amount paid"
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
                id="dateReturned"
                name="dateReturned"
                value={dateReturned}
                onChange={this.onChange}
                label="Date returned"
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
              <br />
              <br />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="secondary"
              >
                Save Installment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

InstallmentForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InstallmentForm);
