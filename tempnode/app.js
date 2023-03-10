var createError = require("http-errors");
var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userApiRouter = require("./routes/userApi");
var mainRouter = require("./routes/main");
var searchRouter = require("./routes/search");

var app = express();

// 파일 다운로드 관련
global.__basedir = __dirname;

/*mariadb 연결*/
const maria = require("./maria");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ./routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", userApiRouter);
app.use("/", searchRouter);
app.use("/", mainRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
