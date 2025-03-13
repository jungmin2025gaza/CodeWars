const Problem = require("../../models/Problem");

exports.getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find();

    return res.render("index", { problems: problems, id: null });
  } catch (error) {
    next(error);
  }
};

exports.getProblemById = async (req, res, next) => {
  try {
    const problems = [];
    const problem = await Problem.findOne({ _id: req.params.id });
    problems.push(problem);

    return res.render("index", { problems: problems, id: req.params.id });
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
};
