import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { AppFooter } from '@exzeo/core-ui/src/@Harmony';

import { ROUTES } from 'constants/navigation';
import { QuoteSearch } from 'modules/QuoteSearch';
import { AddressSearch } from 'modules/AddressSearch';
import { QuoteContextProvider, QuoteWorkflow } from 'modules/Quote';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import RouteErrorBoundary from 'components/RouteErrorBoundary';
import ThankYou from 'components/ThankYou';

const App = () => {
  return (
    <Router>
      <Header />
      <div role="region">
        <RouteErrorBoundary>
          <QuoteContextProvider>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/searchAddress" />}
              />
              {/* Nav 'path' array must include all routes/patterns that we want Nav rendering (Navigation needs to know where we are :p) */}
              <Route
                path={[
                  '/searchAddress',
                  '/retrieveQuote',
                  '/quote/:quoteNumber/:step',
                  '/thankYou'
                ]}
                render={routeProps => <Navigation {...routeProps} />}
              />
            </Switch>

            <main role="main">
              <div className="view-grid">
                <Route
                  exact
                  path={ROUTES.retrieveQuote.path}
                  render={routeProps => <QuoteSearch />}
                />

                <Route
                  exact
                  path={ROUTES.searchAddress.path}
                  render={routeProps => <AddressSearch {...routeProps} />}
                />

                {/* Gandalf owns this */}
                <Route
                  path={ROUTES.workflow.path}
                  render={routeProps => <QuoteWorkflow {...routeProps} />}
                />

                <Route
                  exact
                  path="/thankYou"
                  render={routeProps => <ThankYou {...routeProps} />}
                />

                <Footer />
                <AppFooter />
              </div>
            </main>
          </QuoteContextProvider>
        </RouteErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
