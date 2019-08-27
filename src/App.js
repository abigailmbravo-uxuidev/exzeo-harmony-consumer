import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import QuoteWorkflow from './components/QuoteWorkflow';
import Test from './components/Test';
import { AddressSearch, QuoteSearch } from './components/Search';

const App = () => {
  return (
    <Router>
      <Header />

      <div role="region">
        <Route exact path="/" render={() => <Redirect to="/searchAddress" />} />

        {/* This component will always render, no matter the route, and will have access to the Route props (Navigation needs to know where we are :p) */}
        <Route children={routeProps => <Navigation {...routeProps} />} />

        <Route
          exact
          path="/retrieveQuote"
          render={routeProps => <QuoteSearch />}
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
          render={routeProps => <QuoteWorkflow {...routeProps} />}
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
