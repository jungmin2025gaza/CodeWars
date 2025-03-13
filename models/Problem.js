const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  code: String,
  solution: String,
});

const ProblemSchema = new mongoose.Schema({
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  tests: [TestSchema],
});

module.exports = mongoose.model("Problem", ProblemSchema);
