const express = require("express");
const router = express.Router();
const registerController = require("./controllers/register.controller");
const { forwardAuthenticated } = require("../config/auth");

router.route("/")
  .get(forwardAuthenticated, registerController.register)
  .post(registerController.postRegister);

module.exports = router;
