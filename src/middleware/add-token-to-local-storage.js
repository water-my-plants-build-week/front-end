import { LOGIN_SUCCESS } from "../actions";

const addTokenToLocalStorage = _store => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    const token = action.payload;
    localStorage.setItem("token", token);
  }

  next(action);
};

export default addTokenToLocalStorage;
