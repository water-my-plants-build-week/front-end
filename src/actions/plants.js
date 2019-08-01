import axiosAuth from "../middleware/axios-auth";
import { BASE_URL } from "./index";

export const CREATE_PLANT_START = "CREATE_PLANT_START";
export const CREATE_PLANT_SUCCESS = "CREATE_PLANT_SUCCESS";
export const CREATE_PLANT_FAILURE = "CREATE_PLANT_FAILURE";

export const UPDATE_PLANT_START = "UPDATE_PLANT_START";
export const UPDATE_PLANT_SUCCESS = "CREATE_PLANT_SUCCESS";
export const UPDATE_PLANT_FAILURE = "UPDATE_PLANT_FAILURE";

export const createPlant = plant => async dispatch => {
  dispatch({ type: CREATE_PLANT_START });

  const user = JSON.parse(localStorage.getItem("user"));

  return axiosAuth()
    .post(`${BASE_URL}/plants/`, { ...plant, user_id: user.id })
    .then(() => {
      dispatch({ type: CREATE_PLANT_SUCCESS });
    })
    .catch(err => {
      let message;
      if (err.reponse) {
        switch (err.response.status) {
          case 400:
            message = "Oops it looks like you forgot the plant name";
            break;
          case 401:
            message = "Unauthorized request";
            break;
          case 500:
            message = "Something unexpected happened. Try again";
            break;
          default:
            message = "Something unexpected happened. Try again";
        }
      }

      if (!message) {
        message = "Something unexpected happened. Try again";
      }

      dispatch({ type: CREATE_PLANT_FAILURE, payload: { message } });
    });
};

export const updatePlant = (id, plant) => async dispatch => {
  dispatch({ type: UPDATE_PLANT_START });
  console.log("I CONSOLE LOGGED HERE ", id);

  return axiosAuth()
    .post(`${BASE_URL}/plants/${id}`, plant)
    .then(() => {
      dispatch({ type: UPDATE_PLANT_SUCCESS });
    })
    .catch(err => {
      let message;
      if (err.response) {
        switch (err.response.status) {
          case 401:
            message = "Not authorized";
            break;
          case 404:
            message = "No plant found with that id";
            break;
          default:
            message = "Something unexpected happened. Try again";
        }
      }

      if (!message) {
        message = "Something unexpected happened. Try again";
      }

      dispatch({ type: UPDATE_PLANT_FAILURE, payload: { message } });
    });
};
