import { logIn, signUp } from "../api";
import { setCurrentUser } from "./currentUser";

const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    navigate("/welcome1");
  } catch (error) {
    console.log(error);
  }
};

const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export { signup, login };
