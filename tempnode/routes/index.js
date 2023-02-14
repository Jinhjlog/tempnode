var express = require("express");
var router = express.Router();
const maria = require("../maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
  maria.run("select * from test;");
});

module.exports = router;

// const bodyParser = require("body-parser");

// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
