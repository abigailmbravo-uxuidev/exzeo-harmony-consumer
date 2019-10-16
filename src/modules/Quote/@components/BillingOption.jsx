import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BillingOption = ({ option, handleClick, isSelected }) => {
  return (
    <React.Fragment>
      <div
        className="card billToId"
        data-test="billToCard"
        onClick={() => handleClick(option.answer)}
      >
        <div className="cardContent">
          <h4>{option.label.split(' ').filter((s, i) => i !== 0)}</h4>
          <FontAwesomeIcon
            icon={isSelected ? 'chevron-down' : 'chevron-right'}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BillingOption;
