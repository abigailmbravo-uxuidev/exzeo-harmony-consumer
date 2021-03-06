import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import { QuoteContextProvider } from 'context/QuoteContext';

// https://testing-library.com/docs/example-react-router#reducing-boilerplate
export function customRender(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    quoteContext
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>
      <QuoteContextProvider initialState={quoteContext}>
        {children}
      </QuoteContextProvider>
    </Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
export { mockServiceRunner } from './mockServiceRunner';
