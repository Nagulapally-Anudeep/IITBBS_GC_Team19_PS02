const User = require("./../models/userModel");
const Question = require("./../models/questionModel");
const Answer = require("../models/answerModel");

exports.blackListUser = async (req, res, next) => {
	
};

exports.whiteListUser = async (req, res, next) => {};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const userQuestions = await Question.find({ createdBy: user._id });
  const userAnswers = await Answer.find({ createdBy: user._id });
  res.render("user", {
    user,
    userQuestions,
    userAnswers,
  });
};
