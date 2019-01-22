/** module to combine all reducers */
import { combineReducers } from 'redux';
import authReducer from './authentication';
import profile from './profileReducer';

const rootReducer = () => combineReducers({
  profile, authReducer,
});

export default rootReducer;
