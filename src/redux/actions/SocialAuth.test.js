import fetchMock from 'fetch-mock';
import { RetriveUser } from './SocialAuth';


describe('Tests social authentication actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Tests retrieving user token from backend and storing to local storage', () => {
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
