import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import { NavLink } from 'react-router-dom';

const TopMenu = ({ currentPage, fromPage }) => {

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
    user = fetchedUser ? fetchedUser.result : null;

    /**
     * PAGE NAME
     */
    const pageName = {
        'home': 'Home',
        'saved': 'Saved Questions',
        'thread': 'Question Thread',
        'myquestions': 'My Questions',
        'profile': 'My Profile',
        'notifications': 'Notifications',
        'ask': isMobile ? 'Ask' : 'Ask Question',
        'answer': isMobile ? 'Answer' : 'Write Answer'
    }

    return (
        <div id='topmenu' className={`${isMobile ? 'w-full' : 'w-[360px]'} h-16 flex justify-between items-center`}>
            <div id="left_topmenu">
                {
                    currentPage === 'home' ?
                        <div id="username" className='text-xl text-center'>{isMobile ? `${ user ? user.firstName : '' }` : `${ user ? user.firstName : '' } ${ user ? user.lastName : '' }`}</div>
                        :
                        <div className='flex justify-center items-center gap-2'>
                            <NavLink to={`/${fromPage === 'home' ? '' : fromPage}`}>
                                <div id='backbutton' className="bg-white w-[40px] max-w-[40px] h-[40px] max-h-[40px] rounded-full flex justify-center items-center cursor-pointer">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="20" fill="white" />
                                        <path d="M12.9998 19L27.9998 18.9998" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16.9998 13.9999L12.7069 18.2928C12.3736 18.6261 12.2069 18.7928 12.2069 18.9999C12.2069 19.207 12.3736 19.3737 12.7069 19.707L16.9998 23.9999" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </NavLink>
                            <div id="pageName" className='text-xl text-center'>{currentPage === 'profile' ? '' : pageName[currentPage]}</div>
                        </div>
                }
            </div>

            <div id="right_topmenu" className='flex justify-center item-center gap-2'>
                <div id='toggletheme' className="bg-white w-[40px] max-w-[40px] h-[40px] max-h-[40px] rounded-full flex justify-center items-center cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <NavLink to='/notifications'>
                    <div id='notifications' className="bg-white w-[40px] max-w-[40px] h-[40px] max-h-[40px] rounded-full flex justify-center items-center cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </NavLink>
                <div className="bg-white w-[40px] max-w-[40px] h-[40px] max-h-[40px] rounded-full flex justify-center items-center cursor-pointer">
                    {
                        currentPage === 'profile' ?
                            <svg id='settings' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="white" />
                                <path d="M11 15H14" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11 25H17" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M26 25L29 25" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M23 15L29 15" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 15C14 14.0681 14 13.6022 14.1522 13.2346C14.3552 12.7446 14.7446 12.3552 15.2346 12.1522C15.6022 12 16.0681 12 17 12C17.9319 12 18.3978 12 18.7654 12.1522C19.2554 12.3552 19.6448 12.7446 19.8478 13.2346C20 13.6022 20 14.0681 20 15C20 15.9319 20 16.3978 19.8478 16.7654C19.6448 17.2554 19.2554 17.6448 18.7654 17.8478C18.3978 18 17.9319 18 17 18C16.0681 18 15.6022 18 15.2346 17.8478C14.7446 17.6448 14.3552 17.2554 14.1522 16.7654C14 16.3978 14 15.9319 14 15Z" stroke="#2A353D" strokeWidth="1.5" />
                                <path d="M20 25C20 24.0681 20 23.6022 20.1522 23.2346C20.3552 22.7446 20.7446 22.3552 21.2346 22.1522C21.6022 22 22.0681 22 23 22C23.9319 22 24.3978 22 24.7654 22.1522C25.2554 22.3552 25.6448 22.7446 25.8478 23.2346C26 23.6022 26 24.0681 26 25C26 25.9319 26 26.3978 25.8478 26.7654C25.6448 27.2554 25.2554 27.6448 24.7654 27.8478C24.3978 28 23.9319 28 23 28C22.0681 28 21.6022 28 21.2346 27.8478C20.7446 27.6448 20.3552 27.2554 20.1522 26.7654C20 26.3978 20 25.9319 20 25Z" stroke="#2A353D" strokeWidth="1.5" />
                            </svg>
                            :
                            <NavLink to={`/users/${user?._id}`}>
                                <svg id='profile' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="#2A353D" strokeWidth="1.5" />
                                </svg>
                            </NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default TopMenu;
