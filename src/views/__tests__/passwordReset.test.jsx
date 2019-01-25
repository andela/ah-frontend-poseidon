import React from 'react';
import { notify } from 'react-notify-toast';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import PasswordResetView, { PasswordTest } from '../PasswordResetView';
import { Provider } from 'react-redux';

const show = jest.fn();
notify.show = show;

describe('password reset', () => {
  let wrapper;
  const mockStore = configureStore([thunk]);
  jest.mock('react-notify-toast');

  const expectedStore = {
    authReducer: {
      signUpFailure: null,
      signUpSuccess: { Message: 'A link has been sent to your email' },
    },
  };

  const props = {
    history: {
      push: jest.fn()
    },
    match: {
      params: { token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYXJrYXllYmFyZSIsImVtYWlsIjoibWFyay5heWViYXJlQGFuZGVsYS5jb20iLCJleHAiOjE1NDgwNzc0MzF9.TpHwiXfKYxr1gK3JljqaUIic9nKFFysW0kfHrYP41ho' } 
    },
    postDataThunk: jest.fn(),
    postDataThunkNoHeader: jest.fn(),
    signUpActionCreatorSuccess: jest.fn(),
    signUpActionCreatorFailure: jest.fn(),  
    isResetPassword:true,
    addNewPassword:true,
  };

  const store = mockStore(expectedStore);

  beforeEach(() => {
    wrapper = mount(
      <PasswordTest {...props} store={store} />
    );
  });  
  it('renders password reset view', () => {
    mount(<Provider store={store}>
      <PasswordResetView {...props} />
    </Provider> 
    );
  });
  it('renders view on reset link clicked', () => {     
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'http://localhost/password-reset' }  
    });
  });
  it('tests reset of password link sent to email', () => {
    wrapper.setState({
      isResetPassword: false,
      addNewPassword: true,
    });
    const event = { preventDefault: jest.fn(), target: { elements: { email: { value: 'm@gmail.com' } } } }
    const spy = jest.spyOn(wrapper.instance().props, 'postDataThunkNoHeader');
    wrapper.find('form').simulate('submit', event)
    expect(spy).toHaveBeenCalled();
  });
  it('tests new password created', () => {
    wrapper.setState({
      isResetPassword: true,
      addNewPassword: false,
    });
    const event = { preventDefault: jest.fn(), target: { elements: { password: { value: "JDH56HX9Wom" } } } }
    const spy = jest.spyOn(wrapper.instance().props, 'postDataThunk')
    wrapper.find('form').simulate('submit', event)
    expect(spy).toHaveBeenCalled()
  });
  it('component will recieve props on success', () => {
    const wrapUser = mount(<PasswordTest {...props} {...expectedStore} />);
    wrapUser.setProps({
      signUpData: expectedStore.authReducer.signUpSuccess,
      signUpErrors: null,
    }, () => {
      expect(wrapUser.state()).toEqual(expect.objectContaining({ loader: { loading: false } }));
    });
  });
  it('component will recieve props on failure', () => {
    wrapper.setProps({
      signUpData: null,
      errors: {
        user: {
          detail: 'Not found.',
        },
      },
    }, () => {
      expect(wrapper.state()).toEqual(expect.objectContaining({ loader: { loading: false } }));
    });
  });
  it('component load new page', () => {
    wrapper.setState({
      isResetPassword: true,
      addNewPassword: false,
    });     
    const spy = jest.spyOn(wrapper.instance(), 'redirectOnSuccesfullPasswordReset')
    wrapper.setProps({
      signUpData: { Message: 'Your password has been updated succesfully' }
    })
    expect(spy).toHaveBeenCalled()  
  });
});
