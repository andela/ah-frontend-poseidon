import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../authentication';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const loginDetails = [
  {
    title: 'should handle USER_LOGGED_IN success',
    action: actions.signUpActionCreatorSuccess({ user: { password: '1234567890q', username: 'wasswajoel' } }),
    expectedAction: {
      type: 'SIGN_UP_SUCCESS',
      signUpData: {
        user: {
          password: '1234567890q',
          username: 'wasswajoel',
        },
      },
    },
  },
  {
    title: 'should handle USER_LOGGED_IN failure',
    action: actions.signUpActionCreatorFailure({ user: { password: 'hhgy8uo', username: 'wasswajoel' } }),
    expectedAction: {
      errors: {
        user: {
          password: 'hhgy8uo',
          username: 'wasswajoel',
        },
      },
      type: 'SIGN_UP_FAILURE',
    },
  },
];
describe('Login actions', () => {
  loginDetails.forEach(item => it(item.title, () => {
    expect(
      item.action,
    ).toEqual(item.expectedAction);
  }));
});
