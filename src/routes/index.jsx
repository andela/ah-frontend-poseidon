import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import HomeView from "../views/homeView";
import AuthView from "../views/authView";
// import LoginView from "../views/loginView";
import configureStore from "../redux/store";

const store = configureStore();

class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={HomeView} exact />
            <Route
              path="/signup"
              render={props => <AuthView {...props} isSignUp={true} />}
            />
            <Route
              path="/login"
              render={props => <AuthView {...props} isSignUp={false} />}
            />
            {/* <Route path="/login1" component={LoginView} /> */}
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Routes;
