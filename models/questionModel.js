const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  //date time
  questionContent: {
    type: String,
  },
  createdBy: {
    //user id
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answerIDs: [String],
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

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
