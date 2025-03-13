const express = require("express");
const router = express.Router();

const problemsController = require("./controllers/problems.controller");

router.get("/", problemsController.getAllProblems);

router.route("/:id")
  .get(problemsController.getProblemById)
  .post(problemsController.judge);

module.exports = router;
