import {
  PLANT_REQUEST_START,
  PLANT_REQUEST_SUCCESS,
  PLANT_REQUEST_FAILURE
} from "../actions";

const initialState = {
  isLoading: false,
  errorMessage: null
};

export default function plant(state = initialState, action) {
  switch (action.type) {
    case PLANT_REQUEST_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case PLANT_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null
      };
    }
    case PLANT_REQUEST_FAILURE: {
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
