import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import HomeView from "../views/homeView";
import AuthView from "../views/authView";
import ConfigureStore from "../redux/store";

const store = ConfigureStore();

class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={HomeView} exact />
            <Route path="/signup" component={AuthView} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Routes;
