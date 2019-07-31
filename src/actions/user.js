import axiosAuth from "../middleware/axios-auth";
import { BASE_URL } from "./index";
export const FETCHING_USER_PLANTS_START = "FETCHING_USER_PLANTS_START";
export const FETCHING_USER_PLANTS_SUCCESS = "FETCHING_USER_PLANTS_SUCCESS";
export const FETCHING_USER_PLANTS_FAILURE = "FETCHING_USER_PLANTS_FAILURE";

export const getPlants = () => async dispatch => {
  dispatch({ type: FETCHING_USER_PLANTS_START });

  const user = localStorage.getItem("user");
  const { id } = JSON.parse(user);

  return axiosAuth()
    .get(`${BASE_URL}/users/${id}`)
    .then(res => {
      dispatch({
        type: FETCHING_USER_PLANTS_SUCCESS,
        payload: res.data.plants
      });
    })
    .catch(err => {
      console.log(err);
      // TODO: COME BACK TO ERROR MESSAGE
      dispatch({ type: FETCHING_USER_PLANTS_FAILURE });
    });
};
