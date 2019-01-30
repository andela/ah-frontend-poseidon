/** module to create the store */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

export default function(initialState = {}) {
  /** This creates the Redux store */
  return createStore(
    rootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
