import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE } from "../actions";

const initialState = {
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
    default:
      return state;
  }
}
