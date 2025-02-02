var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// mongodb connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vtudb");

// cors setup
const cors = require("cors");
const corsConfig = {
  origin: true,
  credentials: true,
  exposedHeaders: ["Authorization"],
};
app.use(cors(corsConfig));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

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

app.options("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:51 73");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-COntrol-Allow-headers", [
    "X-Requested-With",
    "content-type",
    "credentials",
  ]);
  res.header("Access-Control-ALlow-Method", "GET, POST, DELETE, PATCH, PUT");
  res.status(200);
  next();
});

module.exports = app;
