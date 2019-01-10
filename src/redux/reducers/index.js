/** module to combine all reducers */
import { combineReducers } from 'redux';
import authReducer from './authentication';

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
