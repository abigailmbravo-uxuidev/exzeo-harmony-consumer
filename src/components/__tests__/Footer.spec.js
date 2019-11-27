import React from 'react';
import { render } from 'test-utils';
import Footer from 'components/Footer';

describe('Test Footer component', () => {
  const props = {
    cspMatch: '/westeros/iron'
  };

  test('should contain a link to New Quote', () => {
    const { getByText } = render(<Footer {...props} />);
    expect(getByText('New Quote')).toHaveAttribute(
      'href',
      '/westeros/iron/searchAddress'
    );
    expect(getByText('Retrieve Quote')).toHaveAttribute(
      'href',
      '/westeros/iron/retrieveQuote'
    );
  });
});
