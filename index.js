import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from "./routes/users.js";
//import { register } from "./controllers/auth.js";
import { verifyToken } from './middleware/auth.js';
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import { AskQuestion } from './controllers/Questions.js';
import User from "./models/User.js";
import Question from './models/Question.js';
import { users, questions } from "./data/index.js";

/*CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors);
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/*FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/*ROUTES WITH FILES*/
//app.post("/auth/register", upload.single("picture"), register);
app.post("/Ask", verifyToken, upload.single("picture"), AskQuestion );

/*ROUTES*/
app.use("/auth",authRoutes);
app.use("/users", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log('Server Port: '+ PORT));

    //User.insertMany(users);
    //Question.insertMany(questions);

}).catch((error) => console.log(error + ' did not connect'));
