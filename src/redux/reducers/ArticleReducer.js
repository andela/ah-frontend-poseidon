import * as types from '../actions/types';

export default (state = {}, action) => {
  let newState;
  switch (action.type) {
    case types.CREATE_ARTICLE:
      return Object.assign({}, state, {
        articles: [...state.articles, action.articles],
        article: action.articles,
      });

    case types.EDIT_ARTICLE:
      newState = state.articles.map((article) => {
        if (article.id !== action.articles.id) {
          return article;
        }
        return {
          ...article,
          ...action.articles,
        };
      });
      return Object.assign({}, state, {
        articles: [...newState],
        article: action.articles,
      });


    case types.DELETE_ARTICLE:
      return Object.assign(state, {
        articles: [...state.articles.filter(article => article.slug !== action.articleSlug)],
        article: null,
      });

    case types.GET_ARTICLE:
      return Object.assign(state, {
        article: state.articles.find(article => article.slug === action.articleSlug),
      });

    case types.REQUEST_ARTICLE:
      return Object.assign(state, {
        article: action.article.articles,
      });

    case types.GET_ALL_ARTICLES:
      return { ...state, articles: [...action.articles.results] };

    default:
      return state;
  }
};
