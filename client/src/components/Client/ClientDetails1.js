import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ProfileInfo from "../Client/ProfileInfo";
import LoanList from "../Loan/LoanList";
import ExpensesList from "../Expenses/ExpensesList";
import firebase from "../common/firebase";

const styles = theme => ({});

class ClientDetails1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // target ID retrieved from another component(ClientList) using onClick event listener from route
      clientID: this.props.match.params.id
    };
  }
  componentDidMount() {
    //console.log(this.state.clientID);

    // Client installment data.
    const loanRef = firebase.database().ref(`loans/${this.state.clientID}`);
  }
  render() {
    //const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid
            item
            xs={3}
            sm={3}
            style={{
              marginLeft: "-2%",
              marginTop: "-2%",
              borderRight: "1px solid #d4d4d4",
              backgroundColor: "white"
            }}
          >
            <br />
            <LoanList id={this.state.clientID} />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            style={{
              marginLeft: "1%"
            }}
          >
            {/* <LoanList /> */}
          </Grid>
          <Grid item xs={3} sm={3}>
            <ProfileInfo />
          </Grid>
        </Grid>
      </div>
    );
  }
}

ClientDetails1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientDetails1);
