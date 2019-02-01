/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { mount } from 'enzyme';
import NavBarComponent from '../NavBarComponent';

describe('Tags Component', () => {
  let wrapper;
  beforeEach(() => {

    Object.defineProperty(global.document, 'getElementById', {
      value: jest.fn(() => ({ style: { width: 0 } })),
      writable: true,
    });
    const props = {
      changeToArticle: jest.fn(),
      viewBookmark: jest.fn(),
      bookmarks: [{ slug: 'test-slug', title: 'test title' }],
    };
    wrapper = mount(<NavBarComponent {...props} />);
    localStorage.setItem('token', 'testtoken');
  });
  it('viewBookmark should be called onClick', () => {
    const spy = jest.spyOn(wrapper.props(), 'viewBookmark');
    wrapper.find('#link').simulate('click');
    expect(spy).toBeCalled();
  });
  it('should ', () => {
    wrapper.find('.closebtn').simulate('click');
  });
});
