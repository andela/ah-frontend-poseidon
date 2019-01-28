import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import SignUpForm from '..';

const props = {
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  handleLogin: jest.fn(),
  renderInput: jest.fn(),
  changeToResetPassword: jest.fn(),
  isSignUp: true,
  isResetPassword: true,
  addNewPassword: true,
  title: '',
  buttonName: '',
};
SignUpForm.defaultProps = props;
describe('SignUpForm component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SignUpForm {...props} />
      </MemoryRouter>,
    );
    expect(wrapper).toHaveLength(1);
  });
});
