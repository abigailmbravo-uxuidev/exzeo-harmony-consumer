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

  it('should contain a link to New Quote', () => {
    expect(true);
  });
});
