import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import LoanForm from "../Loan/LoanForm";

import firebase from "../common/firebase";

const styles = theme => ({
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
    maxWidth: 427,
    //maxWidth: "24%",
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

class LoanList extends React.Component {
  constructor() {
    super();
    this.state = {
      loanData: [],

      loanID: "",
      principal: "",
      interestRate: "",
      issueDate: "",
      loanTerm: "",
      collateral: ""
    };
  }

  componentDidMount() {
    // target ID retrieved from another component(ClientList) using onClick event listener from route
    //console.log(this.props.id);
    const key = this.props.id;

    const loansRef = firebase.database().ref(`loans/${key}`);
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

    return (
      <React.Fragment>
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

        <List className={classes.root}>
          {this.state.loanData.map(loan => (
            <ListItem button className={classes.message}>
              <ListItemText
                classes={{
                  primary: classes.primary,
                  secondary: classes.secondary
                }}
                primary={"Principal: " + loan.principal}
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
          ))}
        </List>

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
              Add Loan
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="primary">
              <br />
              <LoanForm id={this.props.id} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LoanList);
