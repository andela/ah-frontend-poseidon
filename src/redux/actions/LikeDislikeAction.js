import { LIKE_ARTICLE, UNLIKE_ARTICLE } from "../types";

export const likeAction = () => ({
  /** function to generate a like-up action */
  type: LIKE_ARTICLE
});

export const dislikeAction = () => ({
  /** function to generate a like-up action */
  type: UNLIKE_ARTICLE
});
