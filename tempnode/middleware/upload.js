const util = require("util");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/database/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = uploadFileMiddleware;
