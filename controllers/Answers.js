import mongoose from "mongoose";
import Questions from "../models/Question.js";
import User from "../models/User.js";

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered } = req.body;
    const userId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable");
    }
    const user = await User.findById(userId);
    userUpdateNoOfAnswers(userId, user.noOfAnswersGiven+1);
    updateNoOfQuestions(_id, noOfAnswers);
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
            $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
        });
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json("error in updating");
    }
};
// noOfAnswers frontend se +1 krke bhejna yaha bas update hoga increment nhi.

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, {
            $set: { noOfAnswers: noOfAnswers },
        });
    } catch (error) {
        console.log(error);
    }
};


export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;
    const userId = req.userId;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question unavailable");
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("Answer unavailable");
    }
    
    const user = await User.findById(userId);
    userUpdateNoOfAnswers(userId, user.noOfAnswersGiven-1);
    updateNoOfQuestions(_id, noOfAnswers);
    try {
        await Questions.updateOne(
            { _id },
            { $pull: { answer: { _id: answerId } } }
        );
        res.status(200).json({ message: "Successfully deleted."});
    } catch (error) {
        res.status(405).json(error);
    }
};

export const voteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, value } = req.body;
    const userId = req.userId;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question not present." );
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("Answer unavailable");
    }

    try {
        const question = await Questions.findById(_id);
        const answerIndex = question.answer.indexOf( answerId );
        const upIndex = question.answer[answerIndex].upVote.findIndex((id) => id === String(userId));
        const downIndex = question.answer[answerIndex].downVote.findIndex(
            (id) => id === String(userId)
            );

        if (value === "upVote") {
            if(downIndex !== -1) {
                question.answer[answerIndex].downVote = question.answer[answerIndex].downVote.filter(
                    (id) => id === String(userId)
                );
            }
            if(upIndex === -1){
                question.answer[answerIndex].upVote.push(userId);
            } else {
                question.answer[answerIndex].upVote = question.answer[answerIndex].upVote.filter((id) => id !== String(userId));
            }
        } else if (value === "downVote") {
            if (upIndex !== -1) {
                question.answer[answerIndex].upVote = question.answer[answerIndex].upVote.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                question.answer[answerIndex].downVote.push(userId);
            } else {
                question.answer[answerIndex].downVote = question.answer[answerIndex].downVote.filter(
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

const userUpdateNoOfAnswers = async(userId, noOfAnswersGiven) => {
    try{
        await User.findByIdAndUpdate(userId, {
            $set: { noOfAnswersGiven: noOfAnswersGiven },
        });
    } catch(error) {
        console.log(error);
    }
};