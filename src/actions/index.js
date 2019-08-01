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
  PLANT_REQUEST_START,
  PLANT_REQUEST_FAILURE,
  PLANT_REQUEST_SUCCESS,
  createPlant,
  updatePlant,
  deletePlant
} from "./plants";

export const BASE_URL = "https://water-my-plants-lambda.herokuapp.com/api";

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
  createPlant,
  getPlants,
  updatePlant,
  deletePlant,
  PLANT_REQUEST_START,
  PLANT_REQUEST_FAILURE,
  PLANT_REQUEST_SUCCESS
};
