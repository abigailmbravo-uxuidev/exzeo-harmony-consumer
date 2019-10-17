import React from 'react';
import { Button } from '@exzeo/core-ui';
import { useQuote } from '../QuoteContext';

const SummaryFooter = () => {
  const { sendApplication, quote } = useQuote();

  const handleSendApplication = async () => {
    await sendApplication(quote.quoteNumber, {});
  };

  return (
    <Button
      type="button"
      data-test="submit"
      className={Button.constants.classNames.primary}
      onKeyPress={e => e.charCode === 13 && handleSendApplication()}
      onClick={handleSendApplication}
      disabled={false}
    >
      Continue
    </Button>
  );
};

export default SummaryFooter;
