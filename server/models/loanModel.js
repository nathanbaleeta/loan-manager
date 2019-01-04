const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const loanModel = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone1: {
    type: String,
    required: true
  },
  phone2: {
    type: String,
    required: true
  },
  address: { type: String },
  principal: {
    type: Number,
    min: 0
  },
  interestRate: {
    type: Number,
    min: 0
  },
  dateLoanGiven: { type: Date, default: Date.now },
  loanTerm: {
    type: Number,
    min: 1
  },
  loanType: { type: String },
  collateral: [String]
});

module.exports = mongoose.model("loans", loanModel);
