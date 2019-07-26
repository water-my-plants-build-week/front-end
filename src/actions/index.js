import axios from "axios";

const BASE_URL = "https://water-my-plants-lambda.herokuapp.com/api";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_START = "LOGIN_START"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const registerUser = (
  username,
  password,
  phoneNumber
) => async dispatch => {
  dispatch({ type: REGISTER_START });

  return axios
    .post(`${BASE_URL}/auth/register`, { username, password, phoneNumber })
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: REGISTER_FAILURE, payload: "Failed to Register 😭" });
      throw new Error('Failed to register')
    });
};

export const login = (
  username,
  password
) => async dispatch => {
  dispatch({ type : LOGIN_START });

  return axios
  .post (`${BASE_URL}/auth/login`, { username, password })
  .then(res => {
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
  })
  .catch(err => {
    dispatch({ type: LOGIN_FAILURE, payload: err.response.data.message });
  });
};
