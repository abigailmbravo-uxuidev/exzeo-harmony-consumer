import React from 'react';
import { render, waitForElement, wait, mockServiceRunner } from 'test-utils';
import { quote, underwritingQuestions } from 'test-utils/fixtures';
import QuoteWorkflow from 'modules/Quote';

describe('Test underwriting page', () => {
  test("Only show questions with 'visible' property", async () => {
    mockServiceRunner(underwritingQuestions);

    const { queryByText, getByText, getByLabel, getByTestId } = render(
      <QuoteWorkflow
        cspMatch="/ttic/fl/flood"
        match={{ params: { step: 'underwriting', quoteNumber: '1234-56789' } }}
        history={{}}
      />,
      {
        route: '/ttic/fl/AF3/quote/1234-56789/underwriting',
        quoteContext: { quote, loading: false, error: null }
      }
    );

    await waitForElement(() => queryByText(/How many flood claims/i));

    const hiddenQuestion = queryByText(/Was fuzzy wuzzy/i);
    expect(hiddenQuestion).toBeNull();
  });
});
