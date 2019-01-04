const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const loanRouter = require("./routes/loanRouter");

const app = express();
const port = process.env.PORT || 7000;

// Connecting to the database
//const db = mongoose.connect(process.env.DB_ADDRESS);
const db = mongoose.connect(
  "mongodb://127.0.0.1:27017/loanDB",
  { useNewUrlParser: true }
);

// setting body parser middleware & CORS
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

// API routes
app.use("/api/loans", loanRouter);

// Running the server on preset port
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
