import axios from "axios";
import { BASE_URL } from "./index";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const registerUser = ({
  username,
  password,
  phoneNumber,
  timezone,
  useTwilio = true
} = {}) => async dispatch => {
  dispatch({ type: REGISTER_START });

  return axios
    .post(`${BASE_URL}/auth/register`, {
      username,
      password,
      phoneNumber,
      timezone,
      useTwilio
    })
    .then(() => {
      /*
       * On a successful registration we are going to auto-login the user
       * so we are not concerned with the data that is returned from the server
       * on a successful registration.
       *
       * */

      dispatch({ type: REGISTER_SUCCESS });
    })
    .catch(err => {
      let message;

      if (err.response) {
        if (err.response.status === 400) {
          message = err.response.data.message;
        } else if (
          err.response.status === 500 &&
          typeof err.response.data !== "string"
        ) {
          message = "Username is already taken";
        }
      }

      if (!message) {
        message = "Please provide a username and a password";
      }

      dispatch({ type: REGISTER_FAILURE, payload: { message } });

      /*
       * We want to use the promise returned from this action to determine
       * whether we should redirect the user, so in the case of an error we
       * should throw an error so the front end can catch. The error message
       * isn't as important because we are putting an error message into state
       * that we can display for the user.
       * */

      throw new Error(message);
    });
};

export const login = (username, password) => async dispatch => {
  dispatch({ type: "LOGIN_START" });

  return axios
    .post(`${BASE_URL}/auth/login`, { username, password })
    .then(res => {
      /*
       * On a 200 the server returns an object with the shape:
       *
       * {
       *   user: {
       *     id: number,
       *     username: string,
       *     password: string, (hashed)
       *     phoneNumber: string || null,
       *     timezone: string || null,
       *     useTwilio: boolean, (defaults to 0?)
       *     avatar_id: string || null,
       *   },
       *   token: string,
       * }
       **/

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
          user: res.data.user
        }
      });
    })
    .catch(err => {
      let message;
      let status;
      if (err.response) {
        status = err.response.status;
        switch (err.response.status) {
          case 400:
            message = "Please provide a username and a password";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          case 500:
            message = "Something went wrong. Try again";
            break;
          default:
        }
      }

      if (!message) {
        message = "Something went wrong. Try again";
      }

      dispatch({ type: LOGIN_FAILURE, payload: { message, status } });

      /*
       * Because we want to redirect the user to a protected route after being
       * successfully logged in, and we do so via promise chaining, we need to
       * throw an error on a server error to prevent that from happening.
       *
       * The error can be caught by the front end, but we are dispatching an
       * error with a payload anyways, so we can use that that payload to
       * display more information to the user on the front end.
       * */
      throw new Error(message);
    });
};
