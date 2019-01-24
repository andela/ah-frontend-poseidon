/** module to handle action creators */
import ACTION_TYPE from '../types';


export const signUpActionCreatorSuccess = signUpData => ({
  /** function to generate a sign-up action */
  type: ACTION_TYPE.SIGN_UP_SUCCESS,
  signUpData,
});

export const signUpActionCreatorFailure = errors => ({
  /** function to generate a sign-up action */
  type: ACTION_TYPE.SIGN_UP_FAILURE,
  errors,
});
