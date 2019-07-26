import axios from "axios";

const BASE_URL = "https://water-my-plants-lambda.herokuapp.com/api";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerUser = (
  username,
  password,
  phoneNumber
) => async dispatch => {
  dispatch({ type: REGISTER_START });

  return axios
    .post(`${BASE_URL}/auth/register`, { username, password, phoneNumber })
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
    })
    .catch(() => {
      dispatch({ type: REGISTER_FAILURE, payload: "Failed to register user" });
    });
};
