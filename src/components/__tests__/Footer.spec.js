import React from 'react';
import { render } from 'test-utils';
import Footer from 'components/Footer';

describe('Test Footer component', () => {
  const props = {
    cspMatch: '/ironBank/bravos/gold'
  };

  test('should contain a link to New Quote', () => {
    const { getByText } = render(<Footer {...props} />);
    expect(getByText('New Quote')).toHaveAttribute(
      'href',
      '/ironBank/bravos/gold/searchAddress'
    );
    expect(getByText('Retrieve Quote')).toHaveAttribute(
      'href',
      '/ironBank/bravos/gold/retrieveQuote'
    );
  });
});
