/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HomeView from '../homeView';
import Editor from '../../components/articles/Editor';
import mockArticles from '../../components/Dashboard/mockData';

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
  },
  articles: mockArticles,
  match: { params: 'testing' },
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
      },
    });
    wrapper = mount(<Provider store={store}><HomeView {...props} /></Provider>);
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
});
