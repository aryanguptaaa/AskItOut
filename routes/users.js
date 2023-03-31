import express from 'express';
import { register, login } from "../controllers/auth.js";
import {
    getUser,
    getAllUsers,
    updateProfile,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

/* READ */ 
router.get("/:id", verifyToken, getUser);
router.get("/getAllUsers", verifyToken, getAllUsers);

/*UPDATE*/
router.patch("/update/:id", verifyToken, updateProfile);

export default router;
