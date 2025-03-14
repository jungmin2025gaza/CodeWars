const express = require("express");
const router = express.Router();
const loginController = require("./controllers/login.controller");
const { forwardAuthenticated, ensureAuthenticated } = require("../config/auth");

router.route("/")
  .get(forwardAuthenticated, loginController.login)
  .post(loginController.postLogin);

module.exports = router;
