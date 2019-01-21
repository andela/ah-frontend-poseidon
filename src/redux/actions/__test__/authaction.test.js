import * as actions from "../authentication";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import { API } from "../../../constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Login actions", () => {
  it("should handle USER_LOGGED_IN", () => {
    const signUpData = {
      user: {
        password: "1234567890q",
        username: "wasswajoel"
      }
    };
    const expectedAction = {
      type: "SIGN_UP_SUCCESS",
      signUpData
    };
    actions.type = "SIGN_UP_SUCCESS";
    expect(
      actions.signUpActionCreatorSuccess({
        user: { password: "1234567890q", username: "wasswajoel" }
      })
    ).toEqual(expectedAction);
  });
  it("should handle USER_LOGGED_IN", () => {
    const signUpErrors = {
      user: {
        password: "hhgy8uo",
        username: "wasswajoel"
      }
    };
    const expectedAction = {
      type: "SIGN_UP_FAILURE",
      signUpErrors
    };
    actions.type = "SIGN_UP_FAILURE";
    expect(
      actions.signUpActionCreatorFailure({
        user: { password: "hhgy8uo", username: "wasswajoel" }
      })
    ).toEqual(expectedAction);
  });
});
