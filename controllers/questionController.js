const Question = require("./../models/questionModel");
const Answer = require("./../models/answerModel");
const User = require("../models/userModel");

exports.createQuestion = async (req, res, next) => {
  console.log(req.body);
  const questionContent = req.body.postContent;
  const createdUserID = req.body.questionSubmit;
  const createdUser = await User.findById(createdUserID);

  const question = {
    questionContent: questionContent,
    createdBy: createdUserID,
    createdByName: createdUser.name,
    createdAt: Date.now(),
    createdByPic: createdUser.profilePicture,
  };

  console.log(question);

  const questionCreated = await Question.create(question);
  const userQuestionsList = createdUser.questionIDs;
  userQuestionsList.push(questionCreated._id);

  await User.findByIdAndUpdate(
    createdUserID,
    { $set: { questionIDs: userQuestionsList } },
    { new: true }
  );

  res.redirect("/");
};

// exports.getAllQuestions = async (req, res, next) => {
//   const questions = await Question.find();
//   console.log("hiiii", "\n\n", req.user);
//   res.render("home", { questions: questions, user: req.user });
// };

// exports.getQuestion = async (req, res, next) => {
//   const question = await Question.findById(req.params.id);
//   const ansIDs = question.answerIDs;

//   let answers = ansIDs.map(async (ele) => {
//     const answer = await Answer.findById(ele);
//     return answer;
//   });

//   res.render("forum", {
//     question: question,
//     answers: answers,
//   });
// };

exports.whiteListQuestion = async (req, res, next) => {};

exports.blackListQuestion = async (req, res, next) => {};

exports.upVoteQuestion = async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  // const user = await User.findById(req.body.userID);
  if(question.downVotedBy.includes(req.body.userID)){
    question.downVotedBy.pop(req.body.userID);
    await Question.findByIdAndUpdate(question._id, {$set: {downVotedBy}}, { new: true });
    await Question.findByIdAndUpdate(question._id, {$inc: {downVotes: -1}, $}, { new: true });
  }
  if(!question.upVotedBy.includes(req.body.userID)){
    question.upVotedBy.push(req.body.userID);
    await Question.findByIdAndUpdate(question._id, {$set: {upVotedBy}}, { new: true });
    await Question.findByIdAndUpdate(question._id, {$inc: {upVotes: 1}, $}, { new: true });
    
  }else{
    question.upVotedBy.pop(req.body.userID);
    await Question.findByIdAndUpdate(question._id, {$set: {upVotedBy}}, { new: true });
    await Question.findByIdAndUpdate(question._id, {$inc: {upVotes: -1}, $}, { new: true });
  }

  res.redirect("/");
};

exports.downVoteQuestion = async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  // const user = await User.findById(req.body.userID);
  if(question.upVotedBy.includes(req.body.userID)){
    question.upVotedBy.pop(req.body.userID);
    await Question.findByIdAndUpdate(question._id, {$set: {upVotedBy}}, { new: true });
    await Question.findByIdAndUpdate(question._id, {$inc: {upVotes: -1}, $}, { new: true });
  }
  if(!question.downVotedBy.includes(req.body.userID)){
    question.downVotedBy.push(req.body.userID);
    await Question.findByIdAndUpdate(question._id, {$set: {downVotedBy}}, { new: true });
    await Question.findByIdAndUpdate(question._id, {$inc: {downVotes: 1}, $}, { new: true });
    
  }else{
    question.downVotedBy.pop(req.body.userID);
    await Question.findByIdAndUpdate(question._id, {$set: {downVotedBy}}, { new: true });
    await Question.findByIdAndUpdate(question._id, {$inc: {downVotes: -1}, $}, { new: true });
  }

  res.redirect("/");
};
