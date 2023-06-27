import { getAllUsers, updateProfile } from '../api';

const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await getAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
const updateUserProfile = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await updateProfile(id, updateData);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export {
    fetchAllUsers,
    updateUserProfile
}