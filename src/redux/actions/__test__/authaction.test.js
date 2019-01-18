import * as actions from "../authentication";
import ACTION_TYPE from "../../actions/types";
import * as types from "../types";
import authActions, {
  loginFailure,
  signUpActionCreator
} from "../authentication";
import axios from "axios";
import moxios from "moxios";
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
});

describe("login thunk actions", () => {
  let mockAdapter = new MockAdapter(axios);
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
  const store = mockStore({ data: {} });
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should LOGIN_SUCCESFULLY", () => {
    moxios.stubRequest(API.LOGIN_URL, {
      status: 200,
      responseText: {
        user: {
          token: "123456trgeqgaf"
        }
      }
    });
    const expectedActions = [
      {
        type: ACTION_TYPE.LOGIN_URL,
        signUpData: {
          user: {
            token: "123456trgeqgaf"
          }
        }
      }
    ];
    store
      .dispatch(
        authActions(
          {
            username: "naomegg",
            password: "password",
            email: "naomekizzan@gmail.com"
          },
          API.LOGIN_URL
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should handle LOGIN_FAILURE", () => {
    moxios.stubRequest(API.LOGIN_URL, {
      status: 400,
      responseText: {
        error: {
          token: "123456trgeqgaf"
        }
      }
    });
    const expectedActions = [
      {
        type: ACTION_TYPE.LOGIN_URL,
        payload: {
          user: {
            token: "123456trgeqgaf"
          }
        }
      }
    ];
    store
      .dispatch(
        authActions(
          {
            username: "naomegg",
            password: "password",
            email: "naomekizzan@gmail.com"
          },
          API.LOGIN_URL
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
