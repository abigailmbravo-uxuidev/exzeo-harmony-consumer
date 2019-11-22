import 'react-app-polyfill/ie11';
// Used by react-router-dom - they don't support ie11
import 'core-js/features/string/repeat';
// We are using this one
import 'core-js/features/object/values';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { http } from '@exzeo/core-ui';

import App from './App';

import './fontAwesomeInit';
import './sass/main.scss';
// import * as serviceWorker from './serviceWorker';

http.defaults.headers.common['authorization'] = 'Bearer consumer';

const Landing = () => {
  return (
    <div className="landingPage">
      <ul>
        <li>
          <Link to="/fl/flood">Get Flood Quote</Link>
        </li>
      </ul>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/:state/:product" component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
