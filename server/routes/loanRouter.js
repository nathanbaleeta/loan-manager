const express = require("express");
const Loan = require("../models/loanModel");

const loanRouter = express.Router();

// GET all loans
loanRouter
  .route("/")
  .get((req, res) => {
    Loan.find({}, (err, loans) => {
      res.json(loans);
    });
  })
  .post((req, res) => {
    let loan = new Loan(req.body);
    loan.save();
    res.status(201).send(loan);
  });

loanRouter.route("/:loanId").get((req, res) => {
  Loan.findById(req.params.loanId, (err, loan) => {
    res.json(loan);
  });
});

module.exports = loanRouter;
