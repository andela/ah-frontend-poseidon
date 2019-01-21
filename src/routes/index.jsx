import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomeView from '../views/homeView';
import configureStore from '../redux/store';
import { viewProfile, editProfile } from '../redux/actions/profileActions';
import ProfileView from '../views/profile/profileView';
import ProfileEditView from '../views/profile/profileEditView';
import AuthView from '../views/authView';
import LikeDislikeComponent from "../components/LikeDislikeComponent";

const store = configureStore();
store.dispatch(viewProfile(), editProfile());

class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={HomeView} exact />
              <Route path="/signup" component={AuthView} />
              <Route path="/profile" component={ProfileView} />
              <Route path="/edit" component={ProfileEditView} />
              <Route path="/likedislike" component={LikeDislikeComponent} />
            </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Routes;
