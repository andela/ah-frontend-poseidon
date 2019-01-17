/** module to handle action creators */
import ACTION_TYPE from "../types";
import axios from "axios";

export const signUpActionCreatorSuccess = signUpData => ({
  /** function to generate a sign-up action */
  type: ACTION_TYPE.SIGN_UP_SUCCESS,
  signUpData
});

export const signUpActionCreatorFailure = signUpErrors => ({
  /** function to generate a sign-up action */
  type: ACTION_TYPE.SIGN_UP_FAILURE,
  signUpErrors
});

export const authAction = (requestData, URL) => dispatch => {
  const { username, email, password } = requestData;
  const userData = {
    user: {
      username,
      email,
      password
    }
  };

  return axios.post(URL, { ...userData }).then(response => {
    const { data } = response;
    localStorage.setItem("user", JSON.stringify(data));
    return dispatch(signUpActionCreatorSuccess(response.data));
  });
};

export default authAction;
