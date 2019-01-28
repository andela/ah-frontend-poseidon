import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProfileEditPage, { ProfileEditView } from '../profileEditView';


const mockStore = configureStore([thunk]);

describe('Profile edit view', () => {
  let wrapper;
  let store;
  let instance;

  const props = {
    getPrivateDataThunk: jest.fn(),
    postDataThunk: jest.fn(() => Promise.resolve({})),
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
    wrapper = shallow(<ProfileEditView {...props} history={historyMock} />);
    instance = wrapper.instance();
    jest.spyOn(instance, 'handleCancelClick');
    jest.spyOn(instance, 'handleSubmit');
    jest.spyOn(instance, 'handleChange');
  });

  it('renders container with the child component successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles click event for cancel button', () => {
    instance.handleCancelClick({
      preventDefault: () => {},
    });
    expect(instance.handleCancelClick).toBeCalled();
  });

  it('handles change event for inputs', () => {
    instance.handleChange({
      preventDefault: () => {},
      target: { name: 'username', value: 'bill' },
    });
    expect(instance.handleChange).toBeCalled();
  });

  it('handles submit event for save button', () => {
    instance.handleSubmit({
      preventDefault: () => {},
    });
    expect(instance.handleSubmit).toBeCalled();
  });

  it('renders loading alert', () => {
    const props = { getPrivateDataThunk: jest.fn() };
    wrapper = shallow(<ProfileEditView {...props} />);
    const inputFields = wrapper.find('.alert-primary');
    expect(inputFields).toHaveLength(1);
  });
});

describe('connected component', () => {
  let store;
  let wrapper;

  const props = {
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

  beforeEach(() => {
    store = mockStore({ profile: {} });
    store.dispatch = jest.fn();
    const getPrivateDataThunk = jest.fn();
    const postDataThunk = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <ProfileEditPage {...props} getPrivateDataThunk={getPrivateDataThunk} postDataThunk={postDataThunk} />
      </Provider>,
    );
  });

  it('should implement change when inputs receive data', () => {
    wrapper = mount(
      <ProfileEditView
        getPrivateDataThunk={jest.fn()}
        profile={{ profile: { username: 'Bill' } }}
      />,
    );
    const result = [{ secure_url: 'https://res.cloudinary.com/dos4j4vpc/image/upload/v1547647373/poseidon/cpih2ylhazsnidell5yl.jpg' }];
    global.cloudinary = {
      openUploadWidget: (params, cb) => {
        cb(null, result);
      },
    };
    wrapper.find('.file-upload').simulate('click');
  });
});
