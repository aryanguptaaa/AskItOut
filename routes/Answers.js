import express from 'express';
import { postAnswer, deleteAnswer, voteAnswer } from "../controllers/Answers.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.patch("/post/:id", verifyToken, postAnswer);
router.patch("/delete/:id", verifyToken, deleteAnswer);
router.patch("/vote/:id", verifyToken, voteAnswer);

export default router;