import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BillingOption = ({ option, handleClick, isSelected }) => {
  return (
    <React.Fragment>
      <div className="billingCheckBox">
        <span className="emptyCheckBox">
          <FontAwesomeIcon icon={isSelected ? 'check' : ''} />
        </span>
        <div
          className="card billToId"
          data-test="billToCard"
          onClick={() => handleClick(option.answer)}
        >
          <div className="cardContent">
            <h4>{option.label}</h4>
          </div>
          <footer>
            <FontAwesomeIcon
              icon={isSelected ? 'chevron-down' : 'chevron-right'}
            />
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BillingOption;
