import React from 'react';
import { mount } from 'enzyme';
import SideBar from '../SideBarComponent';
import mockArticles from '../mockData';

describe('Test home', () => {
  let wrapper;
  const props = {
    articles: mockArticles,
  };

  beforeEach(() => {
    wrapper = mount(<SideBar {...props} />);
  });

  it('successful render of sidebar', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 4 navs', () => {
    const sidebar = wrapper.find('li');
    expect(sidebar).toHaveLength(5);
  });
});
