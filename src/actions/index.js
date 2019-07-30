import axios from "axios";

import axiosAuth from "../middleware/axios-auth";

const BASE_URL = "https://water-my-plants-lambda.herokuapp.com/api";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const GETTING_PLANTS = "GETTING_PLANTS";
export const GOT_PLANTS = "GOT_PLANTS";
export const ADDED_PLANTS = "ADDED_PLANTS";
export const DELETED_PLANTS = "DELETED_PLANTS";

export const registerUser = (
  username,
  password,
  phoneNumber
) => async dispatch => {
  dispatch({ type: REGISTER_START });

  return axios
    .post(`${BASE_URL}/auth/register`, { username, password, phoneNumber })
    .then(() => {
      dispatch({ type: REGISTER_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: REGISTER_FAILURE, payload: "Failed to Register 😭" });
      throw new Error("Failed to register");
    });
};

export const login = (username, password) => async dispatch => {
  dispatch({ type: LOGIN_START });

  return axios
    .post(`${BASE_URL}/auth/login`, { username, password })
    .then(res => {
      const userId = res.data.user.id;

      localStorage.setItem("userId", userId);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data.message });
      throw new Error("Failed to login");
    });
};

export const getPlants = () => async dispatch => {
  const id = localStorage.getItem("userId");

  dispatch({ type: GETTING_PLANTS });
  return axiosAuth()
    .get(`${BASE_URL}/users/${id}`)
    .then(res => {
      dispatch({ type: GOT_PLANTS, payload: res.data.plants });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addPlant = plant => async dispatch => {
  dispatch({ type: GETTING_PLANTS });
  return axiosAuth()
    .post(`${BASE_URL}/plants/`, plant)
    .then(res => {
      console.log(res);
      dispatch({ type: ADDED_PLANTS, payload: res.data });
    });
};

export const deletePlant = id => async dispatch => {
  dispatch({ type: GETTING_PLANTS });
  return axiosAuth()
    .delete(`${BASE_URL}/plants/${id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: DELETED_PLANTS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
