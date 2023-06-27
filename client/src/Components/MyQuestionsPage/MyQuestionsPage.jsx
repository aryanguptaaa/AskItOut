import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import { BottomMenu, TopMenu } from '../Commons';
import Quest from '../Commons/Quest';

const MyQuestionsPage = () => {

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
     *  FETCH ALL QUESTIONS
     */
    const questionsList = useSelector((state) => state.questionsReducer);
    const questions = questionsList ? questionsList.data : [];

    /**
     * FETCH USER DATA
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
    user = fetchedUser ? fetchedUser.result : null;

    // GET ALL MY QUESTIONS FROM QUESTIONS
    let myQuestions = [];
    if (user && questions) {
        const myQuestionsId = user.myQuestions || [];
        myQuestions = questions.filter(question => myQuestionsId.includes(question._id));
    }

    return (
        <div className='bg-[#F2F2F2] w-full h-full'>
            <div id="myquestions_header" className={`${isMobile ? '' : 'fixed top-0 z-20'} w-full h-16 px-4`}>
                {
                    isMobile ?
                        <TopMenu currentPage='myquestions' fromPage='home' />
                        :
                        <div className='flex justify-between items-center'>
                            <NavLink to={'/'}><div className='text-2xl font-semibold'>AskItOut</div></NavLink>
                            <TopMenu currentPage='myquestions' fromPage='home' />
                        </div>
                }
            </div>

            <div id="myquestions_body" className={`${isMobile ? '' : 'pt-16'} flex justify-center items-start w-full h-full`}>
                <main className={`${isMobile ? 'h-full w-full' : 'h-[91vh] overflow-y-auto w-[50%] pb-[96px]'}`}>
                    <div id='feedArea' className={`bg-[#F2F2F2] flex flex-col py-2`}>
                        <div id='questList' className='flex flex-col items-center pt-4 gap-4  w-full'>
                            {
                                myQuestions.map((question, key) => (
                                    <Quest question={question} key={key} />
                                ))
                            }
                        </div>
                    </div>

                    <div id='bottomMenu' className="z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
                        < BottomMenu currentPage='QuestionPage' />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default MyQuestionsPage;
