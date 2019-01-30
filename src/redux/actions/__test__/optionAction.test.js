import * as types from "../types";
import * as actions from "../optionActions";

describe("actions", () => {
  it("should create an action to like an article", () => {
    const article = {};
    const expectedAction = {
      type: types.LIKE_ARTICLE,
      article
    };
    expect(actions.likeArticle(article)).toEqual(expectedAction);
  });

  it("should create an action to DISLIKE an article", () => {
    const article = {};
    const expectedAction = {
      type: types.DISLIKE_ARTICLE,
      article
    };
    expect(actions.dislikeArticle(article)).toEqual(expectedAction);
  });
});
