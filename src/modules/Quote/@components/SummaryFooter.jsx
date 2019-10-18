import React from 'react';
import { Button, SectionLoader } from '@exzeo/core-ui';
import { useQuote } from '../QuoteContext';
import { WORKFLOW_ROUTING, ROUTES } from 'constants/navigation';

const SummaryFooter = ({
  formValues: {
    confirmProperty,
    confirmAgency,
    confirmQuote,
    confirmPolicyHolder,
    confirmAdditionalInterest
  } = {},
  submitting,
  history
}) => {
  const { sendApplication, quote } = useQuote();

  const handleSendApplication = async () => {
    await sendApplication(quote.quoteNumber, {});
    history.push(WORKFLOW_ROUTING[ROUTES.summary.path]);
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

  if (submitting) {
    return <SectionLoader />;
  }

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
