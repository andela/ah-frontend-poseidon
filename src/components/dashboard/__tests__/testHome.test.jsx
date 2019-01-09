import React from 'react';
import { mount } from 'enzyme';
import Home from '../../HomeComponent';
import mockArticles from '../mockData';

describe('Test home', () => {
  let wrapper;
  let props = {
    articles: mockArticles,
  };

  beforeEach(() => {
    wrapper = mount(<Home {...props} />);
  });

  it('successful render of articleContent', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders components', () => {
    const articleContent = wrapper.find('Article');
    expect(articleContent).toHaveLength(5);
  });

  it('empty article list', () => {
    props = {};
    wrapper = mount(<Home {...props} />);
    const articleContent = wrapper.find('Article');
    expect(articleContent).toHaveLength(0);
  });
});
