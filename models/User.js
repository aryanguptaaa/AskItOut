import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
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
    avatarName: {
        type: String,
        default: "DefaultAvtar.png",
    },
    about: {type: String },
    tags: {type: [String] }, // tags means tech stack
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
        default: [],
    },
},
{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;