import optionReducer from "../optionReducer";
import { LIKE_ARTICLE, DISLIKE_ARTICLE } from "../../actions/types";

describe("LikeDislike  reducers", () => {
  it("should return the initial state", () => {
    expect(optionReducer(undefined, {})).toEqual({});
  });
  it("Test for liking an article", () => {
    const initialState = {};
    const action = {
      type: LIKE_ARTICLE,

      article: {
        likes: 1
      }
    };

    const expected = {
      likes: 1
    };
    const newState = optionReducer(initialState, action);
    expect(newState).toEqual(expected);
  });

  it("Test for liking and article", () => {
    const initialState = {};
    const action = {
      type: DISLIKE_ARTICLE,

      article: {
        dislikes: 1
      }
    };
    const expected = {
      dislikes: 1
    };
    const newState = optionReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
});
