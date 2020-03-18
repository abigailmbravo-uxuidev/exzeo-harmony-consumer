import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddressCard = ({ property, handleClick }) => {
  return (
    <div
      className="card"
      data-test={`result-${property.physicalAddress.address1}`}
      onClick={() => handleClick(property)}
    >
      <div className="cardContent">
        <h4 data-test="Property Address">
          {property.physicalAddress.address1}
        </h4>
        <p>{`${property.physicalAddress.city}, ${property.physicalAddress.state}  ${property.physicalAddress.zip}`}</p>
      </div>
      <footer>
        <FontAwesomeIcon icon="chevron-right" />
      </footer>
    </div>
  );
};

export default AddressCard;
