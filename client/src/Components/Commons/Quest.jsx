import { useEffect } from 'react';
import copy from 'copy-to-clipboard';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import { voteQuestion } from '../../actions/question';
import FlashCountIcon from './../../Assets/images/Icons/FlashCounts.png';
import AvatarArray from './../../Assets/images/DrawKitAvtars';
import { BASE_URL } from './../../utils';

const Quest = ({ question, notify }) => {

    /**
     * USER INFO
     */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchedUser = useSelector((state) => (state.currentUserReducer));
    let user = null;
    useEffect(() => {
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    }, [dispatch])
    user = fetchedUser ? fetchedUser.result : null;


    /**
     * HANDLE SHARE
     */
    const BASEURL = BASE_URL;
    const url = `${BASEURL}/questions/`;
    const handleShare = () => {
        copy(url + question._id);
        notify("Link copied successfully!");
    }

    /**
     * HANDLE OPEN QUESTION
     */
    const loadQuestion = () => {
        navigate(`/questions/${question._id}`);
    }

    /**
     * HANDLE QUESTION FLASH
     */
    const handleUpVote = (questionId) => {
        dispatch(voteQuestion(questionId, 'upVote'));
    }

    /**
     * ASKER DATA
     */
    const usersList = useSelector((state) => (state.usersReducer));
    const asker = (usersList.filter((user) => user._id === question.userId))[0];

    /**
     * Show if user has flashed the question or not
     */
    const upIndex = question.upVote.findIndex((id) => id === String(user._id)); // Find the index of the element in the upVote array that matches String(user._id). The findIndex() method returns the index of the first element that satisfies the provided condition (id === String(user._id)), or -1 if no element matches.
    let userHasFlashed = false;
    if (upIndex !== -1) {
        // User has flashed the question!
        userHasFlashed = true;
    }

    return (
        <div className='flex flex-col px-4 py-5 rounded-[30px] w-[300px] sm:w-[500px] max-h-[800px] bg-white shadow-lg gap-2'>
            <div className="header flex items-center justify-between">
                <div className="solverDetail flex items-center justify-center gap-2">
                    <NavLink to={`/users/${question?.userId}`}><img className='askerAvatar w-12 h-12 md:w-14 md:h-14' src={AvatarArray[asker ? asker.avtarIndex : 0]} alt={`Username Icon`} width={1300} height={1300} /></NavLink>
                    <div className="details">
                        <NavLink to={`/users/${question?.userId}`}><div className="askerName text-base font-bold black whitespace-nowrap">{`${question.userPosted}`}</div></NavLink>
                        <div className="questCategory text-xs text-[#A8A8A8] whitespace-nowrap">
                            {question.questionTags[0]}
                        </div>
                    </div>
                </div>
                <div className="flashcounts flex items-center gap-2">
                    <img className='flashCountsIcon' src={FlashCountIcon} alt="flash counts icon" />
                    <p className='flashCounts text-sm font-semibold black'>{question.upVote.length}</p>
                </div>
            </div>

            <div onClick={loadQuestion} className="answer text-sm black px-8 cursor-pointer">
                {question.questionTitle}
            </div>

            <div className='options flex item-center gap-2'>
                <svg onClick={() => handleUpVote(question._id)} className='flashIt cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill={userHasFlashed ? "#FFDD09" : "none"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className='saveIt cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg onClick={handleShare} className='shareIt cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3927 8.03168L18.6457 6.51461C17.3871 5.42153 16.8937 4.83352 16.2121 5.04139C15.3622 5.30059 15.642 6.93609 15.642 7.48824C14.3206 7.48824 12.9468 7.38661 11.6443 7.59836C7.34453 8.29742 6 11.3566 6 14.6525C7.21697 13.9065 8.43274 13.0746 9.8954 12.7289C11.7212 12.2973 13.7603 12.5032 15.642 12.5032C15.642 13.0554 15.3622 14.6909 16.2121 14.9501C16.9844 15.1856 17.3871 14.5699 18.6457 13.4769L20.3927 11.9598C21.4642 11.0293 22 10.564 22 9.99574C22 9.4275 21.4642 8.96223 20.3927 8.03168Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.5676 3C6.70735 3.00694 4.68594 3.10152 3.39411 4.39073C2 5.78202 2 8.02125 2 12.4997C2 16.9782 2 19.2174 3.3941 20.6087C4.78821 22 7.03198 22 11.5195 22C16.0071 22 18.2509 22 19.645 20.6087C20.6156 19.64 20.9104 18.2603 21 16" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}

export default Quest;