import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*REGISTER USER*/
export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            about,
        } = req.body;

            const existinguser = await User.findOne({ email });
            if(existinguser) {
                return res.status(404).json({ message: " User already exists. "});
            }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            avatarName,
            about,
            tags,
            noOfQuestionsAsked: 0,
            noOfAnswersGiven: 0,
            savedQuestions,
            myQuestions,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/*LOG IN */
export const login = async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({ msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    } catch(err){
        res.status(500).json({ error: err.message });
    }
}