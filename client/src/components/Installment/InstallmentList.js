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

import firebase from "../common/firebase";

const styles = theme => ({
  fab: {
    marginLeft: "3%",
    marginBottom: "2%"
  }
});

class InstallmentList extends Component {
  state = {
    loanID: this.props.id,
    installmentData: []
  };

  componentDidMount() {
    console.log(this.props.id);

    const installmentsRef = firebase
      .database()
      .ref(`installments/${this.state.loanID}`);
    installmentsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          loanID: item,
          bbf: items[item].bbf,
          interestGained: items[item].interestGained,
          dateReturned: items[item].dateReturned,
          amountPaid: items[item].amountPaid
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

    return (
      <Fragment>
        <Paper className={classes.tableRoot}>
          <br />
          <Typography
            variant="display1"
            gutterBottom
            align="center"
            color="primary"
          >
            Instalments record
          </Typography>

          <Fab
            color="primary"
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
