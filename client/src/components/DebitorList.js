import React from "react";
import Chip from '@material-ui/core/Chip';
import API from "./Api";
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./mui-datatables/CustomToolbar";

export default class DebitorList extends React.Component {

  state = {
    count: 100,
    data: []
  };

   componentDidMount() {
    API.get("loans").then(res => {
      const data = res.data;
      this.setState({ data });
    });
   }

   componentDidUpdate() {
    // only update table if the data has changed
    API.get("loans").then(res => {
      const data = res.data;
      this.setState({ data });
    });
      
    }

  render() {
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
        name: "Phone 2",
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
        name: "Loan Type",
        options: {
          filter: true,
          sort: false
        }
      },
      {
        name: "Collateral",
        options: {
          filter: true,
          sort: false
        }
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
        return (
          <CustomToolbar />
        );
      }
    };

    return (
   

      <MUIDataTable
        title={"Debitors' list"}
        data={data.map(loan => {
          return [
            loan.lastName + " " + loan.firstName,
            <Chip label={ loan.phone1} color="primary" variant="outlined"/>, 
            <Chip label={ loan.phone2} color="primary" variant="outlined"/>, 
            loan.address,
            loan.principal,
            loan.interestRate,
            loan.dateLoanGiven,
            loan.loanTerm,
            loan.loanType,
            loan.collateral
          ];
        })}
        columns={columns}
        options={options}
      />
    );
  }
}

