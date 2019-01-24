/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HomeViewTest, { HomeView } from '../homeView';
import Editor from '../../components/articles/Editor';
import mockArticles from '../../components/dashboard/mockData';

let store;
jest.useFakeTimers();

const testClickButton = (wrapper, buttonId, mockMethod) => {
  wrapper.find(buttonId).simulate('submit');
  expect(mockMethod).toHaveBeenCalled();
};

const mockStore = configureStore([thunk]);

const props = {
  actions: {
    getOneArticle: jest.fn(),
    getDataThunk: jest.fn(),
  },
  match: { params: 'none' },
  articles: mockArticles,
  nextPage: '',
  prevPage: '',
  currentPage: 1,
};
describe('Home view test', () => {
  let wrapper;

  beforeEach(() => {
    Editor.prototype.componentDidMount = () => 'Test';
    Object.defineProperty(global.document, 'execCommand', { value: jest.fn(), writable: true });
    Object.defineProperty(global.document, 'getElementById', { value: jest.fn(() => ({ innerHTML: ['none'] })), writable: true });
    Object.defineProperty(global, 'prompt', { value: jest.fn(() => (['none'] ))});
    store = mockStore({
      articles: {
        articles: mockArticles,
        article: mockArticles[1],
      },
    });
    wrapper = mount(<Provider store={store}><HomeViewTest {...props} /></Provider>);
  });
  it('renders without crashing', () => {
    expect(wrapper.find('SideBar')).toBeDefined();
  });
  it('should change to create articles page', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    wrapper.find('#newArticle').simulate('click', event);
    jest.runAllTimers();
    expect(wrapper.find('#newArticle')).toBeDefined();
  });

  it('should change to create articles page', () => {
    jest.runAllTimers();
    wrapper.find('#readMore').first().simulate('click');
    expect(wrapper.find('#readMore')).toBeDefined();
  });

  it('should chan', () => {
    props.match = { params: { articleId: 'how-to-train-your-dragon' } };
    wrapper = mount(<Provider store={store}><HomeViewTest {...props} /></Provider>);
    jest.runAllTimers();
  });
});
