const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const index = require("./routes/index");
const problems = require("./routes/problems");
const login = require("./routes/login");

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
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
