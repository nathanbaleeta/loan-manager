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
  constructor(props) {
    super();
    this.state = {
      amountPaid: "",
      dateReturned: "",
      installmentBbf: ""
    };
  }

  componentDidMount() {
    this.fetchLoanBBF(this.props.id);
    console.log(this.props.client);
  }

  componentDidUpdate(prevProps) {
    // Check if props have changed; if yes update variables then reuse & call fetch results
    if (prevProps !== this.props) {
      let loanID = this.props.id;
      this.fetchLoanBBF(loanID);
    }
  }

  fetchLoanBBF(loanID) {
    console.log(loanID);
    const loansBBFRef = firebase
      .database()
      .ref(`loans/${this.props.client}/${loanID}`);
    loansBBFRef.on("value", snapshot => {
      this.setState({
        installmentBbf: snapshot.child("bbf").val()
      });
    });
  }

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  // remove commas before saving to firebase
  removeCommas = num => {
    //Convert number to string before attempting string manipulation
    let str = num.toString();

    // Check if string contains comma before attempting to sanitize
    let result = str.includes(",") ? str.replace(/,/g, "") : str;
    return Number(result);
  };

  calculateBBF = amountPaid => {
    const amount = this.removeCommas(amountPaid);
    let newBBF = (this.state.installmentBbf - parseInt(amount)) * 1.12;

    return newBBF;
  };

  handleSubmit = event => {
    // set firebase node to current loan
    const key = this.props.id;

    event.preventDefault();

    // get our form data out of state
    const installment = {
      amountPaid: this.removeCommas(
        this.state.amountPaid,
        this.state.installmentBbf
      ),
      dateReturned: this.state.dateReturned,
      bbf: this.calculateBBF(this.state.amountPaid),
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Nairobi"
      })
    };
    console.log(installment);

    const loan = {
      bbf: this.calculateBBF(this.state.amountPaid)
    };

    //Save installment
    const installmentsRef = firebase.database().ref(`installments/${key}`);
    installmentsRef.push(installment);

    //Update BBF for given loan
    const updateLoanBBFRef = firebase
      .database()
      .ref(`loans/${this.props.client}/${this.props.id}`);
    updateLoanBBFRef
      .update(loan)
      .then(function() {
        console.log("Synchronization succeeded");
        console.log(this.state);
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });

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
