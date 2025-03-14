const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const logger = require("./config/logger");
const connectDB = require("./config/db");
const passportConfig = require("./config/passport");

dotenv.config();
connectDB();
passportConfig(passport);

const index = require("./routes/index");
const problems = require("./routes/problems");
const login = require("./routes/login");
const register = require("./routes/register");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(flash());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url}`;
  logger.info(logMessage);
  next();
});

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
})

app.use("/", index);
app.use("/login", login);
app.use("/register", register);
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
