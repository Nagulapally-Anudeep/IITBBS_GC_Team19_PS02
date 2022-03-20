const Question = require("./../models/questionModel");
const Answer = require("./../models/answerModel");
const User = require("../models/userModel");

exports.createAnswer = async (req, res, next) => {
  const answerContent = req.body.postContent;
  const createdUserID = req.body.answerSubmit;
  const createdUser = await User.findById(createdUserID);
  const parentQuestionID = req.body.parentQuestion;
  const parentQuestion = await Question.findById(parentQuestionID);

  const answer = {
    answerContent: answerContent,
    createdBy: createdUserID,
    createdByName: createdUser.name,
    createdAt: Date.now(),
    createdByPic: createdUser.profilePicture,
    parentQuestionID: parentQuestionID,
  };
  //   console.log(answer);
  const answerCreated = await Answer.create(answer);
  const answerIDList = parentQuestion.answerIDs;
  answerIDList.push(answerCreated._id);

  await Question.findByIdAndUpdate(
    parentQuestionID,
    { $set: { answerIDs: answerIDList } },
    { new: true }
  );

  const userAnswerList = createdUser.answerIDs;
  userAnswerList.push(answerCreated._id);

  await User.findByIdAndUpdate(
    createdUserID,
    { $set: { answerIDs: userAnswerList } },
    { new: true }
  );

  res.redirect(`/question/${parentQuestionID}`);
};

exports.getAllAnswers = async (req, res, next) => {};

exports.updateAnswer = async (req, res, next) => {};

exports.deleteAnswer = async (req, res, next) => {};

exports.upVoteAnswer = async (req, res, next) => {};

exports.downVoteAnswer = async (req, res, next) => {};

exports.blackListAnswer = async (req, res, next) => {};

exports.whiteListAnswer = async (req, res, next) => {};
