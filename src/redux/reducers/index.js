import { combineReducers } from "redux";
import articles from "./ArticleReducer";
import error from "./ErrorReducer";
import auth from "./authReducer";

const rootReducer = () =>
  combineReducers({
    articles,
    error,
    auth
  });

export default rootReducer;
