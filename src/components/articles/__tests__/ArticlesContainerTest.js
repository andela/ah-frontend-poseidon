/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount, render } from '../../../__tests__/setup/setupEnzyme';
import ArticlesContainer, { ArticleView } from '../Articles';
import { article } from '../../../__mocks__/articleMockData';
import ArticlePage from '../ArticlePage';


jest.useFakeTimers();

describe('Articles Container', () => {

  let wrapper;
  let store;
  const onClick = jest.fn();
  const props = {
    viewArticle: false,
    backToHome: jest.fn(),
    singleArticlePage: jest.fn,
    isLoading: jest.fn,
  }
  beforeEach(() => {
    Object.defineProperty(global.document, 'execCommand', { value: jest.fn(), writable: true });
    Object.defineProperty(global.document, 'getElementById', { value: jest.fn(() => ({ innerHTML: ['none'] })), writable: true });
    Object.defineProperty(global, 'prompt', { value: jest.fn(() => (['none'] ))});
    ArticlePage.prototype.componentDidMount = () => 'Test';
    const mockStore = configureStore([thunk]);
    store = mockStore({ articles: { article } });
    wrapper = mount(<Provider store={store}>
      <ArticlesContainer {...props} />
    </Provider>);
  });

  it('renders without any errors', () => {
    expect(wrapper.find('.container')).toBeDefined();
  });
  it('should render single article page when viewArticle prop is true', () => {
    expect(wrapper.find('.singleArticle')).toBeDefined();
  });

  it('renders a tags', () => {
    expect(wrapper.find('.badge badge-info')).toBeDefined();
  });
  it('handleDelete', () => {
    const newProps = {
      ...props,
      viewArticle: true,
    }
    const mountedWrapper = mount(
      <Provider store={store}>
        <ArticlesContainer {...newProps} />
      </Provider>);

    mountedWrapper.find('#del').simulate('click');
    jest.runAllTimers();
  });
  it('handleEdit', () => {
    const newProps = {
      ...props,
      viewArticle: true,
    }
    const mountedWrapper = mount(
      <Provider store={store}>
        <ArticlesContainer {...newProps} />
      </Provider>);
    mountedWrapper.find('#edit').simulate('click');
    jest.runAllTimers();
  });
  it('handleChangeValue', () => {
    wrapper.find('#articleData').simulate('submit');
    jest.runAllTimers();
  });
  it('handleArticleBody', () => {
    wrapper = mount(<ArticleView />);
    const spy = jest.spyOn(wrapper.instance(), 'handleArticleBody');
    wrapper.find('#contentArea').simulate('input', { target: { innerText: 'test' }  });    
    wrapper.find('#contentArea').simulate('input', { target: { innerText: 'test' }  });  

    expect(spy).toHaveBeenCalled();
    jest.runAllTimers();
  });

  it('handles value change', () => {
    wrapper = mount(<ArticleView />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleChangeValue');
    // instance.handleChangeValue({
    //   getTitle: 'number',
    // });
    const value = 'number';
    wrapper.find('#title').simulate('change', { target: value });
    expect(instance.handleChangeValue).toBeCalled();
  });
});
