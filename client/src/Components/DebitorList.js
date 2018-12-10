import React from "react";
import API from "./api";
import MUIDataTable from "mui-datatables";

export default class DebitorList extends React.Component {
  state = {
    page: 0,
    count: 100,
    data: []
  };

  componentDidMount() {
    API.get("users").then(res => {
      const data = res.data;
      this.setState({ data });
    });
  }

  render() {
    const columns = [
      "Name",
      "Title",
      "Location",
      "Company",
      "Address",
      "City",
      "Zipcode"
    ];
    const { data, page, count } = this.state;

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      serverSide: true,
      count: count
    };

    return (
      <MUIDataTable
        title={"Debitors' list"}
        data={data.map(user => {
          return [
            user.name,
            user.email,
            user.phone,
            user.company.name,
            user.address.street,
            user.address.city,
            user.address.zipcode
          ];
        })}
        columns={columns}
        options={options}
      />
    );
  }
}
