import { LOGIN_SUCCESS } from "../actions";

const addTokenToLocalStorage = _store => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    const token = action.payload.token;
    localStorage.setItem("token", token);
  }

  next({ type: action.type });
};

export default addTokenToLocalStorage;
