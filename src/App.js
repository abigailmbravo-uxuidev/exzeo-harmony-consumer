import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Page from './components/Page';
import Test from './components/Test';
import { AddressSearch } from './components/Search';

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
          path="/retrieveQuote"
          render={routeProps => <div>Search for a Quote</div>}
        />

        <Route
          exact
          path="/searchAddress"
          render={routeProps => <AddressSearch />}
        />

        {/* Gandalf owns this */}
        <Route
          exact
          path="/quote"
          render={routeProps => <Page {...routeProps} />}
        />

        <Route
          exact
          path="/test"
          render={routeProps => <Test {...routeProps} />}
        />
      </div>

      <Footer />
    </Router>
  );
};

export default App;
