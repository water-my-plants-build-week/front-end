import axiosAuth from "../middleware/axios-auth";
import { BASE_URL } from "./index";

export const REMINDER_REQUEST_START = "REMINDER_REQUEST_START";
export const REMINDER_REQUEST_SUCCESS = "REMINDER_REQUEST_SUCCESS";
export const REMINDER_REQUEST_FAILURE = "REMINDER_REQUEST_FAILURE";

export const REMINDER_DELETE_SUCCESS = "REMINDER_DELETE_SUCCESS";
export const REMINDER_CREATE_SUCCESS = "REMINDER_CREATE_SUCCESS";
export const REMINDER_UPDATE_SUCCESS = "REMINDER_UPDATE_SUCCESS";

export const createReminder = reminder => async dispatch => {
  dispatch({ type: REMINDER_REQUEST_START });

  return axiosAuth()
    .post(`${BASE_URL}/twilio`, reminder)
    .then(res => {
      dispatch({ type: REMINDER_REQUEST_SUCCESS });
      dispatch({ type: REMINDER_CREATE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      let message;
      if (err.response) {
        switch (err.response.status) {
          case 400:
            message = "Invalid Request. Check your phone number";
            break;
          case 401:
            message = "Make sure you're logged in";
            break;
          case 500:
            message = "Something went wrong. Try again";
            break;
          default:
            message = "Something went wrong. Try again";
            break;
        }
      }

      if (!message) {
        message = "Something went wrong. Try again";
      }

      dispatch({ type: REMINDER_REQUEST_FAILURE, payload: { message } });
    });
};

/*
 * We weren't successful in getting a non 500 error from the server when
 * attempting to update a reminder.
 * */
export const updateReminder = (id, reminderUpdate) => async dispatch => {
  dispatch({ type: REMINDER_REQUEST_START });
  return axiosAuth()
    .put(`${BASE_URL}/twilio/${id}`, reminderUpdate)
    .then(res => {
      dispatch({ type: REMINDER_REQUEST_SUCCESS });
      dispatch({ type: REMINDER_UPDATE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      let message;
      if (err.response) {
        switch (err.response.status) {
          case 400:
            message = "Invalid Request. Check your phone number";
            break;
          case 401:
            message = "Make sure you're logged in";
            break;
          case 500:
            message = "Something went wrong. Try again";
            break;
          default:
            message = "Something went wrong. Try again";
            break;
        }
      }

      if (!message) {
        message = "Something went wrong. Try again";
      }

      dispatch({ type: REMINDER_REQUEST_FAILURE, payload: { message } });
    });
};

export const deleteReminder = id => async dispatch => {
  dispatch({ type: REMINDER_REQUEST_START });

  return axiosAuth()
    .delete(`${BASE_URL}/twilio/${id}`)
    .then(() => {
      dispatch({ type: REMINDER_REQUEST_SUCCESS });
      dispatch({ type: REMINDER_DELETE_SUCCESS, payload: id });
    })
    .catch(err => {
      let message;
      if (err.response) {
        switch (err.response.status) {
          case 400:
            message = "Invalid Request. Check your phone number";
            break;
          case 401:
            message = "Make sure you're logged in";
            break;
          case 500:
            message = "Something went wrong. Try again";
            break;
          default:
            message = "Something went wrong. Try again";
            break;
        }
      }

      if (!message) {
        message = "Something went wrong. Try again";
      }

      dispatch({ type: REMINDER_REQUEST_FAILURE, payload: { message } });
    });
};
