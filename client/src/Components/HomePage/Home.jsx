import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import VisitorHome from './VisitorHome';
import UserHome from './UserHome';

const Home = () => {
    // FETCH USER DATA
    const dispatch = useDispatch();
    const user = useSelector((state) => (state.currentUserReducer))

    useEffect(() => {
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    }, [dispatch])
    return (
        <>
            {
                // user === null ?
                //     <VisitorHome />
                // :
                    <UserHome />
            }
        </>
    )
}

export default Home
