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
  PLANT_DELETE_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  LOGIN_SUCCESS
} from "../actions";

const initialState = {
  plants: [],
  reminders: [],
  user: null,
  fetchingPlants: false,
  fetchingReminders: false,
  errorMessage: null,
  isLoading: false
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
    case UPDATE_USER_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user
      };
    }
    case UPDATE_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user
      };
    }
    default:
      return state;
  }
}
