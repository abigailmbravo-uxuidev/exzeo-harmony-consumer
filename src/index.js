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
// import * as serviceWorker from './serviceWorker';

http.defaults.headers.common['authorization'] = 'Bearer consumer';

// TODO this is temporary and for development purposes
const Landing = () => {
  return (
    <div className="landingPage">
      <ul>
        <li>
          <Link to="/ttic/fl/flood">FL Flood Quote</Link>
        </li>

        <li>
          <Link to="/hcpc/sc/flood">SC Flood Quote</Link>
        </li>

        <li>
          <Link to="/hcpc/nj/flood">NJ Flood Quote</Link>
        </li>
      </ul>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path={CSP_CONTEXT_PARAMS} component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
