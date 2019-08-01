import {
  FETCHING_USER_PLANTS_START,
  FETCHING_USER_PLANTS_SUCCESS,
  FETCHING_USER_PLANTS_FAILURE,
  FETCHING_USER_REMINDERS_START,
  FETCHING_USER_REMINDERS_SUCCESS,
  FETCHING_USER_REMINDERS_FAILURE,
  REMINDER_CREATE_SUCCESS,
  REMINDER_DELETE_SUCCESS,
  PLANT_CREATE_SUCCESS,
  PLANT_UPDATE_SUCCESS,
  PLANT_DELETE_SUCCESS
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
        reminders: action.payload,
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
    case REMINDER_CREATE_SUCCESS: {
      return {
        ...state,
        reminders: state.reminders.concat(action.payload)
      };
    }
    case REMINDER_DELETE_SUCCESS: {
      return {
        ...state,
        reminders: state.reminders.filter(
          reminder => reminder._id !== action.payload
        )
      };
    }
    case PLANT_CREATE_SUCCESS: {
      return {
        ...state,
        plants: state.plants.concat(action.payload)
      };
    }
    case PLANT_UPDATE_SUCCESS: {
      return {
        ...state,
        plants: state.plants.map(plant =>
          plant.id === action.payload.id
            ? { ...plant, ...action.payload.plant }
            : plant
        )
      };
    }
    case PLANT_DELETE_SUCCESS: {
      return {
        ...state,
        plants: state.plants.filter(plant => plant.id !== action.payload)
      };
    }
    default:
      return state;
  }
}
