const Question = require("./../models/questionModel");
const Answer = require("./../models/answerModel");
const User = require("../models/userModel");

exports.createQuestion = async (req, res, next) => {
  const questionContent = req.body.question;
  const createdUser = req.user._id;

  const question = {
    questionContent: questionContent,
    createdBy: createdUser,
    createdAt: Date.now(),
  };

  await Question.create(question);

  res.redirect("/");
};

// exports.getAllQuestions = async (req, res, next) => {
//   const questions = await Question.find();
//   console.log("hiiii", "\n\n", req.user);
//   res.render("home", { questions: questions, user: req.user });
// };

exports.getQuestion = async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  const ansIDs = question.answerIDs;

  let answers = ansIDs.map(async (ele) => {
    const answer = await Answer.findById(ele);
    return answer;
  });

  res.render("forum", {
    question: question,
    answers: answers,
  });
};

exports.updateQuestion = async (req, res, next) => {};

exports.deleteQuestion = async (req, res, next) => {};

exports.whiteListQuestion = async (req, res, next) => {};

exports.blackListQuestion = async (req, res, next) => {};

exports.upVoteQuestion = async (req, res, next) => {};

exports.downVoteQuestion = async (req, res, next) => {};
