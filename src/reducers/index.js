import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, GETTING_PLANTS, GOT_PLANTS, ADDED_PLANTS, DELETED_PLANTS } from "../actions";

const initialState = {
  plants: [],
  fetchingPlants: false,
  addingPlants: false,
  updatingPlants: false,
  deletingPlants: false,
  isLoading: false,
  errorMessage: null
};

export default function reducer(state = initialState, action) {
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
        errorMessage: null
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
    }
    case LOGIN_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null
      }
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      }
    }
    case GETTING_PLANTS: {
      return {
        ...state,
        fetchingPlants: true
      }
    }
    case GOT_PLANTS: {
      return {
        ...state,
        plants: action.payload,
        fetchingPlants: false
      }
    }
    case DELETED_PLANTS: {
      return {
        ...state,
        plants: action.payload,
        fetchingPlants: false
      }
    }
    default:
      return state;
  }
}
