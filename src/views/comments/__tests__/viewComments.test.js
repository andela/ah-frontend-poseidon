import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CommentCard from '../../../components/comments/commentsCard';
import CommentsView from '../viewComments';

const mockStore = configureStore([thunk]);
const expectedStore = {
  comments: {
    comments: [{},{}],
    current_comment: {},
  },
};
const store = mockStore(expectedStore);

const props = {
  comments: { comment: [] },
  getPrivateDataThunk: jest.fn(),
};

const commentProps = {
  id: 1,
  body: 'this is a comment',
  username: 'aye',
};

describe('comments', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <CommentsView {...props}  />
      </Provider>       
    );
  });

  it ('comments card should render ', () => {
    const wrapper = mount(<CommentCard {...commentProps} />);
    wrapper.contains(<div className="card-body " />);
  });

  it ('component did mount and map comments', () => {
    expect(wrapper.find('CommentCard')).toBeTruthy

  });
});
