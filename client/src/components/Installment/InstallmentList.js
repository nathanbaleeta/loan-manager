import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import InstallmentForm from "./InstallmentForm";

import numeral from "numeral";
import firebase from "../common/firebase";

const styles = theme => ({
  fab: {
    marginLeft: "3%",
    marginBottom: "2%"
  },
  tableRoot: {
    height: "100%",
    width: "100%",
    //overflow: "auto",
    //position: "fixed",
    maxHeight: "100%",
    //borderRight: "1px solid #d4d4d4",
    marginTop: "-2%"
  }
});

class InstallmentList extends Component {
  state = {
    //loanID: this.props.match.params.id,
    installmentData: [],

    principal: "",
    interestRate: "",
    issueDate: "",
    loanTerm: "",
    collateral: "",
    bbf: ""
  };

  componentDidMount() {
    this.fetchLoanDetails(this.props.client, this.props.loan);
    this.fetchInstallments(this.props.loan);
  }

  componentDidUpdate(prevProps) {
    // Check if props have changed; if yes update variables then reuse & call fetch results
    if (prevProps !== this.props) {
      let clientID = this.props.client;
      let loanID = this.props.loan;
      this.fetchLoanDetails(clientID, loanID);
      this.fetchInstallments(loanID);
    }
  }

  fetchLoanDetails(clientID, loanID) {
    const loansDetailRef = firebase
      .database()
      .ref(`loans/${clientID}/${loanID}`);
    loansDetailRef.on("value", snapshot => {
      this.setState({
        principal: snapshot.child("principal").val(),
        interestRate: snapshot.child("interestRate").val(),
        loanTerm: snapshot.child("loanTerm").val(),
        issueDate: snapshot.child("issueDate").val(),
        collateral: snapshot.child("collateral").val(),
        bbf: snapshot.child("bbf").val()
      });
    });
  }

  fetchInstallments(loanID) {
    const installmentRef = firebase
      .database()
      .ref(`installments/${this.props.loan}`);
    installmentRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          installmentID: item,
          amountPaid: items[item].amountPaid,
          dateReturned: items[item].dateReturned,
          bbf: items[item].bbf
        });
      }

      //console.log(newState);
      this.setState({
        installmentData: newState
      });
      console.log(this.state.installmentData);
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const {
      installmentData,
      principal,
      interestRate,
      loanTerm,
      issueDate,
      collateral,
      bbf
    } = this.state;

    return (
      <Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    //background: "black",
                    color: "black",
                    fontSize: 20,
                    fontWeight: "bold",
                    width: "100%"
                  }}
                >
                  Loan Details
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    background: "black",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  Principal
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    background: "black",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  Interest
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    background: "black",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  Duration
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    background: "black",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  Issue date
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    background: "black",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  Collateral
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    background: "orange",
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  BBF
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="1">
                <TableCell component="th" scope="row">
                  <Typography
                    variant="subheading"
                    align="center"
                    color="default"
                  >
                    {principal === ""
                      ? ""
                      : numeral(principal).format("0,0[.]00") + "/="}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subheading"
                    align="center"
                    color="default"
                  >
                    {interestRate}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subheading"
                    align="center"
                    color="default"
                  >
                    {loanTerm}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subheading"
                    align="center"
                    color="default"
                  >
                    {issueDate}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subheading"
                    align="center"
                    color="default"
                  >
                    {collateral}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subheading"
                    align="center"
                    color="default"
                  >
                    <Typography
                      variant="subheading"
                      align="center"
                      color="default"
                    >
                      {bbf === "" ? "" : numeral(bbf).format("0,0[.]00") + "/="}
                    </Typography>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <br />
        <Paper className={classes.tableRoot} elevation={0}>
          <br /> <br />
          <br />
          <Fragment>
            <Fab
              color="default"
              aria-label="Add"
              className={classes.fab}
              onClick={this.handleOpen}
            >
              <AddIcon />
            </Fab>
            <br />

            <br />

            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        //background: "black",
                        color: "black",
                        fontSize: 20,
                        fontWeight: "bold",
                        width: "100%"
                      }}
                    >
                      Installment History
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        background: "orange",
                        color: "black",
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      BBF
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        background: "black",
                        color: "white",
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      Date Returned
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        background: "black",
                        color: "white",
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      Amount paid
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {installmentData.map(installment => (
                    <TableRow key="1">
                      <TableCell align="right">
                        <Typography
                          variant="subheading"
                          align="left"
                          color="default"
                        >
                          {installment.bbf === ""
                            ? ""
                            : numeral(installment.bbf).format("0,0[.]00") +
                              "/="}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subheading"
                          align="center"
                          color="default"
                        >
                          {installment.dateReturned}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subheading"
                          align="center"
                          color="default"
                        >
                          {installment.amountPaid === ""
                            ? ""
                            : numeral(installment.amountPaid).format(
                                "0,0[.]00"
                              ) + "/="}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Fragment>
        </Paper>

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
              Add Installment
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="primary">
              <br />
              <InstallmentForm
                id={this.props.loan}
                client={this.props.client}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(InstallmentList);
