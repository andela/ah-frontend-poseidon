import * as types from '../actions/types';
export default (state = {}, action) => {
  switch (action.type) {
    case types.LIKE_ARTICLE:
      localStorage.setItem('goToArticles', true);
      // window.location = `articles/${action.article.slug}/`;
      return {
        ...state,
        likes: action.article.likes,
        dislikes: action.article.dislikes
      };
    case types.DISLIKE_ARTICLE:
      localStorage.setItem('goToArticles', true);
      // window.location = `articles/${action.article.slug}/`;
      return {
        ...state,
        likes: action.article.likes,
        dislikes: action.article.dislikes
      };
    default:
      return state;
  }
};
