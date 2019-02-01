/** module to combine all reducers */
import { combineReducers } from 'redux';
import authReducer from './authentication';
import profile from './profileReducer';
import articles from './ArticleReducer';
import error from './ErrorReducer';
import optionsReducer from './optionReducer';
import comments from './commentsReducer';

const rootReducer = () => combineReducers({
  profile,
  authReducer,
  articles,
  error,
  optionsReducer,
  comments,
});

export default rootReducer;
