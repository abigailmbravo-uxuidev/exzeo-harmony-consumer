import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Page from './components/Page';

const App = () => {
  return (
    <Router>
      <Header />

      <div role="region">
        <button className="navOpener">
          <FontAwesomeIcon icon="chevron-right" size="sm" />
        </button>

        {/* This component will always render, no matter the route, and will have access to the Route props (Navigation needs to know where we are :p) */}
        <Route children={routeProps => <Navigation {...routeProps} />} />
        <Route
          exact
          path="/searchAddress"
          render={routeProps => <div>Search for an address</div>}
        />
        <Route
          exact
          path="/retrieveQuote"
          render={routeProps => <div>Search for a Quote</div>}
        />
        {/* Gandalf owns this */}
        <Route
          exact
          path="/quote"
          render={routeProps => <Page {...routeProps} />}
        />
      </div>

      <Footer />
    </Router>
  );
};

export default App;
