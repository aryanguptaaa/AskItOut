import express from 'express';
import {
    AskQuestion,
    getAllQuestions,
    deleteQuestion,
    voteQuestion,
    saveQuestion,
} from "../controllers/Questions.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/Ask", verifyToken, AskQuestion);
router.get("/get", getAllQuestions);
router.delete("/delete/:id", verifyToken, deleteQuestion);
router.patch("/vote/:id", verifyToken, voteQuestion);
router.patch("/save/:id", verifyToken, saveQuestion);

export default router;