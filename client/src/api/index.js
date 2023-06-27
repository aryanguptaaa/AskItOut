import fetchUser from "./fetchUser";
import axios from "axios";
import { SERVER_BASE_URL } from "../utils";

const API = axios.create({ baseURL: SERVER_BASE_URL });

// SECURITY: ADD AUTH TOKEN TO EACH API REQUEST
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

const logIn = (authData) => {
  return API.post("/user/login", authData);
};

const signUp = (authData) => {
  return API.post("/user/signup", authData);
};

const postQuestion = (questionData) => {
  return API.post("/questions/ask", questionData);
};

const deleteQuestion = (questionId) => {
  return API.delete(`/questions/delete/${questionId}`);
}

const voteQuestionAPI = (questionId, value, userId) => {
  return API.patch(`/questions/vote/${questionId}`, { value });
}

const getAllQuestions = () => {
  return API.get('/questions/get');
}

const postAnswer = (questionId, noOfAnswers, answerBody, userAnswered) => {
  return API.patch(`/answer/post/${questionId}`, { noOfAnswers, answerBody, userAnswered });
}

const deleteAnswer = (questionId, answerId, numberOfAnswers) => {
  return API.patch(`/answer/delete/${questionId}`, { answerId, numberOfAnswers});
}

const voteAnswerAPI = (questionId, answerId, value) => {
  return API.patch(`/answer/vote/${questionId}`, { answerId, value })
}

const getAllUsers = () => {
  return API.get("/user/getAllUsers")
}

const updateProfile = (id, updateData) => {
  return API.patch(`/user/update/${id}`, updateData)
}

export {
  fetchUser,
  logIn,
  signUp,
  postQuestion,
  deleteQuestion,
  voteQuestionAPI,
  getAllQuestions,
  postAnswer,
  deleteAnswer,
  voteAnswerAPI,
  getAllUsers,
  updateProfile
};
