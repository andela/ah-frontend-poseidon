import commentsReducer from '../commentsReducer';
import {
  postComment,
  getComments,
} from '../../actions/commentActions';

const initialState = {
  comments: [],
};
const expected = {
  comments: [],
  current_comment: {
  },
};

describe('comments reducer', () => {
  it('should return a new comment', () => {
    const newState = commentsReducer(initialState, postComment({ comment: {} }));
    expect(newState).toEqual(expected);
  });

  it('should return the initial state', () => {
    expect(commentsReducer(undefined, {})).toEqual({ comments: [] });
  });

  it('should handle GET_COMMENTS', () => {
    const comments = { comment: [] };
    const newState = commentsReducer({}, getComments(comments));
    expect(newState).toEqual(initialState);
  });
});
