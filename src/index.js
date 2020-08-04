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
import { CSP_CONTEXT_PARAMS } from 'constants/navigation';
import Landing from './components/Landing';
import { isIE } from './utilities/userAgent';
import UnsupportedBrowser from './components/UnsupportedBrowser';
// import * as serviceWorker from './serviceWorker';

http.defaults.headers.common['authorization'] = 'Bearer consumer';

ReactDOM.render(
  <Router>
    <Switch>
      {isIE() ? (
        <Route path="/" component={UnsupportedBrowser} />
      ) : (
        <Route exact path="/" component={Landing} />
      )}
      <Route path={CSP_CONTEXT_PARAMS} component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
