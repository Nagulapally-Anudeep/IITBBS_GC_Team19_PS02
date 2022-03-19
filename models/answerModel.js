const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answerContent: {
    type: String,
    required: [true, "Answer should have content"],
  },
  createdBy: {
    // user ID
    type: String,
    required: [true, "Answer should have unique user"],
  },
  parentQuestionID: {
    type: String,
    required: [true, "Answer should have a unique parent question"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isBlacklisted: {
    type: Boolean,
    default: false,
  },
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
