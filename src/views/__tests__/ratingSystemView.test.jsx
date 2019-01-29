import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { StarRatingSystemTest } from '../ratingSystemView';

const mockSTore = configureStore([thunk]);
const expectedStore = {};
const store = mockSTore(expectedStore);
const props = {
  actions: {
    postDataThunk: jest.fn(),
  },
  article: {
    article: {
      score: 2,
    },
  },
};
describe('renders the rating system component', () => {
  let wrapper;
  it('renders stars', () => {
    wrapper = mount(<StarRatingSystemTest actions={{ postDataThunk: jest.fn() }} {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'onStarClick');
    wrapper.find('StarRatingComponent label').first().simulate('click');
    wrapper.find('StarRatingComponent label').first().simulate('click');
  });
});
