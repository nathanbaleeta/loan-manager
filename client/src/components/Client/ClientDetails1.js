import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ProfileInfo from "../Client/ProfileInfo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

import LoanForm from "../Loan/LoanForm";

//import InstallmentForm from "../Installment/InstallmentForm";
import InstallmentList from "../Installment/InstallmentList";

import { Switch, Route } from "react-router-dom";

import firebase from "../common/firebase";
import numeral from "numeral";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  avatar: {
    margin: 10
  },

  //Style the scrollbar
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.3)",
      outline: "1px solid slategrey"
    }
  },
  root: {
    width: "100%",
    height: "100%",
    //maxWidth: 427,
    maxWidth: "24%",
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    overflow: "auto",
    maxHeight: "100%",
    borderRight: "1px solid #d4d4d4",
    paddingLeft: "1%"
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  message: {
    borderTop: "1px solid #d4d4d4"
    /* "&:hover": {
        background: "#D23E56",
        color: "white"
      } */
  },
  fab: {
    marginLeft: "7%",
    marginBottom: "2%"
  },
  link: {
    textDecoration: "none"
  },

  // Overiding CSS with classnames for ListItemText Implementation
  primary: {
    fontSize: "20px",
    fontWeight: "bold"
  },
  secondary: {
    fontSize: "18px",
    color: "black"
  }
});

class ClientDetails1 extends Component {
  state = {
    // target ID retrieved from another component(ClientList) using onClick event listener from route
    clientID: this.props.match.params.id,
    loanData: [],
    loanID: ""
  };

  componentDidMount() {
    const loansRef = firebase.database().ref(`loans/${this.state.clientID}`);
    loansRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          loanID: item,
          principal: items[item].principal,
          interestRate: items[item].interestRate,
          issueDate: items[item].issueDate,
          loanTerm: items[item].loanTerm,
          collateral: items[item].collateral
        });
      }

      //console.log(newState);
      this.setState({
        loanData: newState
      });
      console.log(this.state.loanData);
    });
  }

  getLoanInstallments(id) {
    console.log(id);
    this.setState({
      loanID: id
    });
  }

  // remove commas using regular expressions before saving to firebase
  removeCommas(str) {
    let result = str.replace(/,/g, "");
    return Number(result);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const { clientID, loanData } = this.state;

    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid
            item
            xs={3}
            sm={3}
            style={{
              marginLeft: "-2%",
              marginTop: "-2%"
              //borderRight: "1px solid #d4d4d4",
              //backgroundColor: "white"
            }}
          >
            {/* LoanList */}
            <List className={classes.root}>
              <br />
              <Typography
                variant="display1"
                gutterBottom
                align="center"
                color="primary"
              >
                Loan history
              </Typography>

              <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                onClick={this.handleOpen}
              >
                <AddIcon />
              </Fab>
              {loanData.map(loan => (
                <Link
                  to={`/clients/${clientID}/loans/${loan.loanID}`}
                  className={classes.link}
                >
                  <ListItem
                    button
                    className={classes.message}
                    onClick={this.getLoanInstallments.bind(this, loan.loanID)}
                  >
                    <ListItemText
                      classes={{
                        primary: classes.primary,
                        secondary: classes.secondary
                      }}
                      primary={
                        "Principal: " +
                        numeral(loan.principal).format("0,0[.]00") +
                        "/="
                      }
                      secondary={
                        <React.Fragment>
                          {"Interest: " + loan.interestRate + "%"}
                          <br />
                          {"Duration: " + loan.loanTerm + " months"}
                          <br />
                          {"Issue date: " + loan.issueDate}
                          <br />

                          {/*{"Collateral: " + loan.collateral} */}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Link>
              ))}
            </List>

            {/* LoanList */}
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            style={{
              marginLeft: "1%",
              marginRight: "1%"
            }}
          >
            <Switch>
              <Route
                path="/clients/:id/loans/:id"
                //component={InstallmentList}
              />
            </Switch>

            <InstallmentList id={this.state.loanID} />
          </Grid>
          <Grid item xs={3} sm={3}>
            <ProfileInfo id={this.state.clientID} />
          </Grid>
        </Grid>

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
              Add Loan
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="primary">
              <br />
              <LoanForm id={this.state.clientID} />
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

ClientDetails1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientDetails1);
