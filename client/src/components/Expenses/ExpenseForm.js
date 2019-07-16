import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import NumberFormat from "react-number-format";

import firebase from "../common/firebase";

//import NumberFormat from "react-number-format";

//var NumberFormat = require('react-number-format');
const styles = theme => ({
  // Overiding css properties on material ui textbox
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
});

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      description: "",
      amount: "",
      expenseDate: ""
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

  capitalize(str) {
    return str.toUpperCase();
  }

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const expense = {
      description: this.capitalize(this.state.description),
      amount: this.state.amount,
      expenseDate: this.state.expenseDate,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Nairobi"
      })
    };

    console.log(expense);

    //Save farmer module
    const expensesRef = firebase.database().ref("expenses");
    expensesRef.push(expense);

    //Clear the Client form inputs
    this.setState({
      particulars: "",
      amount: "",
      expenseDate: ""
    });
  };

  render() {
    const { classes } = this.props;
    const { description, amount, expenseDate } = this.state;

    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <Typography variant="headline" align="left" color="primary">
            Expense details
          </Typography>
          <br />
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="description"
                name="description"
                value={description}
                onChange={this.onChange}
                label="Particulars"
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
              <NumberFormat
                value={amount}
                thousandSeparator={true}
                onValueChange={values => {
                  const { formattedValue } = values;

                  this.setState({ amount: formattedValue });
                }}
                customInput={TextField}
                label="Amount"
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
                id="expenseDate"
                name="expenseDate"
                value={expenseDate}
                onChange={this.onChange}
                label="Date"
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="secondary"
              >
                Save Expense
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(ExpenseForm);
