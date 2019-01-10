/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from '../../../__tests__/setup/setupEnzyme';
import ArticlePage from '../ArticlePage';
import { article } from '../../../__mocks__/articleMockData';

describe('Article page', () => {

  let wrapper;
  const onClick = jest.fn();
  beforeAll(() => {
    ArticlePage.prototype.componentDidMount = () => 'Test';
  });
  beforeEach(() => {
    wrapper = shallow(<ArticlePage article={article} onClickHandler={onClick} />);
  });

  it('renders without any errors', () => {
    expect(wrapper.find('.container')).toBeDefined();
  });

  it('renders a article title', () => {
    expect(wrapper.contains(<h1>{article.title}</h1>)).toBeTruthy();
  });

  it('onClick event should be triggered when button is edit/delete button is clicked', () => {
    wrapper.find('#del').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('renders a tags', () => {
    expect(wrapper.find('.badge badge-info')).toBeDefined();
  });
});
