import * as types from './types';

const createArticle = ({ articles }) => ({ type: types.CREATE_ARTICLE, articles });

const editArticle = ({ articles }) => ({ type: types.EDIT_ARTICLE, articles });

const deleteArticle = articleSlug => ({ type: types.DELETE_ARTICLE, articleSlug });

const getOneArticle = articleSlug => ({ type: types.GET_ARTICLE, articleSlug });

const getAllArticles = ({ articles }) => ({ type: types.GET_ALL_ARTICLES, articles });

const requestArticle = article => ({ type: types.REQUEST_ARTICLE, article });

const rateArticle = score => ({ type: types.Rate_Article, score });

const shareArticle = articleSlug => ({ type: types.SHARE_ARTICLE, articleSlug });

const bookMarkArticle = message => ({ type: types.BOOKMARK_ARTICLE, message });

export {
  createArticle, editArticle, deleteArticle, getOneArticle, getAllArticles, requestArticle,
  rateArticle, shareArticle, bookMarkArticle,
};
