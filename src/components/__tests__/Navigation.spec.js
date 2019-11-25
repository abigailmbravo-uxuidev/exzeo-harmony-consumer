import React from 'react';
import { waitForElement } from '@testing-library/react';
import { renderWithRouterAndContext } from 'test-utils';
import Navigation from 'components/Navigation';

describe('Test Navigation Component', () => {
  const cspMatch = '/westeros/iron';
  const defaultProps = {
    cspMatch,
    match: {
      params: {}
    },
    location: {
      pathname: `${cspMatch}/searchAddress`
    }
  };

  test('Should correctly display Nav on /searchAddress', () => {
    const { getByText } = renderWithRouterAndContext(
      <Navigation {...defaultProps} />
    );

    expect(getByText('Retrieve').closest('li')).toHaveClass('hide');
    expect(getByText('Search').closest('li')).not.toHaveClass();
    expect(getByText('Quote').closest('li')).toHaveClass('disabled');
    expect(getByText('Application').closest('li')).toHaveClass('disabled');
  });
});
