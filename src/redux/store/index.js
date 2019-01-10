/** module to create the store */
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import rootReducer from "../reducers";

export default (initialState = {}) =>
  createStore(
    rootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );
