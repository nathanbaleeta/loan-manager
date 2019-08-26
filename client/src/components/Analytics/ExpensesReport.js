import React from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

//import firebase from "../common/firebase";
//import * as moment from "moment";

import HighchartsReact from "highcharts-react-official";

const styles = theme => ({
  root: {
    flexGrow: 1
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

class ExpensesReport extends React.Component {
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
          text: "Expenses Report"
        },
        series: [{ data: [12, 90, 43, 90] }]
      }
    };
  }
  componentDidMount() {}
  render() {
    const { classes } = this.props;
    const { chartOptions } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

ExpensesReport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExpensesReport);
