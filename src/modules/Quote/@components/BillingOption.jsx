import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BillingOption = ({ billToType, option, handleClick, isSelected }) => {
  return (
    <React.Fragment>
      <div
        className="billingCheckBox"
        data-test={`billing-option_${billToType}`}
        onClick={() => handleClick(option.answer)}
      >
        <span className="emptyCheckBox">
          {isSelected && <FontAwesomeIcon icon="check" />}
        </span>
        <div className="card billToId">
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
