const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user should have a valid name"],
  },
  email: {
    type: String,
    required: [true, "A user should have a valid email"],
  },
  isBlacklisted: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  questionIDs: [String], //list of questions user posted
  answerIDs: [String], //list of answers user posted
  profilePicture: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
