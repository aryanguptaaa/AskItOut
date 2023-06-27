import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import decode from 'jwt-decode';

const BottomMenu = (props) => {

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
    // CHECK IF THE AAUTH TOKEN IS ALIVE OR NOT: IF THE USER IS LOGGED IN FOR MORE THAN 1 Hr., THEN AUTH TOKEN EXPIRES AND USER WILL NEED TO RELOGIN
    const token = fetchedUser?.token;
    if(token) {
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
  }, [dispatch])
  user = fetchedUser ? fetchedUser.result : null;

  /**
   * HANDLE LOGOUT REQUEST
   */
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate(isMobile ? "/login" : "/");
    dispatch(setCurrentUser(null));
  }

  /**
   * CENTRAL ICON
   */
  const centralIcon = (currentPage) => {
    if (currentPage === 'HomePage') {
      return (
        <NavLink to={user === null ? '/login' : '/ask'}>
          <svg id='AskQuestionIcon' className='cursor-pointer' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 5.33337V26.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.33334 16H26.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </NavLink>
      )
    } else if (currentPage === 'QuestionPage') {
      return (
        <button type='submit'>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0477 2.05293C17.8697 -0.292637 1.48648 5.4532 1.50001 7.551C1.51535 9.92987 7.89809 10.6617 9.66722 11.1581C10.7311 11.4565 11.016 11.7625 11.2613 12.8781C12.3723 17.9305 12.9301 20.4435 14.2014 20.4996C16.2278 20.5892 22.1733 4.342 20.0477 2.05293Z" stroke="white" strokeWidth="1.5" />
            <path d="M10.5 11.5L14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )
    } else if (currentPage === 'AskPage') {
      return (
        <button type='submit'>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0477 2.05293C17.8697 -0.292637 1.48648 5.4532 1.50001 7.551C1.51535 9.92987 7.89809 10.6617 9.66722 11.1581C10.7311 11.4565 11.016 11.7625 11.2613 12.8781C12.3723 17.9305 12.9301 20.4435 14.2014 20.4996C16.2278 20.5892 22.1733 4.342 20.0477 2.05293Z" stroke="white" strokeWidth="1.5" />
            <path d="M10.5 11.5L14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

      )
    } else if (currentPage === 'ProfilePage') {
      return (
        <svg onClick={handleLogout} id='LogoutIcon' className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    } else {
      return (
        <NavLink to={user === null ? '/login' : '/ask'}>
          <svg id='AskQuestionIcon' className='cursor-pointer' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 5.33337V26.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.33334 16H26.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </NavLink>
      )
    }
  }

  return (
    <div className='w-full sm:max-w-[400px] h-[74px] bg-white rounded-t-[24px] sm:rounded-[35px] sm:mb-3 p-9 flex justify-around items-center fixed bottom-0 sm:bottom-3'>
      <NavLink to='/'>
        <svg id='homeIcon' className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.0002 17C14.2006 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79968 17.6224 9.00015 17" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2.35154 13.2135C1.99852 10.9162 1.82201 9.76763 2.25632 8.74938C2.69062 7.73112 3.65418 7.03443 5.58129 5.64106L7.02114 4.6C9.41844 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3461 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3477 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2612 22 16.5538 22 13.139 22H10.8613C7.44649 22 5.73906 22 4.57115 21.0286C3.40324 20.0572 3.15302 18.4289 2.65258 15.1724L2.35154 13.2135Z" stroke="#2A353D" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </NavLink>

      <NavLink to='/explore'>
        <svg id='exploreIcon' className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.36134 6.87575C9.24969 6.22135 9.58839 5.68105 10.1768 5.37375C12.2707 4.28025 15.1262 3.02979 18.3279 2.04385C19.264 1.75559 20.2418 2.23534 20.5599 3.16171C20.8515 4.01105 21.2316 5.21605 21.6593 6.8124C22.087 8.40875 22.3604 9.64235 22.5326 10.5237C22.7203 11.485 22.1133 12.3894 21.1585 12.6078C17.8928 13.3548 14.7946 13.6996 12.4345 13.7996C11.7712 13.8277 11.2078 13.5291 10.9773 12.9066C10.7649 12.333 10.4672 11.4075 10.0682 9.91825C9.66914 8.42895 9.46424 7.47865 9.36134 6.87575Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9.42555 7.22705C7.57615 7.99075 5.5952 8.79525 4.19324 9.3284" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M5.27524 13.3667C6.75594 13.1274 8.87374 12.8337 10.8572 12.5703" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M4.07464 8.93261C3.92225 8.43346 3.49174 8.09951 2.98045 8.20416C2.87777 8.22516 2.76514 8.25151 2.64231 8.28441C2.51948 8.31731 2.40877 8.35081 2.30934 8.38396C1.81423 8.54901 1.60838 9.05346 1.72597 9.56191C1.84257 10.0661 2.03329 10.8412 2.34077 11.9887C2.64825 13.1362 2.87059 13.9028 3.02171 14.3977C3.17411 14.8969 3.60461 15.2308 4.1159 15.1262C4.21859 15.1052 4.33122 15.0788 4.45405 15.0459C4.57687 15.013 4.68758 14.9795 4.78702 14.9464C5.28214 14.7813 5.48799 14.2769 5.37039 13.7684C5.25379 13.2642 5.06309 12.4892 4.75559 11.3417C4.44811 10.1941 4.22576 9.42756 4.07464 8.93261Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M10.5 22.5L14.5 14L18.5 22.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavLink>

      <div id='centralIcon' className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
        {centralIcon(props.currentPage)}
      </div>

      <NavLink to={user === null ? '/login' : '/saved'}>
        <svg id='favBookmarksIcon' className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_20_22)">
            <path d="M16.59 16.073C16.4027 16.6424 15.5973 16.6424 15.41 16.073L14.1511 12.2449C14.0894 12.0575 13.9425 11.9106 13.7551 11.849L9.92705 10.59C9.35765 10.4027 9.35765 9.5973 9.92705 9.41L13.7551 8.15105C13.9425 8.0894 14.0894 7.94245 14.1511 7.7551L15.41 3.92703C15.5973 3.35765 16.4027 3.35765 16.59 3.92703L17.8489 7.7551C17.9106 7.94245 18.0575 8.0894 18.2449 8.15105L22.073 9.41C22.6424 9.5973 22.6424 10.4027 22.073 10.59L18.2449 11.849C18.0575 11.9106 17.9106 12.0575 17.8489 12.2449L16.59 16.073Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.4847 22.1492C8.33085 22.617 7.66915 22.617 7.5153 22.1492L6.56515 19.2602C6.5145 19.1062 6.3938 18.9855 6.23985 18.9349L3.35083 17.9847C2.88306 17.8308 2.88306 17.1692 3.35083 17.0153L6.23985 16.0651C6.3938 16.0145 6.5145 15.8938 6.56515 15.7399L7.5153 12.8508C7.66915 12.383 8.33085 12.383 8.4847 12.8508L9.43485 15.7399C9.4855 15.8938 9.6062 16.0145 9.76015 16.0651L12.6491 17.0153C13.1169 17.1692 13.1169 17.8308 12.6491 17.9847L9.76015 18.9349C9.6062 18.9855 9.4855 19.1062 9.43485 19.2602L8.4847 22.1492Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.43625 10.1842C6.29775 10.6052 5.7022 10.6052 5.56375 10.1842L4.70863 7.58415C4.66307 7.4456 4.55441 7.33695 4.41587 7.29135L1.81575 6.43625C1.39475 6.29775 1.39475 5.7022 1.81575 5.56375L4.41587 4.70863C4.55441 4.66307 4.66307 4.55441 4.70863 4.41587L5.56375 1.81575C5.7022 1.39475 6.2978 1.39475 6.43625 1.81575L7.29135 4.41587C7.33695 4.55441 7.4456 4.66307 7.58415 4.70863L10.1842 5.56375C10.6052 5.7022 10.6052 6.2978 10.1842 6.43625L7.58415 7.29135C7.4456 7.33695 7.33695 7.4456 7.29135 7.58415L6.43625 10.1842Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_20_22">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </NavLink>

      <NavLink to={user === null ? '/login' : '/myquestions'}>
        <svg id='myQuestionsIcon' className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 14.5H15.5M8.5 9.5H12" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z" stroke="#2A353D" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </NavLink>
    </div>
  )
}

export default BottomMenu
