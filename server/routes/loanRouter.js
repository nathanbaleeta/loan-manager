const express = require("express");
const Loan = require("../models/loanModel");

const loanRouter = express.Router();
loanRouter.route("/").get((req, res) => {
  Loan.find({}, (err, loans) => {
    res.json(loans);
  });
});

module.exports = loanRouter;
