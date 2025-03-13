const Problem = require("../../models/Problem");

exports.getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find();
    return res.render("index");
  } catch (error) {
    next(error);
  }
};

exports.getProblemById = async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ _id: req.params.id });
    console.log("problem", problem);
    return res.render("index");
  } catch (error) {
    next(error);
  }
};

exports.judge = async (req, res, next) => {
  try {
    console.log("judge being called");
    return;
  } catch (error) {
    next(error);
  }
}
