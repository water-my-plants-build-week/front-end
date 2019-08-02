import { LOGIN_SUCCESS, UPDATE_USER_SUCCESS } from "../actions";

const addUserToLocalStorage = _store => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    const user = action.payload.user;
    localStorage.setItem("user", JSON.stringify(user));
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    const currentuser = JSON.parse(localStorage.getItem("user"));
    const user = action.payload.user;
    localStorage.setItem("user", JSON.stringify({ ...currentuser, ...user }));
  }

  next(action);
};

export default addUserToLocalStorage;
