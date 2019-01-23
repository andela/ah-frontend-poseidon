import reducer from '../ArticleReducer';
import * as ActionCreators from '../../actions/ArticleActionCreators';

const state = {
};

describe('article Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('should handle CREATE_ARTICLE', () => {
    const expected = {
      articles: [{}],
      article: {},
    };
    expect(reducer({ articles: [] }, ActionCreators.createArticle({ articles: {} }),
    )).toEqual(expected);
  });

  it('should handle EDIT_ARTICLE to return updated state', () => {
    const articles = {
      articles: [{ id: 1, title: 'oop' }],
    };
    const expected = {
      article: { id: 1, title: 'react' },
      articles: [{ id: 1, title: 'react' }],
    };

    expect(reducer(articles, ActionCreators.editArticle({articles: { id: 1, title: 'react' } }),
    )).toEqual(expected);
  });

  it('should handle initial state when there is nothing to update', () => {
    const articles = {
      articles: [{ id: 1, title: 'oop' }]
    };
    const expected = {
      article: { id: 2, title: 'react' },
      articles: [{ id: 1, title: 'oop' }],
    };

    expect(reducer(articles, ActionCreators.editArticle({ articles: { id: 2, title: 'react' } }),
    )).toEqual(expected);
  });

  it('should handle DELETE_ARTICLE', () => {
    const articles = {
      article: { slug: 'oop' },
      articles: [{ slug: 'oop' }],
    };
    const expected = {
      article: null,
      articles: [],
    };

    expect(reducer(articles, ActionCreators.deleteArticle('oop'),
    )).toEqual(expected);
  });

  it('should handle GET_ALL_ARTICLES', () => {
    const expected = {
      articles: [{}],
    };
    expect(reducer(state, ActionCreators.getAllArticles({ articles: { results: [{}] } }),
    )).toEqual(expected);
  });

  it('should handle GET_ARTICLE', () => {
    const articles = {
      articles: [{ a: 'b' }, { slug: 'david' }],
    };
    const expected = {
      article: { slug: 'david' },
      articles: [{ a: 'b' }, { slug: 'david' }],
    };

    expect(reducer(articles, ActionCreators.getOneArticle('david'),
    )).toEqual(expected);
  });
});
