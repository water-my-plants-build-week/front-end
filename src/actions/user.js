import axiosAuth from "../middleware/axios-auth";
import { BASE_URL } from "./index";

export const FETCHING_USER_PLANTS_START = "FETCHING_USER_PLANTS_START";
export const FETCHING_USER_PLANTS_SUCCESS = "FETCHING_USER_PLANTS_SUCCESS";
export const FETCHING_USER_PLANTS_FAILURE = "FETCHING_USER_PLANTS_FAILURE";
export const FETCHING_USER_REMINDERS_START = "FETCHING_USER_REMINDERS_START";
export const FETCHING_USER_REMINDERS_SUCCESS =
  "FETCHING_USER_REMINDERS_SUCCESS";
export const FETCHING_USER_REMINDERS_FAILURE =
  "FETCHING_USER_REMINDERS_FAILURE";

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
      let message;
      if (err.response) {
        switch (err.response.status) {
          case 404:
            message = "User not found";
            break;
          case 401:
            message = "Unauthorized";
            break;
          case 500:
            message = "Something went wrong. Try again";
            break;
          default:
            message = "Something went wrong. Try again";
            break;
        }

        if (!message) {
          message = "Something went wrong. Try again";
        }

        dispatch({ type: FETCHING_USER_PLANTS_FAILURE, payload: { message } });
      }
    });
};

export const getReminders = () => async dispatch => {
  const user = localStorage.getItem("user");
  const { id } = JSON.parse(user);

  dispatch({ type: FETCHING_USER_REMINDERS_START });

  return axiosAuth()
    .get(`${BASE_URL}/twilio/user/${id}`)
    .then(res => {
      dispatch({
        type: FETCHING_USER_REMINDERS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      let message;
      if (err.response) {
        switch (err.response.status) {
          case 404:
            message = "User not found";
            break;
          case 401:
            message = "Unauthorized";
            break;
          case 500:
            message = "Something went wrong. Try again";
            break;
          default:
            message = "Something went wrong. Try again";
            break;
        }

        if (!message) {
          message = "Something went wrong. Try again";
        }

        dispatch({
          type: FETCHING_USER_REMINDERS_FAILURE,
          payload: { message }
        });
      }
    });
};
