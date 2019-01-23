import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { viewProfile, editProfile } from '../redux/actions/profileActions';
import ProfileView from '../views/profile/profileView';
import ProfileEditView from '../views/profile/profileEditView';
import AuthView from '../views/authView';
import configureStore from '../redux/store';
import HomeView from '../views/homeView';
import { getDataThunk } from '../redux/thunks';
import { getAllArticles } from '../redux/actions/ArticleActionCreators';


export const store = configureStore();

store.dispatch(getDataThunk('articles', getAllArticles));

class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={HomeView} exact />
              <Route path="/articles/:articleId" component={HomeView}/>
              <Route path="/signup" component={AuthView} />
              <Route path="/profile" component={ProfileView} />
              <Route path="/edit" component={ProfileEditView} />
            </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Routes;
