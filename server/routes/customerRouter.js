const express = require("express");
const Customer = require("../models/customerModel");

const customerRouter = express.Router();
customerRouter.route("/").get((req, res) => {
  Customer.find({}, (err, customers) => {
    res.json(customers);
  });
});

module.exports = customerRouter;
