/** module to combine all reducers */
import { combineReducers } from "redux";
import authReducer from "./authentication";
import profile from "./profileReducer";
import { postsLikes } from "./LikeDislikeReducer";

const rootReducer = combineReducers({
  authReducer,
  postsLikes,
  profile
});

export default rootReducer;
