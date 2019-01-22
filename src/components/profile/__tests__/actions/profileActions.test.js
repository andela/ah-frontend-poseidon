import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import { viewProfile, editProfile } from '../../../../redux/actions/profileActions';
import { axiosInstance, getPrivateDataThunk, postDataThunk } from '../../../../redux/thunks/index';
import { VIEW_PROFILE, EDIT_PROFILE } from '../../../../redux/actions/types';


describe('profile_actions', () => {
  let httpMock;
  let store;
  beforeEach(() => {
    httpMock = new MockAdapter(axiosInstance);
    const mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it('Should return profile', () => {
    const response = {
      profile: {
        username: 'kabanga',
        email: 'bill.twinomuhwezi@andela.com',
        bio: 'I love sports and tech',
        image: null,
        following: false,
      },
    };
    httpMock.onGet('profiles/kabanga').reply(200, response);
    store
      .dispatch(getPrivateDataThunk('profiles/kabanga', viewProfile))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: VIEW_PROFILE, profile: response }]);
      });
  });

  it('Should update profile', () => {
    const data = {
      user: {
        username: 'kabanga',
        bio: 'I love sports and tech'
      }
    };
    httpMock.onPut('user/').reply(200);
    store
      .dispatch(postDataThunk('profiles/kabanga', data, editProfile, 'put'))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: EDIT_PROFILE, profile: response }]);
      });
  });
});
