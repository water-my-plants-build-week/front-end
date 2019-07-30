import axiosAuth from "../middleware/axios-auth";
import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  registerUser,
  login
} from "./authorization";

import {
  FETCHING_USER_PLANTS_START,
  FETCHING_USER_PLANTS_SUCCESS,
  FETCHING_USER_PLANTS_FAILURE
} from "./user";

export const BASE_URL = "https://water-my-plants-lambda.herokuapp.com/api";

export const GETTING_PLANTS = "GETTING_PLANTS";
export const GOT_PLANTS = "GOT_PLANTS";
export const ADDED_PLANTS = "ADDED_PLANTS";
export const DELETED_PLANTS = "DELETED_PLANTS";

export const getPlants = () => async dispatch => {
  dispatch({ type: GETTING_PLANTS });

  const user = localStorage.getItem("user");
  const { id } = JSON.parse(user);

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

export {
  REGISTER_START,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  login,
  registerUser,
  FETCHING_USER_PLANTS_START,
  FETCHING_USER_PLANTS_SUCCESS,
  FETCHING_USER_PLANTS_FAILURE
};
