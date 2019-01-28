/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow, mount } from 'enzyme';
import ArticlePage from '../ArticlePage';
import { article } from '../../../__mocks__/articleMockData';

describe('Article page', () => {

  let wrapper;
  const onClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<ArticlePage article={article.articles} onClickHandler={onClick} />);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });
  
  it('renders without any errors', () => {
    expect(wrapper.find('.container')).toBeDefined();
  });

  it('renders a article title', () => {
    expect(wrapper.contains(<h1>{article.articles.title}</h1>)).toBeTruthy();
  });

  it('onClick event should be triggered when button is edit/delete button is clicked', () => {
    wrapper.find('#del').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('renders a tags', () => {
    expect(wrapper.find('.badge badge-info')).toBeDefined();
  });
  it('data innerHTML should be equal to article body', () => {
    jest.resetModules();
    jest.clearAllMocks();
    wrapper = mount(<ArticlePage article={article.articles} onClickHandler={onClick} />);
  });
});
