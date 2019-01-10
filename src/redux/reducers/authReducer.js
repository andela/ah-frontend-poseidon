import { USER_LOGGED_IN, USER_LOGIN_FAILURE } from "../../redux/actions/types";

const initialState = {
  socialLoginReducer: { isLoggedIn: false },
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        token: action.user.token
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
};
