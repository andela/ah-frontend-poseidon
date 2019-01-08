import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'
import HomeView from '../views/homeView';
import LoginView from '../views/loginView';
import store from '../redux/store';

class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={HomeView} exact />
              <Route path="/login" component={LoginView} />
            </Switch>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default Routes;
