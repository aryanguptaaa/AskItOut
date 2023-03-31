import express from 'express';
import { postAnswer, deleteAnswer } from "../controllers/Answers.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.patch("/post/:id", verifyToken, postAnswer);
router.patch("/delete/:id", verifyToken, deleteAnswer);

export default router;