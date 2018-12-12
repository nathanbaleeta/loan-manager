var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.json([
    {
      id: 1,
      title: "Alice's Adventures in Wonderland",
      author: "Charles Lutwidge Dodgson"
    },
    {
      id: 2,
      title: "Einstein's Dreams",
      author: "Alan Lightman"
    }
  ]);
});

module.exports = router;
