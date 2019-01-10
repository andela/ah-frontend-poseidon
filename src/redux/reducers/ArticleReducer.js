import * as types from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_ARTICLE:
      return Object.assign({}, state, {
        articles: {
          ...state.articles,
          results: [...state.articles.results.concat(action.articles)],
        },
      });

    case types.EDIT_ARTICLE:
      return {
        ...state,
        article: state.articles.results.find(article => article.slug === action.articles.slug),
      };

    case types.DELETE_ARTICLE:
      return Object.assign(state, {
        articles: {
          ...state.articles,
          results: [
            ...state.articles.results.filter(article => article.slug !== action.articleSlug)],
        },
      });

    case types.GET_ARTICLE:
      return {
        ...state,
        article: state.articles.results.find(article => article.slug === action.articleSlug),
      };

    case types.GET_ALL_ARTICLES:
      return { ...state, articles: action.articles };

    default:
      return state;
  }
};
