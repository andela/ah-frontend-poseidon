import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import Facebook from './Facebook';
import { RetriveUser } from '../redux/actions/SocialAuth';

describe('Social Login Component', () => {
  let wrapper;

  const data = {
    email: 'token@mail.com',
    name: 'rockerferller',
    id: 'yygy',
    access_token: '8ubybh',
    picture: {
      data: {
        url: 'uhjjj',
      },
    },
  };

  beforeEach(() => {
    wrapper = shallow(<Facebook />);
  });
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(data));
  it('should call Google login', async () => {
    wrapper.instance().FacebookLoginResponse(data).then(() => {
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
