import React, { Component, Fragment } from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import firebase from "../common/firebase";
import * as moment from "moment";

import HighchartsReact from "highcharts-react-official";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zoom: "80%"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class LoanReport extends Component {
  constructor() {
    super();
    this.state = {
      chartOptions: {
        xAxis: {
          title: {
            text: "Timeline"
          },
          categories: ["Today", "Week", "Month", "Cummulative"]
        },
        chart: {
          type: "column"
        },

        yAxis: {
          title: {
            text: "Totals"
          }
        },
        title: {
          text: "Loans' Report"
        },
        series: [{ data: [] }]
      }
    };
  }
  componentDidMount() {
    // Get value of procurement provided
    const query = firebase
      .database()
      .ref("loans")
      .orderByKey();
    query.on("value", snapshot => {
      let todayCounter = 0;
      let weekCounter = 0;
      let monthCounter = 0;
      let cummulativeCounter = 0;

      snapshot.forEach(childSnapshot => {
        // Get values for day, month and cummulative

        childSnapshot.forEach(grandChildSnapshot => {
          const created = grandChildSnapshot.child("created").val();
          const isToday = moment(created, "DD/MM/YYYY").isSame(
            Date.now(),
            "day"
          );
          const isWeek = moment(created, "DD/MM/YYYY").isSame(
            Date.now(),
            "week"
          );
          const isMonth = moment(created, "DD/MM/YYYY").isSame(
            Date.now(),
            "month"
          );

          isToday
            ? (todayCounter =
                todayCounter +
                parseInt(grandChildSnapshot.child("principal").val()))
            : (todayCounter = todayCounter + 0);

          isWeek
            ? (weekCounter =
                weekCounter +
                parseInt(grandChildSnapshot.child("principal").val()))
            : (weekCounter = weekCounter + 0);

          isMonth
            ? (monthCounter =
                monthCounter +
                parseInt(grandChildSnapshot.child("principal").val()))
            : (monthCounter = monthCounter + 0);

          console.log(isToday);

          //console.log(moment(created, "DD/MM/YYYY").fromNow());

          // Cummulative counter
          cummulativeCounter =
            cummulativeCounter +
            parseInt(grandChildSnapshot.child("principal").val());
        });
      });

      this.setState({
        chartOptions: {
          series: [
            {
              data: [
                todayCounter,
                weekCounter,
                monthCounter,
                cummulativeCounter
              ]
            }
          ]
        }
      });
    });
  }
  render() {
    const { classes } = this.props;
    const { chartOptions } = this.state;

    return (
      <Fragment>
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardActionArea>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </CardActionArea>
          </Card>
        </div>
      </Fragment>
    );
  }
}

LoanReport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoanReport);
