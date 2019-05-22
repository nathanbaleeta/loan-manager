import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import MUIDataTable from "mui-datatables";
import CustomToolbar from "../mui-datatables/CustomToolbarInstallments";

import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import firebase from "../common/firebase";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({});

class ClientDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TargetID: "",
      TargetKey: "",
      installmentData: [],

      //Client Profile data
      firstName: "",
      lastName: "",
      phone1: "",
      phone2: "",
      address: "",
      principal: "",
      interestRate: "",
      issueDate: "",
      loanTerm: "",
      collateral: "",

      //Client Installment data
      key: "",
      bbf: "",
      amountPaid: "",
      dateReturned: "",
      interestGained: "",

      open: false
    };
  }
  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    // target ID retrieved from another component(ClientList) using onClick event listener from route
    const key = this.props.match.params.id;

    // Client profile data.
    const clientRef = firebase.database().ref(`clients/${key}`);
    clientRef.on("value", snapshot => {
      const firstName = snapshot.child("firstName").val();
      const lastName = snapshot.child("lastName").val();
      const phone1 = snapshot.child("phone1").val();
      const phone2 = snapshot.child("phone2").val();
      const address = snapshot.child("address").val();
      const principal = snapshot.child("principal").val();
      const interestRate = snapshot.child("interestRate").val();
      const issueDate = snapshot.child("issueDate").val();
      const loanTerm = snapshot.child("loanTerm").val();
      const collateral = snapshot.child("collateral").val();

      this.setState({
        firstName: firstName,
        lastName: lastName,
        phone1: phone1,
        phone2: phone2,
        address: address,
        principal: principal,
        interestRate: interestRate,
        issueDate: issueDate,
        loanTerm: loanTerm,
        collateral: collateral
      });
    });

    // Client installment data.
    const installmentRef = firebase.database().ref(`installments/${key}`);
    installmentRef.on("value", snapshot => {
      let installmentInfo = {};
      let newState = [];
      snapshot.forEach(function(childSnapshot) {
        // handle read data.
        var i = childSnapshot.val();
        //console.log(childSnapshot.key);

        installmentInfo = {
          installmentID: childSnapshot.key,
          amountPaid: i.amountPaid,
          bbf: i.bbf,
          dateReturned: i.dateReturned,
          interestGained: i.interestGained,
          created: i.created
        };
        // Add installment object to array
        newState.push(installmentInfo);
      });
      this.setState({
        installmentData: newState,
        TargetID: key
      });
      //console.log(this.state.installmentData);
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

  updateInstallment(id) {
    this.openDialog();

    const key = id;
    this.setState({ TargetKey: key });
    const installmentsRef = firebase
      .database()
      .ref(`installments/${this.state.TargetID}/${key}`);
    installmentsRef.on("value", snapshot => {
      this.setState({
        key: snapshot.key,
        bbf: snapshot.child("bbf").val(),
        amountPaid: snapshot.child("amountPaid").val(),
        dateReturned: snapshot.child("dateReturned").val(),
        interestGained: snapshot.child("interestGained").val()
      });
    });
    console.log(
      "############### Veryfing state is working ###################"
    );
  }

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const installment = {
      bbf: this.state.bbf,
      amountPaid: this.state.amountPaid,
      dateReturned: this.state.dateReturned,
      interestGained: this.state.interestGained
    };

    console.log(installment);

    //Update and commit installment change
    const installmentsRef = firebase
      .database()
      .ref(`installments/${this.state.TargetID}/${this.state.TargetKey}`);

    installmentsRef
      .update(installment)
      .then(function() {
        console.log("Synchronization succeeded");
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });
  };

  render() {
    //const { classes } = this.props;
    const {
      installmentData,
      firstName,
      lastName,
      phone1,
      phone2,
      address,
      principal,
      interestRate,
      issueDate,
      loanTerm,
      collateral
    } = this.state;

    const columns = [
      {
        name: "B/F",
        options: {
          filter: false,
          sort: true
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
        name: "Amount paid",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Interest gained",
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
        //console.log(this.state.installmentData);
        // get the corresponding id in state
        const row = rowsDeleted.data[0].index;
        const id = this.state.installmentData[row]["installmentID"];
        console.log(id);

        // Perform client deletion
        firebase
          .database()
          .ref(`installments/${this.state.TargetID}`)
          .child(id)
          .remove();
      }
    };

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="headline"
              gutterBottom
              align="left"
              color="primary"
            >
              Biodata:
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              FIRSTNAME:
            </Typography>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              LASTNAME:
            </Typography>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              CONTACT 1:
            </Typography>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              CONTACT 2:
            </Typography>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              ADDRESS:
            </Typography>
          </Grid>

          <Grid item xs={10} sm={10}>
            <Typography variant="title" gutterBottom align="left">
              {firstName}
            </Typography>
            <Typography variant="title" gutterBottom align="left">
              {lastName}
            </Typography>
            <Typography variant="title" gutterBottom align="left">
              {phone1}
            </Typography>
            <Typography variant="title" gutterBottom align="left">
              {phone2}
            </Typography>
            <Typography variant="title" gutterBottom align="left">
              {address}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="headline"
              gutterBottom
              align="left"
              color="primary"
            >
              Loan Information:
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              PRINCIPAL:
            </Typography>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              INTEREST RATE:
            </Typography>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              ISSUE DATE:
            </Typography>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              LOAN TERM:
            </Typography>
            <Typography
              variant="title"
              gutterBottom
              align="left"
              color="default"
            >
              COLLATERAL:
            </Typography>
          </Grid>

          <Grid item xs={10} sm={10}>
            <Typography variant="title" gutterBottom align="left">
              {principal}
            </Typography>
            <Typography variant="title" gutterBottom align="left">
              {interestRate}
            </Typography>
            <Typography variant="title" gutterBottom align="left">
              {issueDate}
            </Typography>
            <Typography variant="title" gutterBottom align="left">
              {loanTerm}
            </Typography>
            <Typography variant="title" gutterBottom align="left">
              {collateral}
            </Typography>
          </Grid>
        </Grid>
        <br />

        <MUIDataTable
          title={"Installment Tracker"}
          data={installmentData.map((i, index) => {
            return [
              i.bbf,
              i.dateReturned,
              i.amountPaid,
              i.interestGained,

              <IconButton
                color="primary"
                onClick={this.updateInstallment.bind(this, i.installmentID)}
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
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="simple-dialog-title"
            color="default"
            style={{
              backgroundColor: "indigo"
            }}
          >
            <Typography
              component="h1"
              variant="display1"
              align="center"
              style={{ color: "white" }}
            >
              Edit Installment
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} />
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
                    value={this.state.bbf}
                    onChange={this.onChange}
                    type="number"
                    label="Balance Brought Forward (B/F)"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="interestGained"
                    name="interestGained"
                    value={this.state.interestGained}
                    onChange={this.onChange}
                    label="Interest Gained"
                    type="number"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="dateReturned"
                    name="dateReturned"
                    value={this.state.dateReturned}
                    onChange={this.onChange}
                    label="Date returned"
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
                    required
                    id="amountPaid"
                    name="amountPaid"
                    value={this.state.amountPaid}
                    onChange={this.onChange}
                    label="Amount paid"
                    type="number"
                    fullWidth
                    autoComplete="off"
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
                    Update Installment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ClientDetails);
