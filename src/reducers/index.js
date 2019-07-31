import { combineReducers } from "redux";

import authorization from "./authorization";
import plants from "./plants";

import {
  GETTING_PLANTS,
  GOT_PLANTS,
  ADDED_PLANTS,
  DELETED_PLANTS
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
    case GETTING_PLANTS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GOT_PLANTS: {
      return {
        ...state,
        plants: action.payload,
        isLoading: false
      };
    }
    case ADDED_PLANTS: {
      return {
        ...state,
        plants: state.plants.concat(action.payload),
        isLoading: false
      };
    }
    case DELETED_PLANTS: {
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
