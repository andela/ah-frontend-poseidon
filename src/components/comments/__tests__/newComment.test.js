import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { NewComment } from '../newComment';


const mockStore = configureStore([thunk]);
const expectedStore = {
  comments: {
    comments: [{}],
    current_comment: {},
  },
};
const store = mockStore(expectedStore);

const props = {
  comments: { comment: [] },
  postDataThunk: jest.fn(),
  getDataThunk: jest.fn(),
};
jest.useFakeTimers();

describe('comments', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <NewComment {...props}  />
      </Provider>       
    );
  })
  it('should render form ', () => {
    wrapper.contains(<textarea />);
  });

  it('submit a new comment ', () => {
    const event = { preventDefault: jest.fn(), target: { comment: { value: "this is a comment" } } };
    const spy = jest.spyOn(wrapper.instance().props.children.props, 'postDataThunk');
    wrapper.find('form').simulate('submit', event);
    expect(spy).toHaveBeenCalled();
    jest.runAllTimers();
    const getAll = jest.spyOn(wrapper.instance().props.children.props, 'getDataThunk');
    expect(getAll).toHaveBeenCalled();
  });
});
