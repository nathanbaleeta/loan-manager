import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import MUIDataTable from "mui-datatables";
import CustomToolbar from "../mui-datatables/CustomToolbarExpenses";

import NumberFormat from "react-number-format";

import firebase from "../common/firebase";
import numeral from "numeral";

const styles = theme => ({
  // Overiding css properties on material ui textbox
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
});

class ExpensesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,

      key: "",
      description: "",
      amount: "",
      expenseDate: ""
    };
  }

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const expensesRef = firebase.database().ref("expenses");

    expensesRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          description: items[item].description,
          amount: items[item].amount,
          expenseDate: items[item].expenseDate
        });
      }

      //console.log(newState);
      this.setState({
        data: newState
      });
      console.log(this.state.data);
    });
  }

  // remove commas before saving to firebase
  removeCommas(str) {
    let result = str.replace(/,/g, "");
    return Number(result);
  }

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  updateExpense(id) {
    //const recordToEdit = this.state.data.find(item => item.id === id);
    //console.log(recordToEdit);
    this.openDialog();

    const key = id;
    const expensesRef = firebase.database().ref(`expenses/${key}`);
    expensesRef.on("value", snapshot => {
      this.setState({
        key: snapshot.key,
        description: snapshot.child("description").val(),
        amount: snapshot.child("amount").val(),
        expenseDate: snapshot.child("expenseDate").val()
      });
    });
    console.log(
      "############### Veryfing state is working ###################"
    );
  }

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const expense = {
      description: this.toTitleCase(this.state.description),
      amount: this.removeCommas(this.state.amount),
      expenseDate: this.state.expenseDate
    };

    //Update expense module
    const key = this.state.key;
    const expensesRef = firebase.database().ref(`expenses/${key}`);
    expensesRef
      .update(expense)
      .then(function() {
        console.log("Synchronization succeeded");
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });
  };

  render() {
    const { data } = this.state;
    const { classes } = this.props;

    const columns = [
      {
        name: "Particulars",
        options: {
          filter: false,
          sort: true
        }
      },

      {
        name: "Amount",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Date",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Actions",
        options: {
          filter: false,
          sort: false
        }
      }
    ];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      serverSide: false,
      rowsPerPage: 10,
      pagination: true,
      customToolbar: () => {
        return <CustomToolbar />;
      },

      onRowsDelete: rowsDeleted => {
        // get the corresponding id in state
        const row = rowsDeleted.data[0].index;
        const id = this.state.data[row]["id"];
        console.log(id);

        // Perform client deletion
        firebase
          .database()
          .ref("expenses")
          .child(id)
          .remove();
      }
    };

    return (
      <Fragment>
        <MUIDataTable
          title={"Expense list"}
          data={data.map(e => {
            return [
              <div
                style={{
                  fontSize: 18
                }}
              >
                {e.description}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {numeral(e.amount).format("0,0[.]00")}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {e.expenseDate}
              </div>,

              <IconButton
                color="primary"
                //onClick={() => this.updateFarmer(index)}
                // The bind method also works
                onClick={this.updateExpense.bind(this, e.id)}
              >
                <EditIcon color="primary" />
              </IconButton>
            ];
          })}
          columns={columns}
          options={options}
        />

        <Dialog
          open={this.state.open}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="simple-dialog-title"
            color="default"
            style={{ backgroundColor: "#2E3B55" }}
          >
            <Typography
              component="h1"
              variant="display1"
              align="center"
              style={{ color: "white" }}
            >
              Edit Expense
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="primary">
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
                      value={this.state.description}
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
                      value={this.state.amount}
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
                      value={this.state.expenseDate}
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
                      variant="contained"
                      fullWidth
                      size="large"
                      color="secondary"
                    >
                      Update Expense
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <br />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ExpensesList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExpensesList);
