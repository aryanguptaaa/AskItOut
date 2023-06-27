import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';

const UpdateProfile = () => {

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

    /**
     * PROFILE WHICH HAS TO BE EDITED
     */
    const { id } = useParams();
    const usersList = useSelector((state) => (state.usersReducer));
    const currentProfile = (usersList.filter((user) => user._id === id))[0];
    console.log(currentProfile);

    // If this profile is not of logged in user, sent it back to the profile page and not allow to edit
    if (user._id !== id) {
        navigate(`/users/${id}`);
    }

    return (
        <div>
             This page is on it's way....
        </div>
    )
}

export default UpdateProfile;