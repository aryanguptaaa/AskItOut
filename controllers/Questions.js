import Questions from "../models/Question.js";
import mongoose from "mongoose";
import User from "../models/User.js";

export const AskQuestion = async (req, res) => {
    const postQuestionData =req.body;
    const userId = req.userId;
    const postQuestion = new Questions({ ...postQuestionData, userId });
    try {
        await postQuestion.save();
        const user = await User.findById(userId);
        userUpdateNoOfQuestions(userId, user.noOfQuestionsAsked+1);

        res.status(200).json("Posted a question successfully.");
    } catch(err) {
        console.log(err);
        res.status(409).json("Could not post question.");
    }
};

export const getAllQuestions = async (req, res) => {
    try {
        const questionList = await Questions.find().sort({ askedOn: -1 });
        res.status(200).json(questionList);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const userId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question not present.");
    }

    try {
        await Questions.findByIdAndRemove(_id);
        const user = await User.findById(userId);
        userUpdateNoOfQuestions(userId, user.noOfQuestionsAsked-1);
        res.status(200).json({ message: "successfully deleted." });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value } = req.body;
    const userId = req.userId;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question not present." );
    }

    try {
        const question = await Questions.findById(_id);
        const upIndex = question.upVote.findIndex((id) => id === String(userId));
        const downIndex = question.downVote.findIndex(
            (id) => id === String(userId)
            );

        if (value === "upVote") {
            if(downIndex !== -1) {
                question.downVote = question.downVote.filter(
                    (id) => id === String(userId)
                );
            }
            if(upIndex === -1){
                question.upVote.push(userId);
            } else {
                question.upVote = question.upVote.filter((id) => id !== String(userId));
            }
        } else if (value === "downVote") {
            if (upIndex !== -1) {
                question.upVote = question.upVote.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                question.downVote.push(userId);
            } else {
                question.downVote = question.downVote.filter(
                    (id) => id !== String(userId)
                );
            }
        }
        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json({ message: "voted successfully "});
    } catch (error) {
        res.status(404).json({ message: "id not found "});
    }
};

const userUpdateNoOfQuestions = async(userId, noOfQuestionsAsked) => {
    try{
        await User.findByIdAndUpdate(userId, {
            $set: { noOfQuestionsAsked: noOfQuestionsAsked },
        });
        res.status(200).json({ message: "updated successfully "});
    } catch(error) {
        console.log(error);
    }
};

export const saveQuestion = async (req,res) => {
    const { id: _id } = req.params;
    const userId = req.userId;

    try {
        const question = await Questions.findById(_id);
        const user = await User.findById(userId);
        const present = user.savedQuestions.findIndex(
            (id) => id === String(_id)
            );
        if(present === -1){
            user.savedQuestions.push(_id);
        }  else {
            user.savedQuestions = user.savedQuestions.filter((id) => id !== String(_id));
        }
        await User.findByIdAndUpdate(userId, user );
    } catch (error) {
        res.status(404).json({ message: "Id not found "});
    }
};