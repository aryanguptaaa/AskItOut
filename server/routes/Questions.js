import express from "express";

import {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
  saveQuestion,
} from "../controllers/Questions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/ask", auth, AskQuestion);
router.get("/get", getAllQuestions);

//Use id of questions for the routes

router.delete("/delete/:id", auth, deleteQuestion);
router.patch("/vote/:id", auth, voteQuestion);
router.patch("/save/:id", auth, saveQuestion);

export default router;
