import axiosAuth from "../middleware/axios-auth";
import { BASE_URL } from "./index";

export const PLANT_REQUEST_START = "PLANT_REQUEST_START";
export const PLANT_REQUEST_SUCCESS = "PLANT_REQUEST_SUCCESS";
export const PLANT_REQUEST_FAILURE = "PLANT_REQUEST_FAILURE";

export const PLANT_CREATE_SUCCESS = "PLANT_CREATE_SUCCESS";
export const PLANT_DELETE_SUCCESS = "PLANT_DELETE_SUCCESS";
export const PLANT_UPDATE_SUCCESS = "PLANT_DELETE_SUCCESS";

export const createPlant = plant => async dispatch => {
  dispatch({ type: PLANT_REQUEST_START });

  const user = JSON.parse(localStorage.getItem("user"));

  return axiosAuth()
    .post(`${BASE_URL}/plants/`, { ...plant, user_id: user.id })
    .then(res => {
      dispatch({ type: PLANT_REQUEST_START });
      dispatch({ type: PLANT_CREATE_SUCCESS, payload: res.data });
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
      /*
       * The server doesn't send us the updated plant, so if it was successful
       * we will have to send the updated plant values to the reducer and merge
       * them with the preivous values for the plant
       * */
      dispatch({ type: PLANT_REQUEST_SUCCESS });
      dispatch({ type: PLANT_UPDATE_SUCCESS, payload: { plant, id } });
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
      dispatch({ type: PLANT_DELETE_SUCCESS, payload: id });
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
