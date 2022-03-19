const Question = require("./../models/questionModel");

exports.createQuestion = async (req, res, next) => {
  const questionContent = req.body.question;
  const createdUser = req.userMongoId;

  const question = {
    questionContent: questionContent,
    createdBy: createdUser,
    createdAt: Date.now(),
  };
  res.redirect("/");
};

exports.getAllQuestions = async (req, res, next) => {};

exports.getQuestion = async (req, res, next) => {};

exports.updateQuestion = async (req, res, next) => {};

exports.deleteQuestion = async (req, res, next) => {};

exports.whiteListQuestion = async (req, res, next) => {};

exports.blackListQuestion = async (req, res, next) => {};

exports.upVoteQuestion = async (req, res, next) => {};

exports.downVoteQuestion = async (req, res, next) => {};
