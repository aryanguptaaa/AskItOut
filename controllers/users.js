import mongoose from "mongoose";
import User from "../models/User.js";

/*READ */ 
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/*NEW WRITE*/
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = [];
        allUsers.forEach((user) => {
            allUserDetails.push({
                _id: user._id,
                name: user.name,
                about: user.about,
                tags: user.tags,
                noOfQuestionsAsked: user.noOfQuestionsAsked,
                noOfAnswersGiven: user.noOfAnswersGiven,
                savedQuestions: savedQuestions,
            });
        });
        res.status(200).json(allUserDetails);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
};


/*export const getUserFriends = async (req, res) => {
    try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
    );
    res.status(200).json(formattedFriends);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
};
*/

/* UPDATE  
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
*/

/*NEW UPDATE*/

export const updateProfile = async(req,res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User unavailable");
    }

    try{
        const updateProfile = await User.findByIdAndUpdate(
            _id,
            { $set: {name: name, about: about, tags: tags }},
            { new: true }
        );
        res.status(200).json(updateProfile);
    } catch(error) {
        res.status(405).json({ message: error.message });
    }
};