import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import { writeAnswer } from '../../actions/question';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextEditor from "../Commons/TextEditor";
import { TopMenu, BottomMenu } from '../Commons';
import AvatarArray from './../../Assets/images/DrawKitAvtars';
import QuestionHead from './QuestionHead';
import QuestionDetail from './QuestionDetail';
import Answer from './Answer';
import { getDate } from './../../utils';

const QuestionThread = () => {

    /**
     * MOBILE OR DESKTOP?
     */
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth } = window;
            setIsMobile(innerWidth <= 768);
        };

        // Add event listener to track window resize
        window.addEventListener('resize', handleResize);

        // Call handleResize initially
        handleResize();

        // Clean up the event listener when the component is unmounted
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    /**
     * TOAST NOTIFICATION MESSAGE
     */
    const [alertMessage, setAlertMessage] = useState('');
    useEffect(() => {
        if (alertMessage !== '') {
            toast.success(`${alertMessage}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [alertMessage, setAlertMessage])

    /**
     * FETCH DATA
     */
    const { id } = useParams();
    const questionsList = useSelector((state) => state.questionsReducer);
    const questions = questionsList.data;
    
    /**
     * ASKER DATA
     */
    const usersList = useSelector((state) => (state.usersReducer));
    // const asker = (usersList.filter((user) => user._id === question.userId))[0];

    /**
     * HANDLE SEE ALL ANSWERS
     */
    const [showAllAnswers, setShowAllAnswers] = useState(false);
    const handleSeeAllAnswers = () => {
        setShowAllAnswers(!showAllAnswers);
    }

    /**
     * USER INFO
     */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchedUser = useSelector((state) => (state.currentUserReducer));
    if (fetchedUser === null) {
        navigate('/login');
    }
    let user = null;
    useEffect(() => {
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    }, [dispatch])

    /**
     * FORM DATA
     */
    const [answer, setAnswer] = useState(``);

    const handleSubmit = async (event, numberOfAnswers) => {
        event.preventDefault();
        // Handle form submission

        if (answer === '') {
            toast.error('Answer can not be empty!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            if (fetchedUser === null) {
                toast.error('Login or Signup to answer a question!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            user = fetchedUser.result;
            dispatch(writeAnswer({ id, noOfAnswers: numberOfAnswers + 1, answerBody: answer, userAnswered: `${user.firstName} ${user.lastName}` }, navigate))
        }
    };

    return (
        <div className='bg-[#F2F2F2] w-full h-full'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {
                <div id="thread_header" className={`${isMobile ? '' : 'fixed top-0 z-20'} w-full h-16 px-4 bg-[#F2F2F2]`}>
                    {
                        isMobile ?
                            <TopMenu currentPage='thread' fromPage='home' />
                            :
                            <div className='flex justify-between items-center'>
                                <NavLink to={'/'}><div className='text-2xl font-semibold'>AskItOut</div></NavLink>
                                <TopMenu currentPage='thread' fromPage='home' />
                            </div>
                    }
                </div>
            }
            <div id="thread_body" className={`${isMobile ? '' : 'pt-16'} flex justify-center items-start w-full h-full`}>
                {
                    !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-full flex`}>
                        &nbsp;
                    </aside>
                }
                {

                    questions === null ?
                        <div>Loading...</div>
                        :
                        <>
                            {

                                questions
                                    .filter((question) => question._id === id)
                                    .map((question) => (
                                        <main key={question._id} className={`${isMobile ? 'h-full w-full' : 'h-[91vh]w-[50%] pb-[96px]'} flex flex-col justify-start items-center`}>
                                            <div id='asker_header' className={`w-full flex justify-between items-center px-4 py-4`}>
                                                <div id='askerDetails' className="flex items-center justify-center gap-2">
                                                    <NavLink to={`/users/${question?.userId}`}>
                                                        <div className="askerAvatar w-12 h-12 md:w-14 md:h-14">
                                                            <img src={AvatarArray[user ? (usersList.filter((user) => user._id === question.userId))[0].avtarIndex : 0]} alt="Asker Avatar" />
                                                        </div>
                                                    </NavLink>
                                                    <div className='flex flex-col justify-center'>
                                                        <NavLink to={`/users/${question?.userId}`}><div className="askerName text-base font-bold black">{`${question.userPosted}`}</div></NavLink>
                                                        <div className="questCategory text-xs text-[#A8A8A8]">{question.questionTags[0]}</div>
                                                    </div>
                                                </div>
                                                <div className="questDate text-xs text-[#A8A8A8]">{`${isMobile ? getDate(question.askedOn).month.substring(0, 3) : getDate(question.askedOn).month} ${getDate(question.askedOn).day}, ${getDate(question.askedOn).year}`}</div>
                                            </div>

                                            <div id='question' className="flex flex-col items-center pt-4 px-4 gap-4 w-full">
                                                <QuestionHead question={question} notify={setAlertMessage} />
                                                <QuestionDetail questionBody={question.questionBody} />
                                            </div>

                                            <div id="writeAnswer" className='w-[90%] sm:w-[400px]'>
                                                <div id='answersHeader' className="flex items-center justify-between px-2 h-16">
                                                    <div id='writeAnswer' className="font-bold text-2xl">Write Answer</div>
                                                </div>
                                                <form onSubmit={(event) => handleSubmit(event, question.answer.length)} className={`${isMobile ? 'h-full w-full' : 'overflow-y-hidden w-[100%]'}`}>
                                                    <div id='editorArea' className={`bg-[#F2F2F2] flex flex-col`}>
                                                        <label htmlFor='textEditor'></label>
                                                        <TextEditor id='textEditor' editorValue={answer} setEditorValue={setAnswer} editorPlaceholder="Write your answer here..." />
                                                    </div>
                                                    <div id='bottomMenu' className="z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
                                                        < BottomMenu currentPage='QuestionPage' />
                                                    </div>
                                                </form>
                                            </div>


                                            <div id="answers" className='w-full px-4 bg-[#F2F2F2]'>
                                                <div id='answersHeader' className="flex items-center justify-between px-2 h-16">
                                                    <div id='answersTitle' className="font-bold text-2xl">Answers</div>
                                                    <div id='seeAllAnswers' className="text-xs text-[#A8A8A8] cursor-pointer" onClick={handleSeeAllAnswers}>{showAllAnswers ? 'show verified' : 'see all'}</div>
                                                </div>
                                                <div className={`w-full h-full answersList flex flex-col items-center pt-4 gap-4 overflow-y-auto ${isMobile ? 'pb-[80px]' : 'pb-[110px]'}`}>
                                                    {
                                                        showAllAnswers && question.answer.length !== 0 ?
                                                            question.answer.map((answer, key) => (
                                                                <Answer questionId={question?._id} answer={answer} numberOfAnswers={question.answer.length} notify={setAlertMessage} key={key} />
                                                            ))
                                                            :
                                                            question.answer.length !== 0 ? <Answer questionId={question?._id} answer={question.answer[0]} numberOfAnswers={question.answer.length} notify={setAlertMessage} /> : <div className='flex flex-col justify-center items-center px-4 py-5 rounded-[30px] w-[90%] sm:w-[400px] max-h-[800px] text-sm text-[#515151]'>No answers yet. Be the first to answer this question!</div>
                                                    }
                                                </div>
                                            </div>
                                        </main>
                                    ))
                            }
                        </>
                }
                {
                    !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-[90vh] overflow-y-auto`}>
                        &nbsp;
                    </aside>
                }
            </div>

        </div>
    )
}

export default QuestionThread