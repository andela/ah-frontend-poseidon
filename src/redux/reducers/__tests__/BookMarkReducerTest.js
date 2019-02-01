import reducer from '../BookMarkReduer';
import * as ActionCreators from '../../actions/ArticleActionCreators';

describe('bookMark Reducer', () => {

  it('should hanlde bookmark artilce', () => {
    const expected = {
      message: 'my message',
    };
    expect(reducer({}, ActionCreators.bookMarkArticle("my message"),
    )).toEqual(expected);
  });
});
