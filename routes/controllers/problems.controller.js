const Problem = require("../../models/Problem");

exports.getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find();

    return res.render("index", { problems: problems, id: null });
  } catch (err) {
    next(err);
  }
};

exports.getProblemById = async (req, res, next) => {
  try {
    const problems = [];
    const problem = await Problem.findOne({ _id: req.params.id });
    problems.push(problem);

    return res.render("index", { problems: problems, id: req.params.id });
  } catch (err) {
    next(err);
  }
};

exports.judge = async (req, res, next) => {
  try {
    const userCode = req.body.code;
    if (!userCode) {
      const error = new Error("user code is missing!");
      return next(error);
    }

    const problem = await Problem.findOne({ _id: req.params.id });
    if (!problem) {
      const error = new Error("problem with given id not found");
      return next(error);
    }

    let runningUserCode;
    try {
      runningUserCode = Function(userCode)();
    } catch (err) {
      const error = new Error("user code execution failed");
      return next(error);
    }

    for (const test of problem.tests) {
      const testCode = test.code;
      const solution = test.solution;
      let userSolution;
      try {
        userSolution = eval(testCode);
        console.log("userSOlution", userSolution);
      } catch (err) {
        const error = new Error(`${testCode} execution failed: ${err.message}`);
        return next(error);
      }

      const errorMessg = `${testCode} 테스트에서 ${solution}를 결과로 가져야 하는데 ${userSolution}이 출력되었네요...!`;
      if (userSolution !== solution) {
        return res.render("failure", { error: null, message: errorMessg });
      }
    }

    return res.render("success");
  } catch (err) {
    next(err);
  }
};
