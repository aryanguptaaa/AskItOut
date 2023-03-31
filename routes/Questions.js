import express from 'express';
import {
    AskQuestion,
    getAllQuestions,
    deleteQuestion,
    voteQuestion,
} from "../controllers/Questions.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

//router.post("/Ask", verifyToken, AskQuestion);
router.get("/get", getAllQuestions);
router.delete("/delete/:id", verifyToken, deleteQuestion);
router.patch("/vote/:id", verifyToken, voteQuestion);

export default router;