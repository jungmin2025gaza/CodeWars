const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const logger = require("./config/logger");
const connectDB = require("./config/db");

dotenv.config();
connectDB();


const index = require("./routes/index");
const problems = require("./routes/problems");
const login = require("./routes/login");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url}`;
  logger.info(logMessage);
  next();
});

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

  logger.error(`${err.status || 500} ${err.message} ${req.originalUrl} ${req.method}`);
  res.render("error");
});

module.exports = app;
