import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { AppFooter } from '@exzeo/harmony-core';

import Header from 'components/Header';
import Navigation from 'components/Navigation';
import RouteErrorBoundary from 'components/RouteErrorBoundary';
import QuoteSearch from 'modules/QuoteSearch';
import AddressSearch from './modules/AddressSearch';
import { QuoteContextProvider, QuoteWorkflow } from './modules/Quote';

import Test from 'components/Test';

const App = () => {
  return (
    <Router>
      <Header />

      <div role="region">
        <Route exact path="/" render={() => <Redirect to="/searchAddress" />} />
        {/* This component will always render, no matter the route, and will have access to the Route props (Navigation needs to know where we are :p) */}
        <Route children={routeProps => <Navigation {...routeProps} />} />

        <main role="main">
          <div className="view-grid">
            <RouteErrorBoundary>
              <QuoteContextProvider>
                <Route
                  exact
                  path="/retrieveQuote"
                  render={routeProps => <QuoteSearch />}
                />

                <Route
                  exact
                  path="/searchAddress"
                  render={routeProps => <AddressSearch {...routeProps} />}
                />

                {/* Gandalf owns this */}
                <Route
                  path="/quote"
                  render={routeProps => <QuoteWorkflow {...routeProps} />}
                />

                <Route
                  exact
                  path="/test"
                  render={routeProps => <Test {...routeProps} />}
                />
              </QuoteContextProvider>
            </RouteErrorBoundary>
            <AppFooter />
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
