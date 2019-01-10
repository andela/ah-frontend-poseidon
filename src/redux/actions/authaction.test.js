import * as actions from "/Users/naome/Desktop/ah-frontend-poseidon/src/redux/actions/loginActions.js";
// import { moduleName } from "../actions/authentication/index";
import * as types from "/Users/naome/Desktop/ah-frontend-poseidon/src/redux/actions/types.js";
import * as loginactions from "/Users/naome/Desktop/ah-frontend-poseidon/src/redux/actions/authentication/index.js";

describe("Login actions", () => {
  it("should handle USER_LOGGED_IN", () => {
    const user = {
      user: {
        password: "1234567890q",
        username: "wasswajoel"
      }
    };
    const expectedAction = {
      type: types.USER_LOGGED_IN,
      user
    };
    expect(
      actions.loggedIn({
        user: { user: { password: "1234567890q", username: "wasswajoel" } }
      })
    ).toEqual(expectedAction);
  });
});

it("should handle LOGIN_FAILURE", () => {
  const errors = {
    error: "A user with this email and password doesnot exist"
  };
  const expectedAction = {
    type: types.USER_LOGIN_FAILURE,
    errors
  };
  expectedAction.type = types.USER_LOGIN_FAILURE;
  expect(loginactions.loginFailure(errors)).toEqual(expectedAction);
});
