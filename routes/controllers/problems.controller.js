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

    let solution;
    try {
      solution = new Function(userCode)();
    } catch (err) {
      const error = new Error("Oops...code given, execution failed");
      return next(error);
    }

    for (const test of problem.tests) {
      const testCode = test.code;
      const solutionForCode = test.solution;

      let userSolution;
      try {
        userSolution = eval(testCode);
      } catch (err) {
        const errorMessg = `실행할 수 없는 코드를 작성하셨네요...>_< 다시 시도하세요!`;
        return res.render("failure", { error: err, message: errorMessg });
      }

      const errorMessg = `${testCode} 테스트에서 ${solutionForCode}를 결과로 가져야 하는데 ${userSolution}이 출력되었네요...!`;
      if (userSolution !== solutionForCode) {
        return res.render("failure", { error: null, message: errorMessg });
      }
    }

    return res.render("success");
  } catch (err) {
    next(err);
  }
};
