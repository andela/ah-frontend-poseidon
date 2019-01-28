import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Profile, { ProfileView } from '../profileView';

const mockStore = configureStore([thunk]);

describe('Profile View', () => {
  let wrapper;
  let store;
  let instance;
  const props = {
    getPrivateDataThunk: jest.fn(),
    profile: {
      profile: {
        username: 'kabanga',
        email: 'bill.twinomuhwezi@andela.com',
        bio: 'I love sports and tech',
        image: null,
        following: false,
      },
    },
  };
  const historyMock = { push: jest.fn() };
  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    wrapper = shallow(<ProfileView {...props} history={historyMock} />);
    instance = wrapper.instance();
    jest.spyOn(instance, 'handleClick');
  });

  it('renders container with the child component successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles click event', () => {
    instance.handleClick({
      preventDefault: () => {},
    });
    expect(instance.handleClick).toBeCalled();
  });

  it('renders loading alert', () => {
    const props = { getPrivateDataThunk: jest.fn() };
    wrapper = shallow(<ProfileView {...props} />);
    const inputFields = wrapper.find('.alert-primary');
    expect(inputFields).toHaveLength(1);
  });
});

describe('connected component', () => {
  let store;
  const props = {
    getPrivateDataThunk: jest.fn(),
    profile: {
      profile: {
        username: 'kabanga',
        email: 'bill.twinomuhwezi@andela.com',
        bio: 'I love sports and tech',
        image: null,
        following: false,
      },
    },
  };

  store = mockStore({ profile: { profile: {} } });
  mount(
    <Provider store={store}>
      <Profile {...props} />
    </Provider>,
  );
});
