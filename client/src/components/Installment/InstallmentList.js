import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
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

import firebase from "../common/firebase";

const styles = theme => ({
  fab: {
    marginLeft: "3%",
    marginBottom: "2%"
  },
  tableRoot: {
    height: "100%",
    width: "100%",
    overflow: "auto",
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
    loanTerm: ""
    //collateral: ""
  };

  componentDidMount() {
    this.fetchResults(this.props.client, this.props.loan);
  }

  componentDidUpdate(prevProps) {
    // Check if props have changed; if yes update variables then reuse & call fetch results
    if (prevProps !== this.props) {
      let clientID = this.props.client;
      let loanID = this.props.loan;
      this.fetchResults(clientID, loanID);
    }
  }

  fetchResults(clientID, loanID) {
    const loansDetailRef = firebase
      .database()
      .ref(`loans/${clientID}/${loanID}`);
    loansDetailRef.on("value", snapshot => {
      this.setState({
        principal: snapshot.child("principal").val(),
        interestRate: snapshot.child("interestRate").val(),
        loanTerm: snapshot.child("loanTerm").val(),
        issueDate: snapshot.child("issueDate").val()
      });
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
    const { principal, interestRate, loanTerm, issueDate } = this.state;

    return (
      <Fragment>
        <Paper className={classes.tableRoot} elevation={0}>
          <br /> <br />
          <Fragment>
            <br />
            <Typography
              variant="display1"
              gutterBottom
              align="center"
              color="primary"
            >
              Loan Details
            </Typography>
            <Grid container spacing={8}>
              <Grid item xs={3} sm={3}>
                <Typography
                  variant="title"
                  align="center"
                  color="default"
                  style={{ fontWeight: "bold" }}
                >
                  Principal
                </Typography>
                <br />
                <Typography variant="title" align="center" color="default">
                  {principal}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Typography
                  variant="title"
                  align="center"
                  color="default"
                  style={{ fontWeight: "bold" }}
                >
                  Interest
                </Typography>
                <br />
                <Typography variant="title" align="center" color="default">
                  {interestRate}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Typography
                  variant="title"
                  align="center"
                  color="default"
                  style={{ fontWeight: "bold" }}
                >
                  Duration
                </Typography>
                <br />
                <Typography variant="title" align="center" color="default">
                  {loanTerm}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Typography
                  variant="title"
                  align="center"
                  color="default"
                  style={{ fontWeight: "bold" }}
                >
                  Issue date
                </Typography>
                <br />
                <Typography variant="title" align="center" color="default">
                  {issueDate}
                </Typography>
              </Grid>
            </Grid>
          </Fragment>
          <Typography
            variant="display2"
            gutterBottom
            align="right"
            color="secondary"
          >
            1,120,000/=
          </Typography>
          <Fab
            color="default"
            aria-label="Add"
            className={classes.fab}
            onClick={this.handleOpen}
          >
            <AddIcon />
          </Fab>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    color: "mediumblue",
                    fontSize: 15
                  }}
                >
                  BBF
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    color: "mediumblue",
                    fontSize: 15
                  }}
                >
                  Interest Gained
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    color: "mediumblue",
                    fontSize: 15
                  }}
                >
                  Date returned
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    color: "mediumblue",
                    fontSize: 15
                  }}
                >
                  Amount Paid
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.installmentData.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.bbf}
                  </TableCell>
                  <TableCell align="left">{row.interestGained}</TableCell>
                  <TableCell align="left">{row.dateReturned}</TableCell>
                  <TableCell align="left">{row.amountPaid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
              Add Instalment
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="primary">
              <br />
              <InstallmentForm id={this.props.id} />
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
