import mongoose from "mongoose";
import users from "../models/auth.js";

export const getUser = async (req, res) => {
  try{
      const { id } = req.params;
      const user = await users.findById(id);
      res.status(200).json({ 
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        about: user.about,
        avtarIndex: user.avtarIndex,
        tags: user.tags,
        noOfQuestionsAsked: user.noOfQuestionsAsked,
        noOfAnswersGiven: user.noOfAnswersGiven,
        joinedOn: user.joinedOn,
        myQuestions: user.myQuestions,
        myAnsweredQuestions: user.myAnsweredQuestions,
        savedQuestions: user.savedQuestions,
       });
  } catch (err) {
      res.status(404).json({ message: err.message });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        about: user.about,
        avtarIndex: user.avtarIndex,
        tags: user.tags,
        noOfQuestionsAsked: user.noOfQuestionsAsked,
        noOfAnswersGiven: user.noOfAnswersGiven,
        joinedOn: user.joinedOn,
        myQuestions: user.myQuestions,
        myAnsweredQuestions: user.myAnsweredQuestions,
        savedQuestions: user.savedQuestions,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { firstName, lastName, about, avtarIndex, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          about: about,
          avtarIndex: avtarIndex,
          tags: tags,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
