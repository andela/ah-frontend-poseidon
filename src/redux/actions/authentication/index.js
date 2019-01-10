import ACTION_TYPE, { USER_LOGIN_FAILURE } from "../types";
import axios from "axios";
import { PROPERTY_USER } from "../../../constants";

export const signUpActionCreator = signUpData => ({
  type: ACTION_TYPE.SIGN_UP,
  payload: signUpData
});

export const loginFailure = errors => ({
  type: USER_LOGIN_FAILURE,
  errors
});

export const sosialAuthentication = sicalLogin => ({
  type: ACTION_TYPE.SOCIAL_AUTH,
  payload: sicalLogin
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

  return axios
    .post(URL, { ...userData })
    .then(response => {
      const { data } = response;
      // console.log(response.data);
      localStorage.setItem(PROPERTY_USER, JSON.stringify(data));
      dispatch(signUpActionCreator(response.data));
    })
    .catch(error => {
      dispatch(loginFailure(error.response.data.errors));
    });
};
