import { COMMENTS } from '../types';

const getComments = comments => ({ type: COMMENTS.GET_COMMENTS, comments });
const postComment = comment => ({ type: COMMENTS.POST_COMMENT, comment });


export default { getComments, postComment };
