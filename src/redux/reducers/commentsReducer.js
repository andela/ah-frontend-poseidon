import { COMMENTS } from '../actions/types';

const initialState = {
  comments: [],

};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS.GET_COMMENTS:
      return {
        ...state,
        comments: action.comments.comment,
      };
    case COMMENTS.POST_COMMENT:
      return {
        ...state,
        current_comment: action.comment.comment,
      };
    default:
      return state;
  }
};

export default comments;
