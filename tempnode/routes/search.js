var express = require("express");
const maria = require("../maria");

var router = express.Router();
var publicPath = "C:\\ai_exam\\tempnode\\tempnode\\public\\";

router.get("/search", function (req, res) {
  res.sendFile(publicPath + "search.html");
});

module.exports = router;
