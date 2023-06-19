import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  avtarIndex: {
    type: Number,
    default: 0,
  },
  about: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
    default: [],
  }, // tags means tech stack
  noOfQuestionsAsked: {
    type: Number,
    default: 0,
  },
  noOfAnswersGiven: {
    type: Number,
    default: 0,
  },
  savedQuestions: {
    type: [String],
  },
  myQuestions: {
    type: [String],
  },
  myAnsweredQuestions: {
    type: [String],
  },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
