import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { QuoteContextProvider } from 'modules/Quote';

// https://testing-library.com/docs/example-react-router#reducing-boilerplate
export function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

export function renderWithRouterAndContext(ui, opts) {
  const uiWithContext = <QuoteContextProvider>{ui}</QuoteContextProvider>;
  return renderWithRouter(uiWithContext, opts);
}
