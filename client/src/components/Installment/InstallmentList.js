import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//import firebase from "../common/firebase";

const styles = theme => ({});

class InstallmentList extends Component {
  state = { installmentData: [] };

  componentDidMount() {
    // target client ID retrieved from another component using onClick event listener from route
    const key = this.props.match.params.id;
    console.log(key);
    //this.setState({ targetClientID: key });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "mediumblue",
                    fontSize: 17
                  }}
                >
                  BBF
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    color: "mediumblue",
                    fontSize: 17
                  }}
                >
                  Interest Gained
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    color: "mediumblue",
                    fontSize: 17
                  }}
                >
                  Date returned
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    color: "mediumblue",
                    fontSize: 17
                  }}
                >
                  Price per Kg
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    color: "mediumblue",
                    fontSize: 17
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
                    {row.advanceBalance}
                  </TableCell>
                  <TableCell align="left">{row.cashAvailabletoday}</TableCell>
                  <TableCell align="left">{row.coffeeType}</TableCell>
                  <TableCell align="left">{row.pricePerKg}</TableCell>
                  <TableCell align="left">{row.totalValueSale}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(InstallmentList);
