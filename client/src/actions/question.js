import { 
  postQuestion, 
  deleteQuestion, 
  voteQuestionAPI, 
  getAllQuestions, 
  postAnswer, 
  deleteAnswer, 
  voteAnswerAPI 
} from "../api";

const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await postQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

const deleteMyQuestion = (id, navigate) => async(dispatch) => {
  try {
    await deleteQuestion(id);
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
}

const voteQuestion = (questionId, value) => async (dispatch) => {
  try {
    await voteQuestionAPI(questionId, value);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error)
  }
}

const fetchAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

const writeAnswer = (answerData, navigate) => async (dispatch) => {
  const { id, noOfAnswers, answerBody, userAnswered } = answerData;
  try {
    const { data } = await postAnswer(id, noOfAnswers, answerBody, userAnswered);
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
    navigate(`/questions/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const deleteMyAnswer = (questionId, answerId, numberOfAnswers) => async (dispatch) => {
  try {
    await deleteAnswer(questionId, answerId, numberOfAnswers);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
}
const voteAnswer = (questionId, answerId, value) => async (dispatch) => {
  try {
    await voteAnswerAPI(questionId, answerId, value);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
}


export { 
  askQuestion, 
  deleteMyQuestion, 
  voteQuestion, 
  fetchAllQuestions, 
  writeAnswer, 
  deleteMyAnswer,
  voteAnswer,
};