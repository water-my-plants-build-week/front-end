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
  FETCHING_USER_PLANTS_FAILURE,
  getPlants
} from "./user";

import {
  CREATE_PLANT_START,
  CREATE_PLANT_SUCCESS,
  CREATE_PLANT_FAILURE,
  createPlant
} from "./plants";

export const BASE_URL = "https://water-my-plants-lambda.herokuapp.com/api";

export const GETTING_PLANTS = "GETTING_PLANTS";
export const GOT_PLANTS = "GOT_PLANTS";
export const DELETED_PLANTS = "DELETED_PLANTS";

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
  FETCHING_USER_PLANTS_FAILURE,
  CREATE_PLANT_START,
  CREATE_PLANT_FAILURE,
  CREATE_PLANT_SUCCESS,
  createPlant,
  getPlants
};
