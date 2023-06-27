import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Main from './Components/Main';
import { Login, Signup } from './Components/Auth';
import { Welcome1, Welcome2, Welcome3 } from './Components/Welcome';
import AskQuestion from "./Components/AskPage/AskQuestion";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ErrorPage from "./Components/ErrorPage";
import SavedQuestionsPage from "./Components/SavedQuestionsPage";
import MyQuestionsPage from "./Components/MyQuestionsPage";
import NotificationPage from "./Components/NotificationPage";
import QuestionThread from "./Components/QuestionPage";

import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import UpdateProfile from "./Components/ProfilePage/UpdateProfile";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={ <Main /> } />
          <Route exact path='/login' element={ <Login /> } />
          <Route exact path='/signup' element={ <Signup /> } />
          <Route exact path='/welcome1' element={ <Welcome1 /> } />
          <Route exact path='/welcome2' element={ <Welcome2 /> } />
          <Route exact path='/welcome3' element={ <Welcome3 /> } />
          <Route exact path='/ask' element={ <AskQuestion /> } />
          <Route exact path='/questions/:id' element={ <QuestionThread /> } />
          <Route exact path='/users/:id' element={ <ProfilePage /> } />
          <Route exact path="/users/edit/:id" element={ <UpdateProfile /> } />
          <Route exact path='/saved' element={ <SavedQuestionsPage /> } />
          <Route exact path='/myquestions' element={ <MyQuestionsPage /> } />
          <Route exact path='/notifications' element={ <NotificationPage /> } />
          <Route exact path='*' element={ <ErrorPage /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
