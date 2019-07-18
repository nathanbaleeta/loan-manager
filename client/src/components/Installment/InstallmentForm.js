import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({
  // Overiding css properties on material ui textbox
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
});

class InstallmentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      targetClientID: "",
      bbf: "",
      amountPaid: "",
      dateReturned: "",
      interestGained: ""
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
    // set firebase node to current client
    const key = this.state.targetClientID;
    event.preventDefault();

    // get our form data out of state
    const installment = {
      bbf: this.state.bbf,
      amountPaid: this.state.amountPaid,
      dateReturned: this.state.dateReturned,
      interestGained: this.state.interestGained,

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
      bbf: "",
      amountPaid: "",
      dateReturned: "",
      interestGained: ""
    });
  };

  render() {
    const { classes } = this.props;
    const { bbf, dateReturned, amountPaid, interestGained } = this.state;

    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="left" color="primary">
                Installment Calculator
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bbf"
                name="bbf"
                value={bbf}
                onChange={this.onChange}
                type="number"
                label="Balance Brought Forward (B/F)"
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
                id="interestGained"
                name="interestGained"
                value={interestGained}
                onChange={this.onChange}
                label="Interest Gained"
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

            <Grid item xs={12} sm={12}>
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
              <TextField
                required
                id="amountPaid"
                name="amountPaid"
                value={amountPaid}
                onChange={this.onChange}
                label="Amount paid"
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
            <Grid item xs={12} sm={12} />
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
              >
                Save Installment
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(InstallmentForm);
