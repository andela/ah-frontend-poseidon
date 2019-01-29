import { LIKE_ARTICLE, DISLIKE_ARTICLE } from "./types";

const likeArticle = article => ({ type: LIKE_ARTICLE, article });
const dislikeArticle = article => ({
  type: DISLIKE_ARTICLE,
  article
});

export { likeArticle, dislikeArticle };
