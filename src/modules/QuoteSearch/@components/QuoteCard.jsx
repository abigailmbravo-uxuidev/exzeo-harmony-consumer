import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuoteCard = ({ quote }) => {
  return (
    <div className="card">
      <div className="cardContent">
        <h4>{quote.quoteNumber}</h4>
      </div>
      <footer>
        <FontAwesomeIcon icon="chevron-right" />
      </footer>
    </div>
  );
};

export default QuoteCard;
