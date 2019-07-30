import {
  FETCHING_USER_PLANTS_START,
  FETCHING_USER_PLANTS_SUCCESS,
  FETCHING_USER_PLANTS_FAILURE
} from "../actions";

const initialState = {
  plants: [],
  isLoading: false,
  errorMessage: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER_PLANTS_START: {
    }
    case FETCHING_USER_PLANTS_SUCCESS: {
    }
    case FETCHING_USER_PLANTS_FAILURE: {
    }
    default:
      return state;
  }
}
