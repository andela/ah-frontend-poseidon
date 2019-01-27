import React from 'react';
import { shallow, mount } from 'enzyme';

import { LikeDislikeView } from '../LikeDislikeView';

describe('handles liking and disliking of articles', () => {
  let wrapper;

  it('should handle liking when articles has likes greater than 0', () => {
    const localStorage = {
      getItem: something => JSON.stringify('#808080')
    };

    global.localStorage = localStorage;

    const article = {
      likes: 2
    };
    wrapper = mount(
      <LikeDislikeView article={article} postDataThunk={jest.fn} />
    );
    wrapper.instance().onLike();
    const color = localStorage.getItem('likeColor');
    expect(JSON.parse(color)).toBe('#808080');
  });

  it('should handle liking when articles has likes less than 0', () => {
    const localStorage = {
      getItem: something => JSON.stringify('#3f51b5')
    };

    global.localStorage = localStorage;
    const article = {
      article: {
        likes: 0
      }
    };
    wrapper = shallow(
      <LikeDislikeView article={article} postDataThunk={jest.fn} />
    );
    wrapper.instance().onLike();
    const color = localStorage.getItem('likeColor');
    expect(JSON.parse(color)).toBe('#3f51b5');
  });

  it('should handle dislikng when articles has dislikes greater than 0', () => {
    const localStorage = {
      getItem: something => JSON.stringify('#3f51b5')
    };

    global.localStorage = localStorage;
    const article = {
      dislikes: 2
    };
    wrapper = shallow(
      <LikeDislikeView article={article} postDataThunk={jest.fn} />
    );
    wrapper.instance().ondislike();
    const color = localStorage.getItem('dislikeColor');
    expect(JSON.parse(color)).toBe('#3f51b5');
  });

  it('should handle dislikng when articles has dislikes less than 0', () => {
    const localStorage = {
      getItem: something => JSON.stringify('#3f51b5')
    };

    global.localStorage = localStorage;
    const article = {
      article: {
        dislikes: 0
      }
    };
    wrapper = shallow(
      <LikeDislikeView article={article} postDataThunk={jest.fn} />
    );
    wrapper.instance().ondislike();
    const color = localStorage.getItem('dislikeColor');
    expect(JSON.parse(color)).toBe('#3f51b5');
  });
  it('UNSAFE_componentWillReceiveProps', () => {
    const article = {
      likes: 1,
      dislikes: 0,
      nextprops: {
        likeStatus: {
          likes: 1,
          dislikes: 0
        }
      }
    };
    wrapper = mount(
      <LikeDislikeView
        article={article}
        UNSAFE_componentWillReceiveProps={jest.fn}
      />
    );
    const status = { likeStatus: { likes: 1, dislikes: 1 } };
    wrapper.setProps = { likeStatus: { likes: 1, dislikes: 1 } };
    wrapper.instance().UNSAFE_componentWillReceiveProps(status);
  });
});
