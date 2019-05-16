import React from "react";

import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import MUIDataTable from "mui-datatables";
import CustomToolbar from "../mui-datatables/CustomToolbarClients";

class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 100,
      data: [],
      open: false,
      loan: null
    };
  }

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  handleDelete = loan => {};

  componentDidMount() {}

  componentDidUpdate() {
    // only update table if the data has changed
    /*API.get("loans").then(res => {
      const data = res.data;
      this.setState({ data });
    });
    */
  }

  render() {
    //const { loan } = this.props;

    const columns = [
      {
        name: "Client",
        options: {
          filter: false,
          sort: true
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
        name: "Address",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Principal",
        options: {
          filter: true,
          sort: false
        }
      },
      {
        name: "Interest Rate",
        options: {
          filter: true,
          sort: false
        }
      },
      {
        name: "Issue Date",
        options: {
          filter: true,
          sort: false
        }
      },
      {
        name: "Loan Term",
        options: {
          filter: false,
          sort: false
        }
      },

      {
        name: "Actions"
      }
    ];

    const { data, count } = this.state;

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      serverSide: false,
      rowsPerPage: 10,
      pagination: true,
      count: count,
      customToolbar: () => {
        return <CustomToolbar />;
      }
    };

    return (
      <React.Fragment>
        <MUIDataTable
          title={"Client list"}
          data={data.map(loan => {
            return [
              loan.lastName + " " + loan.firstName,
              <Chip label={loan.phone1} color="primary" variant="outlined" />,
              loan.address,
              loan.principal,
              loan.interestRate,
              loan.dateLoanGiven,
              loan.loanTerm,

              <IconButton
                color="primary"
                onClick={e => this.handleDelete(loan)}
              >
                <DeleteIcon color="primary" />
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
