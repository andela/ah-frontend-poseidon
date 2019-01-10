/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ArticleView from '../../components/articles/Articles';
import { article } from '../../__mocks__/articleMockData';

let store;

const testClickButton = (wrapper, buttonId, mockMethod) => {
  wrapper.find(buttonId).simulate('submit');
  expect(mockMethod).toHaveBeenCalled();
};

const mockStore = configureStore([thunk]);

const props = {
  actions: {
    postDataThunk: jest.fn(),
    getDataThunk: jest.fn(),
    getOneArticle: jest.fn(),
    deleteArticle: jest.fn(),
  },
  article,
  viewArticle: false,
  backToHome: jest.fn(),
  singleArticlePage: jest.fn(),
};
describe('Name of the group', () => {

  beforeEach(() => {
    const initialState = {
      articles: { articles: {} },
    };
    store = mockStore({
      articles: {
        articles: {},
      },
    });
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><ArticleView {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
