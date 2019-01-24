/** module to handle action creators */
import ACTION_TYPE from '../types';


export const signUpActionCreatorSuccess = signUpData => ({
  /** function to generate a sign-up action */
  type: ACTION_TYPE.SIGN_UP_SUCCESS,
  signUpData,
});

export const signUpActionCreatorFailure = signUpErrors => ({
  /** function to generate a sign-up action */
  type: ACTION_TYPE.SIGN_UP_FAILURE,
  signUpErrors,
});
