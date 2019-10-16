import React, { useState } from 'react';
import SummaryGroup from './SummaryGroup';
import { noop } from '@exzeo/core-ui/src';

const QuoteDetails = ({ renderChildren }) => {
  const [confirmQuote, setConfirmQuote] = useState(false);

  return (
    <React.Fragment>
      <SummaryGroup
        header="Quote Details"
        detailClass="quote-details"
        switchName="confirmQuote"
        switchValue={confirmQuote}
        switchOnChange={value => setConfirmQuote(value)}
        handleEditClick={noop}
      >
        {renderChildren && renderChildren()}
      </SummaryGroup>
    </React.Fragment>
  );
};

export default QuoteDetails;
