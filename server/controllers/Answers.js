import mongoose from "mongoose";
import Questions from "../models/Questions.js";
import users from "../models/auth.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered } = req.body; //send noOfAnswers after increasing original by 1.
  const userId = req.userId;
  const user = await users.findById(userId);
  //console.log(user);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  updateNoOfAnswers(_id, noOfAnswers);
  try {
    user.noOfAnswersGiven = user.noOfAnswersGiven+1;
    //console.log(user.myAnsweredQuestions);
    //console.log("jj");
    user.myAnsweredQuestions.push(_id);
    
    await users.findByIdAndUpdate(userId,user);
    const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

const updateNoOfAnswers = async (_id, noOfAnswers) => {
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
  const userId = req.userId;
  const { answerId, noOfAnswers } = req.body; //send original noOfAnswers - 1
  const user = await users.findById(userId);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }
  updateNoOfAnswers(_id, noOfAnswers);
  try {
    user.myAnsweredQuestions = user.myAnsweredQuestions.filter((id) => id !== String(_id));
    user.noOfAnswersGiven = user.noOfAnswersGiven-1;
    await users.findByIdAndUpdate(userId,user);
    await Questions.updateOne(
      { _id },
      { $pull: { answer: { _id: answerId } } }
    );
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};

export const voteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId , value } = req.body;
  const userId = req.userId;

  if(!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).send("Question not present." );
  }
  if(!mongoose.Types.ObjectId.isValid(answerId)){
      return res.status(404).send("Answer unavailable");
  }

  try {
      const question = await Questions.findById(_id);
      //console.log(question.answer.indexOf(answer._id === answerId));
      const answerIndex = question.answer.findIndex((ans) => answerId === String(ans._id));
      const upIndex = question.answer[answerIndex].upVote.findIndex((id) => id === String(userId));
      const downIndex = question.answer[answerIndex].downVote.findIndex(
          (id) => id === String(userId)
          );

      if (value === "upVote") {
          if(downIndex !== -1) {
            question.answer[answerIndex].downVote = question.answer[answerIndex].downVote.filter(
              (id) => id !== String(userId)
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
      res.status(200).json(question);
  } catch (error) {
      res.status(404).json({ message: "id not found "});
  }
};
