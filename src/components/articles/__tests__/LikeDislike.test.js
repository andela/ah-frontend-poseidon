import { MemoryRouter } from "react-router-dom";
import React from "react";
import { shallow } from "enzyme";
import LikeDislikeComponent from "../LikeDislikeComponent";

const article = {
  article: { title: "title", body: "body" }
};
const props = {
  renderInput: jest.fn(),
  loading: false,
  article,
  likeColor: jest.fn(),
  dislikeColor: jest.fn(),
  onLike: jest.fn(),
  ondislike: jest.fn()
};

describe("LikeDislikeComponent component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LikeDislikeComponent {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
  });
});
