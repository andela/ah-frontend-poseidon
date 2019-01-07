import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const defaultState = {};

export default function (initialState = defaultState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
