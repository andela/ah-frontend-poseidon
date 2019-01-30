import * as types from '../actions/types';

const initialState = {
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.BOOKMARK_ARTICLE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
