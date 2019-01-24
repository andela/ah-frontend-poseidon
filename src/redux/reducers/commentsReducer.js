import { COMMENTS } from '../actions/types';

const initialState = {

  results: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS.GET_COMMENTS:
      return {
        ...state,
        results: action.comments,
      };
    case COMMENTS.POST_COMMENT:
      return {
        ...state,
        results: action.comment,
      };
    default:
      return state;
  }
};

export default commentReducer;
