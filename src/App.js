import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Loader } from '@exzeo/core-ui';
import { AppFooter } from '@exzeo/core-ui/src/@Harmony';

import {
  CSP_CONTEXT_PARAMS,
  NAV_BAR_MATCH_ROUTES,
  ROUTES
} from 'constants/navigation';
import { FRIENDLY_PRODUCT_MAP } from 'constants/companyStateProduct';

import { RetrieveQuote } from 'modules/QuoteSearch';
import { AddressSearch } from 'modules/AddressSearch';
import { QuoteContextProvider } from 'context/QuoteContext';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import RouteErrorBoundary from 'components/RouteErrorBoundary';
import ThankYou from 'components/ThankYou';
// Lazy load this component
const QuoteWorkflow = React.lazy(() => import('modules/Quote'));

const App = ({ location, match, history }) => {
  // set the base url containing CSP info. Remove trailing slash ('/') if there
  // is one because all subsequent urls are built assuming no trailing slash
  const cspMatch = match.url.replace(/\/+$/, '');
  const csp = {
    companyCode: match.params.companyCode.toUpperCase(),
    state: match.params.state.toUpperCase(),
    product: FRIENDLY_PRODUCT_MAP[match.params.product.toUpperCase()]
  };
  const viewGridRef = React.createRef();

  React.useEffect(() => {
    viewGridRef.current.scrollIntoView(true);
  }, [viewGridRef, location.pathname]);

  return (
    <React.Fragment>
      <Header
        cspMatch={cspMatch}
        location={location}
        history={history}
        match={match}
      />
      <div role="region">
        <RouteErrorBoundary>
          <QuoteContextProvider>
            <Switch>
              <Route
                exact
                path={CSP_CONTEXT_PARAMS}
                render={() => <Redirect to={`${cspMatch}/searchAddress`} />}
              />

              {/* TODO: look for better pattern - these varying paths mean that
                  different 'match params' may be available/unavailable to the
                  nav component depending on location */}
              {/* Nav 'path' array must include all routes/patterns that we want
                  Nav rendering ( Navigation needs to know where we are :p ) */}
              <Route
                path={NAV_BAR_MATCH_ROUTES}
                render={routeProps => (
                  <Navigation {...routeProps} cspMatch={cspMatch} />
                )}
              />
            </Switch>

            <main role="main">
              <Suspense fallback={<Loader />}>
                <div className="view-grid" ref={viewGridRef}>
                  <Route
                    exact
                    path={ROUTES.retrieveQuote.path}
                    render={routeProps => (
                      <RetrieveQuote
                        {...routeProps}
                        cspMatch={cspMatch}
                        csp={csp}
                      />
                    )}
                  />

                  <Route
                    exact
                    path={ROUTES.searchAddress.path}
                    render={routeProps => (
                      <AddressSearch
                        {...routeProps}
                        cspMatch={cspMatch}
                        csp={csp}
                      />
                    )}
                  />

                  <Route
                    path={ROUTES.workflow.path}
                    render={routeProps => (
                      <QuoteWorkflow
                        {...routeProps}
                        cspMatch={cspMatch}
                        csp={csp}
                      />
                    )}
                  />

                  <Route
                    exact
                    path={ROUTES.thankYou.path}
                    render={routeProps => <ThankYou {...routeProps} />}
                  />

                  <Footer cspMatch={cspMatch} csp={csp} />
                  <AppFooter />
                </div>
              </Suspense>
            </main>
          </QuoteContextProvider>
        </RouteErrorBoundary>
      </div>
    </React.Fragment>
  );
};

export default App;
