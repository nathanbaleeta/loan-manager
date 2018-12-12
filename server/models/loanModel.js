const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const loanModel = new Schema({
  clientName: { type: String },
  phone: { type: String },
  address: { type: String },
  principal: { type: Number },
  interestRate: { type: Number },
  dateLoanGiven: { type: Date, default: Date.now },
  loanTerm: { type: Number },
  loanType: { type: String },
  collateral: [String]
});

module.exports = mongoose.model("loans", loanModel);
