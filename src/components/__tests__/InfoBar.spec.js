import React from 'react';
import { render } from 'test-utils';
import InfoBar from 'components/InfoBar';

describe('Test InfoBar component', () => {
  const defaultProps = {
    initialValues: {
      quoteNumber: '1234'
    }
  };

  test('should show placeholder when no premium present', () => {
    const { getByLabelText } = render(<InfoBar {...defaultProps} />);

    expect(getByLabelText('Quote Number: 1234')).toHaveTextContent(
      'Premium: $ --'
    );
  });

  test('should show premium when present', () => {
    const props = {
      ...defaultProps,
      initialValues: {
        ...defaultProps.initialValues,
        rating: { totalPremium: 100 }
      }
    };

    const { getByLabelText } = render(<InfoBar {...props} />);
    expect(getByLabelText('Quote Number: 1234')).toHaveTextContent(
      'Premium: $ 100'
    );
  });
});
