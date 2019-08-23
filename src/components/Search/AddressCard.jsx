import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddressCard = ({ property }) => {
  return (
    <div className="card">
      <div className="cardContent">
        <h4>{property.physicalAddress.address1}</h4>
        <p>{`${property.physicalAddress.city}, ${property.physicalAddress.state}  ${property.physicalAddress.zip}`}</p>
      </div>
      <footer>
        <FontAwesomeIcon icon="chevron-right" />
      </footer>
    </div>
  );
};

export default AddressCard;
