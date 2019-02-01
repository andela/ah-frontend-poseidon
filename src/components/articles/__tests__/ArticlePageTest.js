/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ArticlePage from '../ArticlePage';
import { article } from '../../../__mocks__/articleMockData';

const mockSTore = configureStore([thunk]);
const expectedStore = {};
const store = mockSTore(expectedStore);

describe('Article page', () => {
  let wrapper;
  const onClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ArticlePage
        article={article.articles}
        onClickHandler={onClick}
        shareHandler={onClick}
        bookMark={onClick}
      />
    );
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
    wrapper = shallow(
      <Provider store={store}>
        <ArticlePage
          article={article.articles}
          onClickHandler={onClick}
          shareHandler={onClick}
          bookMark={onClick}
        />
      </Provider>
    );
  });
});
