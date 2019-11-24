import React from 'react';
import { renderWithRouter } from 'test-utils';
import Footer from 'components/Footer';

describe('Test Footer component', () => {
  const props = {
    cspMatch: '/westeros/iron'
  };

  const { getByText } = renderWithRouter(<Footer {...props} />);

  test('should contain a link to New Quote', () => {
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
