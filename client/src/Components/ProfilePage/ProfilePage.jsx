import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import { BottomMenu, TopMenu } from '../Commons';
import { getUserLevel } from './../../utils';
import AvatarArray from './../../Assets/images/DrawKitAvtars';
import { UserBadgeIcon } from './../../Assets/images/Icons';
// import Analytics from './Analytics';

const ProfilePage = () => {

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
    console.log(user);

    /**
     * PROFILE INFO
     */
    const { id } = useParams();
    const usersList = useSelector((state) => (state.usersReducer));
    const currentProfile = (usersList.filter((user) => user._id === id))[0];
    const currentProfileUserLevel = currentProfile ? getUserLevel(currentProfile.noOfQuestionsAsked, currentProfile.noOfAnswersGiven) : "";

    return (
        <div className='bg-[#F2F2F2] w-full h-full'>
            <div id="profile_header" className={`${isMobile ? '' : 'fixed top-0 z-20'} w-full h-16 px-4 bg-[#F2F2F2]`}>
                {
                    isMobile ?
                        <TopMenu currentPage='profile' fromPage='home' />
                        :
                        <div className='flex justify-between items-center'>
                            <NavLink to={'/'}><div className='text-2xl font-semibold'>AskItOut</div></NavLink>
                            <TopMenu currentPage='profile' fromPage='home' />
                        </div>
                }
            </div>

            {
                currentProfile && <div id="profile_body" className={`${isMobile ? '' : 'pt-16'} flex flex-col justify-center items-center w-full h-full`}>
                    <div id="profile_info" className='px-4 flex flex-col w-full'>
                        <div className='flex justify-between items-center'>
                            <div id="profile_pic" className='w-[80px] h-[80px] rounded-full'>
                                <img src={AvatarArray[currentProfile.avtarIndex]} alt={currentProfile.firstName} />
                            </div>
                            <div id="numbers" className='w-[150px] flex justify-between items-centers font-medium'>
                                <div id="asked" className='flex flex-col items-center justify-center'>
                                    <div id="asked_number" className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{currentProfile.noOfQuestionsAsked}</div>
                                    <div className={`${isMobile ? 'text-sm' : 'text-base'}`}>Asked</div>
                                </div>
                                <div id="answered" className='flex flex-col items-center justify-center'>
                                    <div id="answered_number" className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{currentProfile.noOfAnswersGiven}</div>
                                    <div className={`${isMobile ? 'text-sm' : 'text-base'}`}>Answered</div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <div id="user_name" className='text-base font-semibold'>{`${currentProfile.firstName} ${currentProfile.lastName}`}</div>
                            <div id="user_level" className='flex justify-start items-center gap-1'>
                                <div id="badge" className='w-[16px] h-auto'><img src={UserBadgeIcon} alt={`Badge of ${currentProfile.firstName}`} width={16} /></div>
                                <div id="level" className='font-light text-sm text-[#656565]'>{currentProfileUserLevel}</div>
                            </div>
                            <div id="user_bio" className='text-xs text-justify'>{currentProfile.about}</div>
                        </div>

                        <div id="tags" className='flex justify-start items-center gap-2 py-2 flex-wrap'>
                            {
                                currentProfile.tags.map((tag, key) => (
                                    <div className='bg-white h-[24px] rounded-[12px] text-xs font-light flex justify-center items-center px-2 border-2 border-[#CCCCCC]' key={key}>
                                        {tag}
                                    </div>
                                ))
                            }
                        </div>
                        {/* <Analytics graphData={user.graphData} /> */}
                    </div>
                </div>
            }

            <div id='bottomMenu' className="z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
                < BottomMenu currentPage='ProfilePage' />
            </div>
        </div>
    )
}

export default ProfilePage