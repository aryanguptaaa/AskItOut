import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
    {
        questionTitle: {
            type: String,
            required: "Question should have a title",
        },
        questionBody: {
            type: String,
            required: "Question should have a body",
        },
        questionTags: {
            type: [String],
            required: "Question should have tags",
        },
        noOfAnswers: {
            type: Number,
            dafault: 0,
        },
        picturePath: {
            type: String,
            required: false,
        },
        upVote: {
            type: [String],
            dafault: [],
        },
        downVote: {
            type: [String],
            dafault: [],
        },
        userPosted: {
            type: String,
            required: "Question must have an author",
        },
        userId: {
            type: String,
        },
        askedOn: {
            type: Date,
            default: Date.now,
        },
        answer: [
            {
                answerBody: String,
                userAnswered: String,
                userId: String,
                answeredOn: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    }
);

const Question = mongoose.model("Question",QuestionSchema);
export default Question;