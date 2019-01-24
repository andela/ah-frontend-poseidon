import React from "react";
import configureStore from "redux-mock-store";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import AuthViewConnected, { AuthViewTest } from "../authView";

const mockSTore = configureStore([thunk]);
jest.mock("react-notify-toast");
const expectedStore = {
  authReducer: {
    signUpFailure: null,
    signUpSuccess: null
  }
};

const store = mockSTore(expectedStore);
const mockSignUp = {
  Message: "Successfully signed up",
  token: "312regwh4tr4hetrj6y5tu6yutu7y8u"
};

const mockLogin = {
  username: "naume",
  token: "312regwh4tr4hetrj6y5tu6yutu7y8u"
};
const mockError = {
  errors: {
    username: ["Username already exists "]
  }
};
const mockErrors = {
  errors: {
    username: ["Username already exists "],
    password: ["password should be at-least 8 characters"]
  }
};

const errorItems = [
  { title: "component will recieve props single error", error: mockError },
  { title: "component will recieve props multiple error", error: mockErrors }
];
const historyMock = { push: jest.fn() };
const props = {
  history:historyMock,
  postDataThunkNoHeader: jest.fn(),
  signUpActionCreatorSuccess: jest.fn(),
  signUpActionCreatorFailure: jest.fn()
};

describe("authView component", () => {
  it("it renders ", () => {
    const wrapper = mount(
      <Provider store={store}>
        <AuthViewConnected props={props} />
      </Provider>
    );
    const event = {
      preventDefault: jest.fn(),
      handleSignup: jest.fn(),
      target: {
        elements: {
          username: { value: "poseidon" },
          email: { value: "poseidon@mail.com" },
          password: { value: "poseidon234" }
        }
      }
    };
    const wrappedForm = wrapper.find("form");
    wrappedForm.simulate("submit", event);
    expect(wrapper.find("AuthView").state("loader")).toEqual({ loading: true });
  });

  it("renders authView without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AuthViewConnected props={props} />
        </MemoryRouter>
      </Provider>
    );
    const newProps = { signUpData: mockSignUp };
    AuthViewConnected.prototype.props = newProps;

    expect(wrapper).toHaveLength(1);
  });

  it("component will recieve props user", () => {
    const wrapUser = shallow(<AuthViewTest {...props} />);
    wrapUser.setProps(
      {
        signUpData: mockSignUp,
        signUpErrors: null
      },
      () => {
        expect(wrapUser.state()).toEqual(
          expect.objectContaining({ loader: { loading: false } })
        );
      }
    );
  });

  it(" user login changers props", () => {
    const wrapUser = shallow(<AuthViewTest {...props} />);
    wrapUser.setProps(
      {
        signUpData: mockLogin,
        signUpErrors: null
      },
      () => {
        expect(wrapUser.state()).toEqual(
          expect.objectContaining({ loader: { loading: false } })
        );
      }
    );
  });

  errorItems.forEach(item =>
    it(item.title, () => {
      const wrapError = shallow(<AuthViewTest {...props} />);
      wrapError.setProps(
        {
          signUpData: null,
          signUpErrors: item.error
        },
        () => {
          expect(wrapError.state()).toEqual(
            expect.objectContaining({ loader: { loading: false } })
          );
        }
      );
    })
  );
});

describe(" Chnages isSignUp to false on click", () => {
  const wrapper = mount(
    <Provider store={store}>
      <AuthViewConnected props={props} history={historyMock}/>
    </Provider>
  );
  const event = {
    preventDefault: jest.fn(),
    handleSignup: jest.fn(),
    target: {
      elements: {
        username: { value: "poseidon" },
        password: { value: "poseidon234" }
      }
    }
  };
  const wrapped = wrapper.find("#change-login");

  it("isSignup changes to false when handleChangeFormStatus is activated", () => {
    wrapped.simulate("click", event);
    expect(wrapper.find("AuthView").state("isSignUp")).toEqual(false);
  });

  it("isSignup changes to true when handleChangeFormStatus is activated", () => {
    wrapped.simulate("click", event);
    expect(wrapper.find("AuthView").state("isSignUp")).toEqual(true);
  });

  it("handleLogin should be called on login ", () => {
    wrapped.simulate("click", event);
    const wrappedForm = wrapper.find("form");
    wrappedForm.simulate("submit", event);
    expect(wrapper.find("AuthView").state("loader")).toEqual({
      loading: true
    });

  })   
  it("test change to reset password form",()=>{
    wrapper.find('#reset').simulate('click')
    expect(props.history.push).toHaveBeenCalled()   
  
  });
  
});
