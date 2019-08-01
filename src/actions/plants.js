import axiosAuth from "../middleware/axios-auth";
import { BASE_URL } from "./index";

export const PLANT_REQUEST_START = "PLANT_REQUEST_START";
export const PLANT_REQUEST_SUCCESS = "PLANT_REQUEST_SUCCESS";
export const PLANT_REQUEST_FAILURE = "PLANT_REQUEST_FAILURE";

export const createPlant = plant => async dispatch => {
  dispatch({ type: PLANT_REQUEST_START });

  const user = JSON.parse(localStorage.getItem("user"));

  return axiosAuth()
    .post(`${BASE_URL}/plants/`, { ...plant, user_id: user.id })
    .then(() => {
      dispatch({ type: PLANT_REQUEST_START });
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

      dispatch({ type: PLANT_REQUEST_FAILURE, payload: { message } });
    });
};

export const updatePlant = (id, plant) => async dispatch => {
  dispatch({ type: PLANT_REQUEST_START });

  return axiosAuth()
    .put(`${BASE_URL}/plants/${id}`, plant)
    .then(() => {
      dispatch({ type: PLANT_REQUEST_SUCCESS });
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

      dispatch({ type: PLANT_REQUEST_FAILURE, payload: { message } });
    });
};

export const deletePlant = id => async dispatch => {
  dispatch({ type: PLANT_REQUEST_START });

  return axiosAuth()
    .delete(`${BASE_URL}/plants/${id}`)
    .then(() => {
      dispatch({ type: PLANT_REQUEST_SUCCESS });
    })
    .catch(err => {
      let message;
      if (err.response) {
        switch (err.response.status) {
          case 401:
            message = "You are not authorized to delete this plant";
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

      dispatch({ type: PLANT_REQUEST_FAILURE, payload: { message } });
    });
};
