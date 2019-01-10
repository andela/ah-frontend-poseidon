import ACTION_TYPE from '../../../actions/types';
import authReducer from '..';

describe('Authentication reducers', () => {
  it('should allow sign up action start', () => {
    const initialState = {
      signUpFailure: null,
      signUpSuccess: null,
    };
    const action = {
      type: ACTION_TYPE.SIGN_UP_SUCCESS,
      signUpData: {
        user: {
          Message: 'Successfully signed up',
          token: '312regwh4tr4hetrj6y5tu6yutu7y8u',
        },
      },
    };

    const expected = {
      signUpFailure: null,
      signUpSuccess: {
        Message: 'Successfully signed up',
        token: '312regwh4tr4hetrj6y5tu6yutu7y8u',
      },
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual(expected);
  });

  it('user sign up not successful', () => {
    const initialState = {
      signUpFailure: null,
      signUpSuccess: null,
    };
    const action = {
      type: ACTION_TYPE.SIGN_UP_FAILURE,
      errors: {
        username: 'user already exists',
      },
    };

    const expected = {
      signUpFailure: {
        username: 'user already exists',
      },
      signUpSuccess: null,
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual(expected);
  });
});
