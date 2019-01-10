import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function (initialState = {}) {
  /** This creates the Redux store */
  return createStore(rootReducer(), initialState, applyMiddleware(thunk));
}
