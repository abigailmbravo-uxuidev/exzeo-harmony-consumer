import 'react-app-polyfill/ie11';
import 'core-js/features/string/repeat';

import React from 'react';
import ReactDOM from 'react-dom';
import { http } from '@exzeo/core-ui';

import App from './App';

import './fontAwesomeInit';
import './sass/main.scss';
// import * as serviceWorker from './serviceWorker';

http.defaults.headers.common['authorization'] = 'Bearer consumer';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
