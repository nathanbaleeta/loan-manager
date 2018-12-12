import React from "react";
import API from "./Api";
import MUIDataTable from "mui-datatables";

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
        name: "Phone",
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
      count: count
    };

    return (
      <MUIDataTable
        title={"Debitors' list"}
        data={data.map(loan => {
          return [
            loan.clientName,
            loan.phone,
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
