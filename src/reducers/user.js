import {
  FETCHING_USER_PLANTS_START,
  FETCHING_USER_PLANTS_SUCCESS,
  FETCHING_USER_PLANTS_FAILURE,
  FETCHING_USER_REMINDERS_START,
  FETCHING_USER_REMINDERS_SUCCESS,
  FETCHING_USER_REMINDERS_FAILURE
} from "../actions";

const initialState = {
  plants: [],
  reminders: [],
  fetchingPlants: false,
  fetchingReminders: false,
  errorMessage: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER_PLANTS_START: {
      return {
        ...state,
        fetchingPlants: true
      };
    }
    case FETCHING_USER_PLANTS_SUCCESS: {
      return {
        ...state,
        fetchingPlants: false,
        plants: action.payload,
        errorMessage: null
      };
    }
    case FETCHING_USER_PLANTS_FAILURE: {
      return {
        ...state,
        fetchingPlants: false,
        errorMessage: action.payload.message
      };
    }
    case FETCHING_USER_REMINDERS_START: {
      return {
        ...state,
        fetchingReminders: true
      };
    }
    case FETCHING_USER_REMINDERS_SUCCESS: {
      return {
        ...state,
        reminders: action.payload.reminders,
        fetchingReminders: false,
        errorMessage: null
      };
    }
    case FETCHING_USER_REMINDERS_FAILURE: {
      return {
        ...state,
        fetchingReminders: false,
        errorMessage: action.payload.message
      };
    }
    default:
      return state;
  }
}
