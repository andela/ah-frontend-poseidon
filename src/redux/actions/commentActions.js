import { COMMENTS } from './types';

export const getComments = comments => ({ type: COMMENTS.GET_COMMENTS, comments });
export const postComment = comment => ({ type: COMMENTS.POST_COMMENT, comment });


export default { getComments };
