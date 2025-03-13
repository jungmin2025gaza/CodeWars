const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const index = require("./routes/index");
const problems = require("./routes/problems");
const login = require("./routes/login");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/", index);
app.use("/login", login);
app.use("/problems", problems);

app.use(function (req, res, next) {
  const err = new Error("not found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
