import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import postDataThunkNoHeader, { axiosInstance, getDataThunk, postDataThunk, getPrivateDataThunk
} from '..';
import { CREATE_ARTICLE, GET_ALL_ARTICLES, ERROR_OCCURRED } from '../../actions/types';
import { getAllArticles, createArticle } from '../../actions/ArticleActionCreators';
import { errorOccurred } from '../../actions/commonActions';
import { mockArticles, article, error } from '../../../__mocks__/articleMockData';

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
    httpMock.onGet('articles').reply(200, mockArticles);
    store
      .dispatch(getDataThunk('articles', getAllArticles))
      .then(() => {
        const { articles } = mockArticles;
        expect(
          store.getActions(),
        ).toEqual([{ type: GET_ALL_ARTICLES, articles }, { type: ERROR_OCCURRED, errMsg: null }]);
      });
  });

  it('Should handle ERROR_OCCURRED', () => {
    httpMock.onGet('articles/').reply(403, error);
    store
      .dispatch(getDataThunk('articles/', getAllArticles))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: ERROR_OCCURRED, errMsg: error }]);
      });
  });
});

describe('postDatathunk', () => {
  let httpMock;
  let store;
  const postData = [
    {
      header: postDataThunkNoHeader('articles/', data, createArticle, null, 'post'),
      title: 'Should return created article with no HEADER',
    },
    {
      header: getPrivateDataThunk('articles/', createArticle),
      title: 'Should return created article with no HEADER',
    },
    {
      header: postDataThunk('articles/', data, createArticle, 'post'),
      title: 'Should return created article with HEADER',
    }];
  const postDataError = [
    {
      header: postDataThunkNoHeader('articles/', data, createArticle, errorOccurred, 'post'),
      title: 'Should handle ERROR_OCCURRED',
    },
    {
      header: getPrivateDataThunk('articles/', createArticle),
      title: 'privateDataThunk ERROR_OCCURRED',
    },
    {
      header: postDataThunk('articles/', data, createArticle, 'post'),
      title: 'Should handle ERROR_OCCURRED',
    }];
  beforeEach(() => {
    httpMock = new MockAdapter(axiosInstance);
    const mockStore = configureStore([thunk]);
    store = mockStore({});
  });
  postData.forEach(post => (
    it(post.title, () => {
      httpMock.onPost('articles/').reply(201, article);
      httpMock.onGet('articles/').reply(201, article);
      store
        .dispatch(post.header)
        .then(() => {
          expect(store.getActions()).toEqual([{
            type: CREATE_ARTICLE,
            articles: {
              author: {
                bio: '',
                email: 'john@dev.com',
                following: false,
                image: null,
                username: 'John',
              },
              average_rating: 0,
              body: 'this is the body that am...',
              created_on: '2019-01-11T14:58:39.981957Z',
              description: 'this the story that am going to end here..',
              dislikes: 0,
              favourites_count: 0,
              id: 34,
              image_url: null,
              likes: 0,
              read_time: '0 min read',
              slug: 'the-20190111145839981441',
              tags: ['React'],
              title: 'the sand in the sky',
              updated_on: '2019-01-11T14:58:39.981999Z',
              view_counts: 0,
            },
          }]);
        });
    })
  ));
  postDataError.forEach(post => (
    it(post.title, () => {
      httpMock.onPost('articles/').reply(403, error);
      httpMock.onGet('articles/').reply(403, error);
      store
        .dispatch(post.header)
        .then(() => {
          expect(store.getActions()).toEqual([{ type: ERROR_OCCURRED, errMsg: error }]);
        });
    })
  ))

});
