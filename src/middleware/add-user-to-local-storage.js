import { LOGIN_SUCCESS } from "../actions";

const addUserToLocalStorage = _store => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    const user = action.payload.user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  next(action);
};

export default addUserToLocalStorage;
