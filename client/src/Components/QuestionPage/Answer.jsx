import { useEffect } from 'react';
import copy from 'copy-to-clipboard';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import { deleteMyAnswer, voteAnswer } from '../../actions/question';
import { getUserLevel } from './../../utils';
import AvatarArray from './../../Assets/images/DrawKitAvtars';
import { BASE_URL } from '../../utils';

const Answer = ({ questionId, answer, numberOfAnswers, notify }) => {
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
    const handleDelete = (answerId, numberOfAnswers) => {
        dispatch(deleteMyAnswer(questionId, answerId, numberOfAnswers - 1));
        notify("Answer Deleted!");
    }

    /**
     * HANDLE ANSWER LIKE
     */
    const handleLike = (questionId, answerId) => {
        dispatch(voteAnswer(questionId, answerId, 'upVote'))
    }

    /**
     * HANDLE ANSWER DISLIKE
     */
    const handleDislike = (questionId, answerId) => {
        dispatch(voteAnswer(questionId, answerId, 'downVote'))
    }

    /**
     * Show if user has liked or disliked the answer or not
     */
    const upIndex = answer.upVote.findIndex((id) => id === String(user._id)); // Find the index of the element in the upVote array that matches String(user._id). The findIndex() method returns the index of the first element that satisfies the provided condition (id === String(user._id)), or -1 if no element matches.
    const downIndex = answer.upVote.findIndex((id) => id === String(user._id)); // Find the index of the element in the upVote array that matches String(user._id). The findIndex() method returns the index of the first element that satisfies the provided condition (id === String(user._id)), or -1 if no element matches.
    let userHasLiked = false;
    let userHasDisliked = false;
    if (upIndex !== -1 && !userHasDisliked) {
        // User has liked the answer!
        userHasLiked = true;
        userHasDisliked = false;
    }
    if (downIndex !== -1 && !userHasLiked) {
        // User has disliked the answer!
        userHasDisliked = true;
        userHasLiked = false;
    }

    /**
     * CALCULATE IF THE ANSWER IS VERIFIED OR NOT
     */
    const likesCount = answer.upVote.length;
    const dislikesCount = answer.downVote.length;
    // WRITE OPTIMAL ALGORITHM FOR CALCULATING VERIFIED ANSWER
    let isVerifiedAnswer = likesCount > 5 * (dislikesCount + 1);

    /**
     * SOLVER DATA
     */
    const solverId = answer.userId;
    const usersList = useSelector((state) => (state.usersReducer));
    const solver = (usersList.filter((user) => user._id === solverId))[0];
    
    // Calculate Solver Level
    const solverLevel = solver ? getUserLevel(solver.noOfQuestionsAsked, solver.noOfAnswersGiven) : '';

    return (
        <div className='flex flex-col px-4 py-5 rounded-[30px] w-[90%] sm:w-[400px] max-h-[800px] bg-white shadow-lg gap-2'>
            <div className="header flex items-center justify-between">
                <div className="solverDetail flex items-center justify-center gap-2">
                    <NavLink to={`/users/${answer?.userId}`}><img className='solverAvatar w-12 h-12 md:w-14 md:h-14' src={AvatarArray[solver ? solver.avtarIndex : 0]} alt={`Solver Icon`} width={1300} height={1300} /></NavLink>
                    <div className="details">
                        <NavLink to={`/users/${answer?.userId}`}><div className="solverName text-base font-bold black">{`${answer.userAnswered}`}</div></NavLink>
                        <div className="level flex items-center justify-start gap-1">
                            <svg className='solverBadge' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0438 12.2114C12.0968 12.2313 12.1828 12.2577 12.282 12.2511C12.4409 12.2445 12.5864 12.1783 12.6923 12.0724C12.8114 11.9533 12.871 11.7945 12.871 11.6291C12.8577 10.6299 13.493 9.75648 14.4392 9.45871C14.5054 9.43886 14.5715 9.40577 14.6311 9.35946C14.7634 9.2602 14.8495 9.11462 14.8693 8.96243C14.8958 8.79701 14.8561 8.63158 14.7568 8.49262C14.1613 7.69196 14.1547 6.61338 14.7502 5.81272L14.823 5.72008L14.8561 5.62083C14.909 5.46202 14.8892 5.28998 14.8164 5.15763C14.7436 5.00544 14.6112 4.89295 14.4524 4.84663C13.5062 4.54225 12.871 3.67542 12.8842 2.68286C12.8842 2.60346 12.871 2.53729 12.8511 2.47112C12.7982 2.31893 12.6857 2.1932 12.5335 2.1138C12.3879 2.04763 12.2225 2.03439 12.0703 2.08733C11.8387 2.16673 11.5939 2.20644 11.349 2.20644C10.6212 2.20644 9.93299 1.85573 9.51612 1.2602C9.4698 1.20065 9.41687 1.14771 9.37055 1.11462C9.09263 0.916113 8.70884 0.982283 8.51033 1.2602C8.08684 1.85573 7.40529 2.20644 6.67741 2.20644C6.42596 2.20644 6.18775 2.16673 5.96277 2.08733C5.75103 2.01454 5.47973 2.06748 5.32092 2.2329C5.20181 2.35201 5.14226 2.51082 5.14226 2.66963C5.15549 3.6688 4.52026 4.54225 3.57402 4.8334C3.50123 4.85325 3.44168 4.88634 3.37551 4.93266C3.10421 5.13778 3.05127 5.52157 3.24979 5.79949C3.84532 6.60015 3.84532 7.67873 3.24979 8.48601C3.21008 8.53894 3.177 8.60511 3.15715 8.66467C3.11083 8.82347 3.12406 8.98228 3.19685 9.14109C3.27625 9.28667 3.40859 9.39254 3.55417 9.43886C4.50702 9.74324 5.13564 10.6167 5.12241 11.596C5.11579 11.6754 5.12902 11.7482 5.15549 11.821C5.20843 11.9732 5.32092 12.0989 5.47311 12.1783C5.6253 12.2445 5.78411 12.2577 5.9363 12.2048C6.17452 12.1254 6.42596 12.0857 6.67079 12.0857C7.40529 12.0857 8.06699 12.4298 8.4971 13.0319C8.5368 13.0848 8.58974 13.1378 8.64267 13.1775C8.74854 13.2503 8.87427 13.29 8.99999 13.29C9.03308 13.29 9.07278 13.29 9.10587 13.2834C9.27129 13.2569 9.41025 13.1643 9.50289 13.0319C10.0786 12.2313 11.0976 11.8938 12.0438 12.2114ZM8.99337 12.6349C8.45078 11.8872 7.58395 11.4438 6.66418 11.4438C6.35979 11.4438 6.04879 11.4901 5.76426 11.5894C5.76426 10.3322 4.9636 9.22711 3.77915 8.84994C4.52026 7.83092 4.52026 6.47443 3.78577 5.4554C4.97683 5.065 5.77088 3.97319 5.77749 2.71595C6.06203 2.80859 6.35979 2.85491 6.66418 2.85491C7.58395 2.85491 8.45739 2.41156 8.99999 1.67046C9.54259 2.41156 10.416 2.85491 11.3424 2.85491C11.6534 2.85491 11.9578 2.80859 12.2291 2.70933C12.2291 3.95333 13.0165 5.04515 14.2076 5.44878C13.4731 6.46781 13.4731 7.81769 14.2076 8.84333C13.0165 9.23373 12.2291 10.3255 12.2225 11.5828C11.0248 11.199 9.7411 11.6159 8.99337 12.6349Z" fill="#A8A8A8" stroke="#A8A8A8" strokeWidth="0.5" />
                                <path d="M11.6733 6.70603C10.6609 6.28254 9.86687 5.49511 9.43677 4.4827C9.36398 4.30404 9.18532 4.18494 8.99343 4.18494C8.80153 4.18494 8.62287 4.30404 8.55008 4.47609C8.11998 5.48188 7.33255 6.2693 6.32676 6.69941C6.1481 6.7722 6.02899 6.94424 6.02899 7.13614C6.02899 7.32803 6.14148 7.50007 6.32014 7.57948C7.29285 8.00297 8.10012 8.82348 8.54347 9.82927C8.62287 10.0079 8.79491 10.1204 8.98019 10.1204C9.17209 10.1204 9.34413 10.0079 9.41692 9.82927C9.84041 8.84995 10.6609 8.03605 11.6733 7.58609C11.8454 7.50669 11.9579 7.33465 11.9579 7.14275C11.9645 6.95086 11.852 6.77882 11.6733 6.70603ZM8.98681 9.25359C8.51038 8.35367 7.77589 7.61256 6.90244 7.14275C7.80236 6.67956 8.53023 5.9583 8.99343 5.05839C9.45662 5.96492 10.1911 6.69279 11.0976 7.14937C10.1911 7.63241 9.45 8.37352 8.98681 9.25359Z" fill="#A8A8A8" stroke="#A8A8A8" strokeWidth="0.5" />
                                <path d="M7.05459 13.1047C6.9024 13.0054 6.70389 13.0518 6.60463 13.1973L4.87097 15.8508L4.00414 14.0708L2.19768 14.0642L4.01075 11.285C4.11001 11.1328 4.06369 10.9343 3.91811 10.835C3.76592 10.7358 3.56741 10.7821 3.46816 10.9277L1 14.7126L3.6005 14.7192L4.79156 17.1609L7.14723 13.5546C7.24648 13.4025 7.20678 13.1973 7.05459 13.1047Z" fill="#A8A8A8" stroke="#A8A8A8" strokeWidth="0.5" />
                                <path d="M14.5253 10.9277C14.426 10.7755 14.2275 10.7358 14.0753 10.835C13.9231 10.9343 13.8834 11.1328 13.9827 11.285L15.8024 14.0641L13.9893 14.0708L13.1225 15.8507L11.3888 13.1973C11.2895 13.0451 11.091 13.0054 10.9388 13.1047C10.7866 13.2039 10.7469 13.4024 10.8462 13.5546L13.2085 17.1609L14.3995 14.7192L17 14.7126L14.5253 10.9277Z" fill="#A8A8A8" stroke="#A8A8A8" strokeWidth="0.5" />
                            </svg>
                            <div className="solverLevel text-xs text-[#A8A8A8]">
                                {solver && solverLevel}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isVerifiedAnswer && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2618 3.59937C13.1956 2.53312 12.6625 2 12 2C11.3375 2 10.8044 2.53312 9.73815 3.59937C9.09832 4.2392 8.46427 4.53626 7.55208 4.53626C6.7556 4.53626 5.62243 4.38178 5 5.00944C4.38249 5.63214 4.53628 6.76065 4.53628 7.55206C4.53628 8.46428 4.2392 9.09832 3.59935 9.73817C2.53312 10.8044 2.00001 11.3375 2 12C2.00002 12.6624 2.53314 13.1956 3.59938 14.2618C4.31616 14.9786 4.53628 15.4414 4.53628 16.4479C4.53628 17.2444 4.38181 18.3776 5.00949 19C5.63218 19.6175 6.76068 19.4637 7.55206 19.4637C8.52349 19.4637 8.99128 19.6537 9.68457 20.347C10.2749 20.9374 11.0663 22 12 22C12.9337 22 13.7251 20.9374 14.3154 20.347C15.0087 19.6537 15.4765 19.4637 16.4479 19.4637C17.2393 19.4637 18.3678 19.6175 18.9905 19M20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19M18.9905 19H19" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 10.3077C8 10.3077 10.25 10 12 14C12 14 17.0588 4 22 2" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
            </div>

            {
                answer && <div className="answer text-sm black px-8" dangerouslySetInnerHTML={{ __html: answer.answerBody }}></div>
            }

            <div className='options flex item-center justify-between'>
                <div className='impressions flex item-center gap-3'>
                    <div className="likes flex items-center gap-2">
                        <svg onClick={() => handleLike(questionId, answer._id)} className='likesIcon cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill={userHasLiked ? "#79C8FF" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 12.5001C2 11.3956 2.89543 10.5001 4 10.5001C5.65685 10.5001 7 11.8433 7 13.5001V17.5001C7 19.157 5.65685 20.5001 4 20.5001C2.89543 20.5001 2 19.6047 2 18.5001V12.5001Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.4787 7.80638L15.2124 8.66646C14.9942 9.37123 14.8851 9.72361 14.969 10.0019C15.0369 10.2271 15.1859 10.4211 15.389 10.5488C15.64 10.7067 16.0197 10.7067 16.7791 10.7067H17.1831C19.7532 10.7067 21.0382 10.7067 21.6452 11.4674C21.7145 11.5544 21.7762 11.6468 21.8296 11.7438C22.2965 12.5923 21.7657 13.7353 20.704 16.0212C19.7297 18.119 19.2425 19.1679 18.338 19.7853C18.2505 19.845 18.1605 19.9014 18.0683 19.9543C17.116 20.5001 15.9362 20.5001 13.5764 20.5001H13.0646C10.2057 20.5001 8.77628 20.5001 7.88814 19.6396C7 18.7791 7 17.3941 7 14.624V13.6505C7 12.1948 7 11.4669 7.25834 10.8007C7.51668 10.1345 8.01135 9.58677 9.00069 8.49124L13.0921 3.96068C13.1947 3.84706 13.246 3.79024 13.2913 3.75087C13.7135 3.3834 14.3652 3.42477 14.7344 3.84247C14.774 3.88722 14.8172 3.95003 14.9036 4.07566C15.0388 4.27217 15.1064 4.37043 15.1654 4.46778C15.6928 5.33925 15.8524 6.37449 15.6108 7.35727C15.5838 7.46704 15.5488 7.58022 15.4787 7.80638Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className='likesCounts text-sm font-semibold black'>{answer && answer.upVote.length}</p>
                    </div>
                    <div className="dislikes flex items-center gap-2">
                        <svg onClick={() => handleDislike(questionId, answer._id)} className='dislikesIcon cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill={userHasDisliked ? "#79C8FF" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 11.5C2 12.6046 2.89543 13.5 4 13.5C5.65685 13.5 7 12.1569 7 10.5V6.5C7 4.84315 5.65685 3.5 4 3.5C2.89543 3.5 2 4.39543 2 5.5V11.5Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.4787 16.1937L15.2124 15.3337C14.9942 14.6289 14.8851 14.2765 14.969 13.9982C15.0369 13.7731 15.1859 13.579 15.389 13.4513C15.64 13.2935 16.0197 13.2935 16.7791 13.2935H17.1831C19.7532 13.2935 21.0382 13.2935 21.6452 12.5327C21.7145 12.4458 21.7762 12.3533 21.8296 12.2563C22.2965 11.4079 21.7657 10.2649 20.704 7.9789C19.7297 5.88111 19.2425 4.83222 18.338 4.21485C18.2505 4.15508 18.1605 4.0987 18.0683 4.04586C17.116 3.5 15.9362 3.5 13.5764 3.5H13.0646C10.2057 3.5 8.77628 3.5 7.88814 4.36053C7 5.22106 7 6.60607 7 9.37607V10.3497C7 11.8054 7 12.5332 7.25834 13.1994C7.51668 13.8656 8.01135 14.4134 9.00069 15.5089L13.0921 20.0394C13.1947 20.1531 13.246 20.2099 13.2913 20.2493C13.7135 20.6167 14.3652 20.5754 14.7344 20.1577C14.774 20.1129 14.8172 20.0501 14.9036 19.9245C15.0388 19.728 15.1064 19.6297 15.1654 19.5323C15.6928 18.6609 15.8524 17.6256 15.6108 16.6429C15.5838 16.5331 15.5488 16.4199 15.4787 16.1937Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className='dislikesCounts text-sm font-semibold black'>{answer && answer.downVote.length}</p>
                    </div>
                </div>
                <div className='flex item-center gap-3'>
                    {
                        user?._id === answer?.userId &&
                        <svg onClick={() => handleDelete(answer._id, numberOfAnswers)} className='deleteIt cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M21 5.5H3" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M16.0557 5.5L15.373 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.89809 2.28601 9.80498 2.3459 9.71729 2.41317C9.32163 2.7167 9.10062 3.20155 8.6586 4.17126L8.05292 5.5" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M9.5 16.5L9.5 10.5" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M14.5 16.5L14.5 10.5" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                    }
                    <svg onClick={handleShare} className='shareIt cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.3927 8.03168L18.6457 6.51461C17.3871 5.42153 16.8937 4.83352 16.2121 5.04139C15.3622 5.30059 15.642 6.93609 15.642 7.48824C14.3206 7.48824 12.9468 7.38661 11.6443 7.59836C7.34453 8.29742 6 11.3566 6 14.6525C7.21697 13.9065 8.43274 13.0746 9.8954 12.7289C11.7212 12.2973 13.7603 12.5032 15.642 12.5032C15.642 13.0554 15.3622 14.6909 16.2121 14.9501C16.9844 15.1856 17.3871 14.5699 18.6457 13.4769L20.3927 11.9598C21.4642 11.0293 22 10.564 22 9.99574C22 9.4275 21.4642 8.96223 20.3927 8.03168Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5676 3C6.70735 3.00694 4.68594 3.10152 3.39411 4.39073C2 5.78202 2 8.02125 2 12.4997C2 16.9782 2 19.2174 3.3941 20.6087C4.78821 22 7.03198 22 11.5195 22C16.0071 22 18.2509 22 19.645 20.6087C20.6156 19.64 20.9104 18.2603 21 16" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Answer;