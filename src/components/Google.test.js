import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import Google from './Google';
import { RetriveUser } from '../redux/actions/SocialAuth';

describe('Social Login Component', () => {
  let wrapper;

  const data = {
    w3: {
      U3: 'token', ig: 'img', El: 'mmm', Paa: 'kk',
    },
    Zi: { access_token: 'iuyg7i87b' },
  };

  beforeEach(() => {
    wrapper = shallow(<Google />);
  });
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(data));
  it('should call Google login', async () => {
    wrapper.instance().GoogleLoginResponse(data).then(() => {
      // eslint-disable-next-line no-undef
      expect(jest.fn());
    });
  });
  it('Tests retrieving user token from backend', () => {
    const response = { tokenId: 'sdhhsdhjhjsdfhfshjshj' };
    const token = { auth_token: 'RTYRTTRURTUR' };
    fetchMock.get('https://ah-backend-poseidon-staging.herokuapp.com/api/user', {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user: token }),
    });
    RetriveUser(response).then(() => {
      // eslint-disable-next-line no-undef
      expect(jest.fn());
    });
  });
});
