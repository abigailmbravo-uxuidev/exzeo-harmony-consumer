import React from 'react';
import { date } from '@exzeo/core-ui';
import classNames from 'classnames';
import { VALID_QUOTE_STATES } from '../../../constants/quote';

const QuoteCard = ({ quote, handleClick }) => {
  const {
    createdAt,
    quoteNumber,
    quoteState,
    policyHolders,
    rating,
    property: { physicalAddress }
  } = quote;
  const isEnabled = VALID_QUOTE_STATES.includes(quoteState);

  return (
    <div
      data-test={`quote-${quoteNumber}`}
      className={classNames('card', 'quoteCard', { disabled: !isEnabled })}
      onClick={() => isEnabled && handleClick(quoteNumber)}
    >
      <div className="card-header">
        {rating ? (
          <h3>{`$${rating.totalPremium.toLocaleString()}/YR | ${quoteNumber}`}</h3>
        ) : (
          <h3>{`${quoteNumber}`}</h3>
        )}
      </div>

      <div className="cardContent">
        <dl>
          <dt>Property Address</dt>
          <dd>{physicalAddress.address1}</dd>
          {physicalAddress.address2 && <p>{physicalAddress.address2}</p>}
          <dd>{`${physicalAddress.city}, ${physicalAddress.state}  ${physicalAddress.zip}`}</dd>
        </dl>

        <dl>
          <dt>Policyholder Name</dt>
          <dd>{`${policyHolders[0].firstName} ${policyHolders[0].lastName}`}</dd>
        </dl>

        <dl>
          <dt>Date Started</dt>
          <dd>{date.formatDate(createdAt)}</dd>
        </dl>
      </div>

      <div className="card-footer">
        <label>
          {isEnabled ? 'Retrieve this Quote' : 'Unretrievable Quote'}
        </label>
      </div>
    </div>
  );
};

export default QuoteCard;
