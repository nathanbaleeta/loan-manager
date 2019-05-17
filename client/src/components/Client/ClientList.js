import React from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";

import { Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import MUIDataTable from "mui-datatables";
import CustomToolbar from "../mui-datatables/CustomToolbarClients";

import firebase from "../common/firebase";

class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,

      key: "",
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

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const clientsRef = firebase.database().ref("clients");

    clientsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          firstName: items[item].firstName,
          lastName: items[item].lastName,
          phone1: items[item].phone1,
          phone2: items[item].phone2,
          address: items[item].address,
          principal: items[item].principal,
          interestRate: items[item].interestRate,
          amountDue: items[item].amountDue,
          totalInterest: items[item].totalInterest,

          issueDate: items[item].issueDate,
          loanTerm: items[item].loanTerm,
          collateral: items[item].collateral
        });
      }

      //console.log(newState);
      this.setState({
        data: newState
      });
      console.log(this.state.data);
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

  updateClient(id) {
    //const recordToEdit = this.state.data.find(item => item.id === id);
    //console.log(recordToEdit);
    this.openDialog();

    const key = id;
    const clientsRef = firebase.database().ref(`clients/${key}`);
    clientsRef.on("value", snapshot => {
      this.setState({
        key: snapshot.key,
        firstName: snapshot.child("firstName").val(),
        lastName: snapshot.child("lastName").val(),
        phone1: snapshot.child("phone1").val(),
        phone2: snapshot.child("phone2").val(),
        address: snapshot.child("address").val(),

        principal: snapshot.child("principal").val(),
        interestRate: snapshot.child("interestRate").val(),
        amountDue: snapshot.child("amountDue").val(),
        totalInterest: snapshot.child("totalInterest").val(),
        issueDate: snapshot.child("issueDate").val(),
        loanTerm: snapshot.child("loanTerm").val(),
        collateral: snapshot.child("collateral").val()
      });
    });
    console.log(
      "############### Veryfing state is working ###################"
    );
  }

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
      collateral: this.state.collateral
    };

    //Update farmer module
    const key = this.state.key;
    const clientsRef = firebase.database().ref(`clients/${key}`);
    clientsRef
      .update(client)
      .then(function() {
        console.log("Synchronization succeeded");
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });
  };

  render() {
    const { data } = this.state;

    const columns = [
      {
        name: "Client name",
        options: {
          filter: false,
          sort: true
        }
      },

      {
        name: "Address",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Phone 1",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Phone 2",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Principal",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Interest rate",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Loan term",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Total Interest",
        options: {
          filter: false,
          sort: false
        }
      },
      /*
      {
        name: "Issue date",
        options: {
          filter: false,
          sort: false
        }
      }
         {
        name: "Collateral",
        options: {
          filter: false,
          sort: false
        }
      } */
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
          .ref("clients")
          .child(id)
          .remove();
      }
    };

    return (
      <React.Fragment>
        <MUIDataTable
          title={"Client list"}
          data={data.map(c => {
            return [
              c.lastName + " " + c.firstName,
              c.address,
              c.phone1,
              c.phone2,
              c.principal,
              c.interestRate,
              c.loanTerm,
              c.totalInterest,
              //c.issueDate
              //c.collateral
              <IconButton
                color="primary"
                //onClick={() => this.updateFarmer(index)}
                // The bind method also works
                onClick={this.updateClient.bind(this, c.id)}
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
            style={{ backgroundColor: "indigo" }}
          >
            <Typography
              component="h1"
              variant="display1"
              align="center"
              style={{ color: "white" }}
            >
              Edit Client
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="primary">
              <br />
              <form onSubmit={this.handleSubmit}>
                <Typography variant="headline" align="left" color="inherit">
                  Bio-data
                </Typography>
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      value={this.state.firstName}
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
                      value={this.state.lastName}
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
                      value={this.state.address}
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
                      value={this.state.phone1}
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
                      value={this.state.phone2}
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
                    <Typography variant="headline" align="left" color="inherit">
                      Loan Calculator
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="principal"
                      name="principal"
                      value={this.state.principal}
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
                      value={this.state.interestRate}
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
                      value={this.state.loanTerm}
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
                      value={this.state.amountDue}
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
                      value={this.state.totalInterest}
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
                      value={this.state.issueDate}
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
                      value={this.state.collateral}
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
                      Update Client
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default ClientList;
