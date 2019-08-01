import { combineReducers } from "redux";

import authorization from "./authorization";
import plants from "./plants";

import {
  FETCHING_USER_PLANTS_START,
  FETCHING_USER_PLANTS_SUCCESS,
  FETCHING_USER_PLANTS_FAILURE
} from "../actions";

/*
 * TODO:
 * extract this reducer into it's own slice
 *
 */
const initialState = {
  plants: [],
  isLoading: false,
  errorMessage: null
};

function user(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER_PLANTS_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case FETCHING_USER_PLANTS_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case FETCHING_USER_PLANTS_SUCCESS: {
      return {
        ...state,
        plants: action.payload,
        isLoading: false
      };
    }
    default:
      return state;
  }
}

export default combineReducers({ authorization, user, plants });
