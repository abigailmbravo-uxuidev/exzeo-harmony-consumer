import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuoteCard = () => {
  return (
    <div className="card">
      <div className="cardContent">Some Quote Stuff</div>
      <footer>
        <FontAwesomeIcon icon="chevron-right" />
      </footer>
    </div>
  );
};

export default QuoteCard;
