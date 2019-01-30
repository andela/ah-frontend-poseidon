/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import ArticlesContainer, { ArticleView } from '../Articles';
import { article } from '../../../__mocks__/articleMockData';
import ArticlePage from '../ArticlePage';

jest.useFakeTimers();

describe('Articles Container', () => {
  let wrapper;
  let store;
  const { articles } = article;
  const props = {
    viewArticle: false,
    backToHome: jest.fn(),
    singleArticlePage: jest.fn,
    isLoading: jest.fn,
    article,
    postDataThunk: jest.fn(),
    getDataThunk: jest.fn(),
    deleteArticle: jest.fn(),
  };
  beforeEach(() => {
    ArticlePage.prototype.componentDidMount = () => 'Test';
    const mockStore = configureStore([thunk]);
    store = mockStore({ articles: { article: articles } });
    wrapper = mount(
      <Provider store={store}>
        <ArticlesContainer {...props} />
      </Provider>,
    );
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
    };
    const mountedWrapper = mount(
      <Provider store={store}>
        <ArticlesContainer {...newProps} />
      </Provider>,
    );

    mountedWrapper.find('#del').simulate('click');
    jest.runAllTimers();
  });
  it('handleEdit', () => {
    const newProps = {
      ...props,
      viewArticle: true,
    };
    const mountedWrapper = mount(
      <Provider store={store}>
        <ArticlesContainer {...newProps} />
      </Provider>,
    );
    mountedWrapper.update();
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
    wrapper
      .find('#contentArea')
      .simulate('input', { target: { innerText: 'test' } });
    wrapper
      .find('#contentArea')
      .simulate('input', { target: { innerText: 'test' } });

    expect(spy).toHaveBeenCalled();
    jest.runAllTimers();
  });

  it('handles value change', () => {
    wrapper = mount(<ArticleView />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleChangeValue');
    const value = 'number';
    wrapper.find('#title').simulate('change', { target: value });
    expect(instance.handleChangeValue).toBeCalled();
  });

  it('should implement change when inputs receive data', () => {
    const result = [{ secure_url: 'https://res.cloudinary.com/dos4j4vpc/image/upload/v1547647373/poseidon/cpih2ylhazsnidell5yl.jpg' }];
    global.cloudinary = {
      openUploadWidget: (params, cb) => {
        cb(null, result);
      },
    };
    wrapper.find('.file-upload').simulate('click');
  });
});

describe('social share', () => {
  let store;
  const { articles } = article;
  const props = {
    viewArticle: false,
    backToHome: jest.fn(),
    singleArticlePage: jest.fn,
    isLoading: jest.fn,
    article,
    postDataThunk: jest.fn(),
    getDataThunk: jest.fn(),
    deleteArticle: jest.fn(),
    
  };

  it('handles share email', () => {
    const newProps = {
      ...props,
      viewArticle: true,
    };
    const mockStore = configureStore([thunk]);
    store = mockStore({ articles: { article: articles } });
    const mountedWrapper = mount(
      <Provider store={store}>
        <ArticlesContainer {...newProps} />
      </Provider>,
    );
    mountedWrapper.find('#share-email').simulate('click', 'the-20190111145839981441');
    expect(mountedWrapper.find('#share-email')).toBeDefined();
  });
});
