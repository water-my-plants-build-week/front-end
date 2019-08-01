import axiosAuth from "../middleware/axios-auth";
import { BASE_URL } from "./index";

export const REMINDER_REQUEST_START = "REMINDER_REQUEST_START";
export const REMINDER_REQUEST_SUCCESS = "REMINDER_REQUEST_SUCCESS";
export const REMINDER_REQUEST_FAILURE = "REMINDER_REQUEST_FAILURE";

export const createReminder = reminder => async dispatch => {
  dispatch({ type: REMINDER_REQUEST_START });

  return axiosAuth()
    .post(`${BASE_URL}/twilio`, reminder)
    .then(() => {
      dispatch({ type: REMINDER_REQUEST_SUCCESS });
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
export const updateReminder = (id, reminderUpdate) => async dispatch => {
  dispatch({ type: REMINDER_REQUEST_START });
  return axiosAuth()
    .put(`${BASE_URL}/twilio/${id}`, reminderUpdate)
    .then(() => {
      dispatch({ type: REMINDER_REQUEST_SUCCESS });
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
