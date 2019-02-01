/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HomeViewTest, { HomeView } from '../homeView';
import Editor from '../../../components/articles/Editor';
import mockArticles from '../../../components/dashboard/mockData';

let store;
jest.useFakeTimers();

const testClickButton = (wrapper, buttonId, mockMethod) => {
  wrapper.find(buttonId).simulate('submit');
  expect(mockMethod).toHaveBeenCalled();
};

const mockStore = configureStore([thunk]);

const homeProps = {
  getArticle: jest.fn(),
  articles: mockArticles,
  nextPage: 'https://ah-backend-poseidon-staging.herokuapp.com/api/articles?page=2',
  prevPage: '',
  currentPage: 1,
  getArticlesPage: jest.fn()
};

const props = {             
  actions: {
    getOneArticle: jest.fn(),
    getDataThunk: jest.fn(),
    getPrivateDataThunk: jest.fn(),
    postDataThunk: jest.fn(),
    deleteArticle: jest.fn(),
    getOneBookmark: jest.fn(),
  },
  match: { params: 'none' },
  articles: mockArticles,
  nextPage: 'https://ah-backend-poseidon-staging.herokuapp.com/api/articles?page=2',
  prevPage: '',
  currentPage: 1,
  handleSearchInput: jest.fn(),
  handleSearchClick: jest.fn(),
  bookmarks: mockArticles,
};

const state = {
  keyword: '',
  author: '',
  tags: '',
};

describe('Home view test', () => {
  let wrapper;

  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => { style: { width: 30 }})         
    Object.defineProperty(global.document, 'getElementById', {
      value: jest.fn(() => ({ style: { width: 0 } })),
      writable: true,
    });
    Editor.prototype.componentDidMount = () => 'Test';
    store = mockStore({
      articles: {
        articles: mockArticles,
        article: mockArticles[1],
      },
      comments: {
        comments: [{}],
        current_comment: {},
      },
      error: {
        error: null,
      },
    });
    localStorage.setItem('user', 'usertoken');
    wrapper = mount(<Provider store={store}><HomeViewTest {...props} {...state} /></Provider>);
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

  it('should handle click event on tag', () => {
    wrapper.find('#tag-name').first().simulate('click');
    expect(wrapper.find('#tag-name')).toBeDefined();
  });

  it('should fetch and display next articles (pagination)', () => {
    wrapper = mount(<HomeView {...props} error={null} />);
    const spy = jest.spyOn(wrapper.instance(), 'getArticlesPage');
    wrapper.find('#nextPage').simulate('click');
  });

  it('should change state when search input is given', () => {
    const event = { target: { name: 'keyword', value: 'dragon' } };
    wrapper.find('.search').simulate('change', event);
    expect(wrapper.find('.search')).toBeDefined();
  });

  it('should handle click event on search icon', () => {
    const event = { target: { name: 'keyword', value: 'dragon' } };
    wrapper.find('.search').simulate('change', event);
    wrapper.find('.search-icon').first().simulate('click');
    expect(wrapper.find('.search-icon')).toBeDefined();
  });

  it('should handle click event on apply filter - author', () => {
    const event = { target: { name: 'author', value: 'jake' } };
    wrapper.find('.author').simulate('change', event);
    wrapper.find('.filter').first().simulate('click');
    expect(wrapper.find('.filter')).toBeDefined();
  });

  it('should handle click event on apply filter - tags', () => {
    const event = { target: { name: 'tags', value: 'dragons' } };
    wrapper.find('.tags').simulate('change', event);
    wrapper.find('.filter').first().simulate('click');
    expect(wrapper.find('.filter')).toBeDefined();
  });

  it('should handle click event on apply filter - tags&author', () => {
    const event1 = { target: { name: 'author', value: 'jake' } };
    wrapper.find('.author').simulate('change', event1);
    const event = { target: { name: 'tags', value: 'dragons' } };
    wrapper.find('.tags').simulate('change', event);
    wrapper.find('.filter').first().simulate('click');
    expect(wrapper.find('.filter')).toBeDefined();
  });

  it('should key press event', () => {
    const getData = wrapper.instance().props.children.props.actions.getDataThunk;
    const event = { target: { name: 'keyword', value: 'dragon' } };
    wrapper.find('.search').simulate('change', event);
    wrapper.find('.search').simulate('keypress', { charCode: 13, preventDefault: jest.fn() });
    expect(getData).toHaveBeenCalled();
  });

  it('should call openNav function', () => {
    wrapper.find('#openPanel').simulate('click');
  });
  it('viewBookmark function should be called', () => {
    wrapper = shallow(<HomeView {...props} />);
    const instance = wrapper.instance();
    instance.viewBookmark('how-to-kill');
    expect(instance.state.goToArticles).toEqual(true);
  });
});
