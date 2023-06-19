import express from "express";

import { postAnswer, deleteAnswer , voteAnswer } from "../controllers/Answers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.patch("/post/:id", auth, postAnswer);
router.patch("/delete/:id", auth, deleteAnswer);
router.patch("/vote/:id", auth, voteAnswer);

export default router;
