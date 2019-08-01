import {
  CREATE_PLANT_START,
  CREATE_PLANT_SUCCESS,
  CREATE_PLANT_FAILURE,
  UPDATE_PLANT_START,
  UPDATE_PLANT_SUCCESS,
  UPDATE_PLANT_FAILURE
} from "../actions";

const initialState = {
  isLoading: false,
  errorMessage: null
};

export default function plant(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLANT_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CREATE_PLANT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null
      };
    }
    case CREATE_PLANT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message
      };
    }
    case UPDATE_PLANT_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case UPDATE_PLANT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null
      };
    }
    case UPDATE_PLANT_FAILURE: {
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
