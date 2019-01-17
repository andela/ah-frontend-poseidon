import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import SignUpForm from "..";

describe("SignUpForm component", () => {
  it("renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter>
        <SignUpForm
          onChange={jest.fn}
          onSubmit={jest.fn}
          isSignUp={true}
          formHasError={() => true}
        />
      </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
  });
});
