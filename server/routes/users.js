import express from "express";

import { login, signup } from "../controllers/auth.js";
import { getUser, getAllUsers, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//signup and login

router.post("/signup", signup);
router.post("/login", login);

//use user id for the route

router.get("/getAllUsers", getAllUsers);
router.get("/:id", getUser);
router.patch("/update/:id", auth, updateProfile);

export default router;
