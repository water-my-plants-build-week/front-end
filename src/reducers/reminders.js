import {
  REMINDER_REQUEST_START,
  REMINDER_REQUEST_SUCCESS,
  REMINDER_REQUEST_FAILURE
} from "../actions";

const initialState = {
  isLoading: false,
  errorMessage: null
};

export default function reminders(state = initialState, action) {
  switch (action.type) {
    case REMINDER_REQUEST_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case REMINDER_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null
      };
    }
    case REMINDER_REQUEST_FAILURE: {
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
