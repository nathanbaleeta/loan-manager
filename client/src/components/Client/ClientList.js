import React from "react";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
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
      //console.log(this.state.data);
    });
  }

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
      {
        name: "Issue date",
        options: {
          filter: false,
          sort: false
        }
      }
      /*   {
        name: "Collateral",
        options: {
          filter: false,
          sort: false
        }
      } */
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
              c.issueDate
              //c.collateral
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
          <DialogTitle id="alert-dialog-title">
            {"Remove from Loan records?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="primary">
              Are you sure you want to delete <b>{this.state.loan}</b> ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Disagree
            </Button>
            <Button onClick={this.closeDialog} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default ClientList;
