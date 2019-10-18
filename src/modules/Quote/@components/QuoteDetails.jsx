import React, { useState } from 'react';
import SummaryGroup from './SummaryGroup';
import { noop } from '@exzeo/core-ui/src';

const QuoteDetails = ({ renderChildren }) => {
  return (
    <React.Fragment>
      <SummaryGroup
        header="Quote Details"
        detailClass="quote-details"
        name="confirmQuote"
        handleEditClick={noop}
      >
        {renderChildren && renderChildren()}
      </SummaryGroup>
    </React.Fragment>
  );
};

export default QuoteDetails;
