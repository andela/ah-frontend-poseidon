// Then we're defining our reducers. Here I have 3 reducers:
// posts, postsLikes and postsLikeCounters
// Obviously you may want to use other data structures

export function postsLikes(state = {}, action) {
  switch (action.type) {
    case "LIKE_ARTICLE":
      return {
        ...state,
        [action.article.id]: true
      };
    case "UNLIKE_ARTICLE":
      return {
        ...state,
        [action.article.id]: false
      };
    default:
      return state;
  }
}

export default { postsLikes };
