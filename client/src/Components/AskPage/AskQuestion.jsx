import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import { NavLink, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { askQuestion } from '../../actions/question';
import TextEditor from "../Commons/TextEditor";
import { BottomMenu, TopMenu } from '../Commons';

const AskQuestion = () => {
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
     * User Info
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
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState(``);
    const [questionTags, setQuestionTags] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission

        if (questionTitle === '') {
            toast.error('Question title can not be empty!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (questionBody === '') {
            toast.error('Question body can not be empty!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (questionTags === '') {
            toast.error('Enter atleast one tag for your question!', {
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
            user = fetchedUser.result;
            dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: `${user.firstName} ${user.lastName}` }, navigate))
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

            <div id="home_header" className={`${isMobile ? '' : 'fixed top-0 z-20'} w-full h-16 px-4`}>
                {
                    isMobile ?
                        <TopMenu currentPage='ask' fromPage='home' />
                        :
                        <div className='flex justify-between items-center'>
                            <NavLink to={'/'}><div className='text-2xl font-semibold'>AskItOut</div></NavLink>
                            <TopMenu currentPage='ask' fromPage='home' />
                        </div>
                }
            </div>

            <div id="home_body" className={`${isMobile ? '' : 'pt-16'} flex justify-center items-start w-full h-full`}>
                {
                    !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-full flex`}>
                        &nbsp;
                    </aside>
                }

                <form onSubmit={handleSubmit} className={`${isMobile ? 'h-full w-full' : 'h-[91vh] overflow-y-hidden w-[50%] pb-[96px]'}`}>
                    <div id='questionTitleArea' className='w-full px-4'>
                        <label htmlFor="questionTitle"></label>
                        <input type="text" id='questionTitle' name='questionTitle' placeholder='Question title' className='w-full px-3 py-4 rounded-[10px] text-sm font-light h-[30px] focus:outline-nonez' onChange={(e) => { setQuestionTitle(e.target.value) }} />
                    </div>

                    <div id='editorArea' className={`bg-[#F2F2F2] flex flex-col`}>
                        <label htmlFor='textEditor'></label>
                        <TextEditor id='textEditor' editorValue={questionBody} setEditorValue={setQuestionBody} editorPlaceholder="Write question body here..." />
                    </div>

                    <div id='questionTagsArea' className='w-full px-4'>
                        <label htmlFor="questionTags"></label>
                        <input type="text" id='questionTags' name='questionTags' placeholder="Add upto 5 tags seperated by 'comma'." className='w-full px-3 py-4 rounded-[10px] text-sm font-light h-[30px] focus:outline-nonez' onChange={(e) => { setQuestionTags(e.target.value.split(",").map(tag => (tag.trim()))) }} />
                    </div>

                    <div id='bottomMenu' className="z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
                        < BottomMenu currentPage='AskPage' />
                    </div>
                </form>

                {
                    !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-[90vh] overflow-y-auto`}>
                        &nbsp;
                    </aside>
                }
            </div>
        </div>
    )
}

export default AskQuestion