import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { axiosInstance, getDataThunk, postDataThunk } from '..';
import { CREATE_ARTICLE, GET_ALL_ARTICLES, ERROR_OCCURRED } from '../../actions/types';
import { getAllArticles, createArticle } from '../../actions/ArticleActionCreators';
import { articles, article, error } from '../../../__mocks__/articleMockData';

const data = {
  article: {
    title: 'the sand in the sky',
    description: 'this the story that am going to end here..',
    body: 'this is the body that am...',
    tags: ['React'],
  },
};

describe('getDatathunk', () => {
  let httpMock;
  let store;
  beforeEach(() => {
    httpMock = new MockAdapter(axiosInstance);
    const mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it('Should return all articles', () => {
    httpMock.onGet('articles').reply(200, articles);
    store
      .dispatch(getDataThunk('articles', getAllArticles))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: GET_ALL_ARTICLES, articles }]);
      });
  });

  it('Should handle ERROR_OCCURRED', () => {
    httpMock.onGet('articles/').reply(403, error);
    store
      .dispatch(getDataThunk('articles', getAllArticles))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: ERROR_OCCURRED, errMsg: error }]);
      });
  });
});

describe('postDatathunk', () => {
  let httpMock;
  let store;
  beforeEach(() => {
    httpMock = new MockAdapter(axiosInstance);
    const mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it('Should return created article', () => {

    httpMock.onPost('articles/').reply(201, article);
    store
      .dispatch(postDataThunk('articles/', data, createArticle, 'post'))
      .then(() => {
        console.log(data)
        expect(store.getActions()).toEqual([{
          type: CREATE_ARTICLE, articles: {
            author: {
              bio: '', email: 'john@dev.com', following: false,
              image: null, username: 'John'
            }, average_rating: 0,
            body: 'this is the body that am...', created_on: '2019-01-11T14:58:39.981957Z',
            description: 'this the story that am going to end here..', dislikes: 0,
            favourites_count: 0, id: 34, image_url: null, likes: 0,
            read_time: '0 min read', slug: 'the-20190111145839981441',
            tags: ['React'], title: 'the sand in the sky',
            updated_on: '2019-01-11T14:58:39.981999Z', view_counts: 0
          }
        }]);
      });
  });

  it('Should handle ERROR_OCCURRED', () => {

    httpMock.onPost('articles/').reply(403, error);
    store
      .dispatch(postDataThunk('articles/', data, createArticle, 'put'))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: ERROR_OCCURRED, error }]);
      });
  });
});