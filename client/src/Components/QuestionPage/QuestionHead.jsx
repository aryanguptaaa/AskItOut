import { useEffect } from 'react';
import copy from 'copy-to-clipboard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import FlashCountIcon from './../../Assets/images/Icons/FlashCounts.png';
import { deleteMyQuestion, voteQuestion } from '../../actions/question';
import { BASE_URL } from '../../utils';

const QuestionHead = ({ question, notify }) => {

    /**
     * User Info
     */
    const dispatch = useDispatch();
    const fetchedUser = useSelector((state) => (state.currentUserReducer));
    let user = null;
    user = fetchedUser.result;

    useEffect(() => {
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    }, [dispatch])

    /**
     * HANDLE SHARE
     */
    const location = useLocation();
    const url = BASE_URL;
    const handleShare = () => {
        copy(url + location.pathname);
        notify("Link copied successfully!");
    }

    /**
     * HANDLE DELETE
     */
    const navigate = useNavigate();
    const handleDelete = () => {
        dispatch(deleteMyQuestion(question._id, navigate));
        notify("Question Deleted!");
    }

    /**
     * HANDLE QUESTION FLASH
     */
    const handleUpVote = (questionId) => {
        dispatch(voteQuestion(questionId, 'upVote'));
    }

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
        <div className='flex flex-col px-4 py-5 rounded-[30px] w-[90%] sm:w-[400px] max-h-[800px] bg-white shadow-lg gap-2'>
            <div className="header flex items-center justify-between">
                <div className='title flex items-center gap-2'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z" stroke="#A8A8A8" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M11.25 14.4901V14.4091C11.2557 13.8807 11.3082 13.4602 11.4077 13.1477C11.5099 12.8352 11.6548 12.5824 11.8423 12.3892C12.0298 12.196 12.2557 12.0199 12.5199 11.8608C12.6903 11.7528 12.8438 11.6321 12.9801 11.4986C13.1165 11.3651 13.2244 11.2116 13.304 11.0384C13.3835 10.8651 13.4233 10.6733 13.4233 10.4631C13.4233 10.2102 13.3636 9.99148 13.2443 9.80682C13.125 9.62216 12.9659 9.48011 12.767 9.38068C12.571 9.27841 12.3523 9.22727 12.1108 9.22727C11.892 9.22727 11.6832 9.27273 11.4844 9.36364C11.2855 9.45455 11.1207 9.59659 10.9901 9.78977C10.8594 9.98011 10.7841 10.2259 10.7642 10.527H9.46875C9.48864 10.0156 9.6179 9.58381 9.85653 9.23153C10.0952 8.87642 10.4105 8.60795 10.8026 8.42614C11.1974 8.24432 11.6335 8.15341 12.1108 8.15341C12.6335 8.15341 13.0909 8.25142 13.483 8.44744C13.875 8.64062 14.179 8.91193 14.3949 9.26136C14.6136 9.60795 14.723 10.0128 14.723 10.4759C14.723 10.794 14.6733 11.081 14.5739 11.3366C14.4744 11.5895 14.3324 11.8153 14.1477 12.0142C13.9659 12.2131 13.7472 12.3892 13.4915 12.5426C13.25 12.6932 13.054 12.8494 12.9034 13.0114C12.7557 13.1733 12.6477 13.3651 12.5795 13.5866C12.5114 13.8082 12.4744 14.0824 12.4688 14.4091V14.4901H11.25ZM11.8935 17.081C11.6605 17.081 11.4602 16.9986 11.2926 16.8338C11.125 16.6662 11.0412 16.4645 11.0412 16.2287C11.0412 15.9957 11.125 15.7969 11.2926 15.6321C11.4602 15.4645 11.6605 15.3807 11.8935 15.3807C12.1236 15.3807 12.3224 15.4645 12.4901 15.6321C12.6605 15.7969 12.7457 15.9957 12.7457 16.2287C12.7457 16.3849 12.706 16.5284 12.6264 16.6591C12.5497 16.7869 12.4474 16.8892 12.3196 16.9659C12.1918 17.0426 12.0497 17.081 11.8935 17.081Z" fill="#A8A8A8" />
                    </svg>
                    <h1 className='text-sm font-semibold text-[#A8A8A8]'>Question</h1>
                </div>
                <div className="flashcounts flex items-center gap-2">
                    <img className='flashCountsIcon' src={FlashCountIcon} alt="flash counts icon" />
                    <p className='flashCounts text-sm font-semibold black'>{question.upVote.length}</p>
                </div>
            </div>

            <div className="question text-sm font-base black px-8">{question.questionTitle}</div>

            <div className='options flex justify-between item-center'>
                <div className='flex item-center gap-2'>
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
                {
                    user?._id === question.userId &&
                    <svg onClick={handleDelete} className='deleteIt cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M21 5.5H3" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M16.0557 5.5L15.373 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.89809 2.28601 9.80498 2.3459 9.71729 2.41317C9.32163 2.7167 9.10062 3.20155 8.6586 4.17126L8.05292 5.5" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M9.5 16.5L9.5 10.5" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M14.5 16.5L14.5 10.5" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>

                }
            </div>
        </div>
    )
}

export default QuestionHead;