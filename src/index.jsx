import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.scss';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserCircle,
  faThumbsDown,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

library.add(faUserCircle, faThumbsDown, faThumbsUp);
require('dotenv').config();

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
