/** module to combine all reducers */
import { combineReducers } from 'redux';
import authReducer from './authentication';
import profile from './profileReducer';
import articles from './ArticleReducer';
import error from './ErrorReducer';

const rootReducer = () => combineReducers({
  profile, authReducer, articles, error,
});

export default rootReducer;
