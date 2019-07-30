import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { addTokenToLocalStorage, addUserToLocalStorage } from "./middleware";

const store = createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(thunk, addTokenToLocalStorage, addUserToLocalStorage),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
