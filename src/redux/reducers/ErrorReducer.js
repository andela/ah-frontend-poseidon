import * as types from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.ERROR_OCCURRED:
      return { ...state, error: action.errMsg };

    default:
      return state;
  }
};
