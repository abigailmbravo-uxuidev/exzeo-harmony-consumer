import React from 'react';
import { Button } from '@exzeo/core-ui';
import { useQuote } from '../QuoteContext';

const SummaryFooter = ({
  formValues: {
    confirmProperty,
    confirmAgency,
    confirmQuote,
    confirmPolicyHolder,
    confirmAdditionalInterest
  } = {},
  submitting
}) => {
  const { sendApplication, quote } = useQuote();

  const handleSendApplication = async () => {
    await sendApplication(quote.quoteNumber, {});
  };

  const confirmFields = {
    confirmProperty,
    confirmAgency,
    confirmQuote,
    confirmPolicyHolder,
    confirmAdditionalInterest
  };
  const isButtonDisabled =
    Object.values(confirmFields).some(k => !k) || submitting;

  return (
    <Button
      type="button"
      data-test="submit"
      className={Button.constants.classNames.primary}
      onKeyPress={e => e.charCode === 13 && handleSendApplication()}
      onClick={handleSendApplication}
      disabled={isButtonDisabled}
    >
      Continue
    </Button>
  );
};

export default SummaryFooter;
