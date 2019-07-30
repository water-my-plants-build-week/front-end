import { combineReducers } from "redux";
import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions";

const initialRegisterState = {
  isLoading: false,
  errorMessage: null
};

export function registration(state = initialRegisterState, action) {
  switch (action.type) {
    case REGISTER_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null // Because a successful registration might directly
        // follow an unsuccessful registration, we want to make sure to clear
        // out an error state;
      };
    }
    case REGISTER_FAILURE: {
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

const initialLogInState = {
  isLoading: false,
  errorMessage: null
};

export function login(state = initialLogInState, action) {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null
      };
    }
    case LOGIN_FAILURE: {
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

export default combineReducers({ registration, login });
