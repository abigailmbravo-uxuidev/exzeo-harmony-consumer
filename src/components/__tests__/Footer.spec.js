import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Footer from 'components/Footer';

describe('Test Footer component', () => {
  const { getByText } = render(
    <Router>
      <Footer />
    </Router>
  );

  test('should contain a link to New Quote', () => {
    expect(getByText('New Quote')).toHaveAttribute('href', '/searchAddress');
    expect(getByText('Retrieve Quote')).toHaveAttribute(
      'href',
      '/retrieveQuote'
    );
  });
});
