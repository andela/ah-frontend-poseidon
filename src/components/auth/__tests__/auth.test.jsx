import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import SignUpForm from "..";

const props={
  renderInput: jest.fn(),
  handleLogin: jest.fn(),
  onSubmit: jest.fn(),
  isSignUp: jest.fn(),
  handleLogin: jest.fn(),
  renderInput: jest.fn(),
  isResetPassword: true,
  addNewPassword: true,
  changeToResetPassword: true,
  title: '',
  buttonName: '',
}
describe("SignUpForm component", () => {
  it("renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter>
        <SignUpForm
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
  });
});
