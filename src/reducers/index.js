import { combineReducers } from "redux";

import authorization from "./authorization";
import plants from "./plants";
import reminders from "./reminders";

import {
  FETCHING_USER_PLANTS_START,
  FETCHING_USER_PLANTS_SUCCESS,
  FETCHING_USER_PLANTS_FAILURE,
  FETCHING_USER_REMINDERS_START,
  FETCHING_USER_REMINDERS_SUCCESS,
  FETCHING_USER_REMINDERS_FAILURE
} from "../actions";

/*
 * TODO:
 * extract this reducer into it's own slice
 *
 */
const initialState = {
  plants: [],
  reminders: [],
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
    case FETCHING_USER_REMINDERS_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case FETCHING_USER_REMINDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        reminders: action.payload
      };
    }
    case FETCHING_USER_REMINDERS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message
      };
    }
    default:
      return state;
  }
}

export default combineReducers({ authorization, user, plants, reminders });
