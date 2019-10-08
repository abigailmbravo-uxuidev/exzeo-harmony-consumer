import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PolicyholderCard = ({ initialValues }) => {
  return (
    <div className="card">
      <div className="cardContent">
        <h4>
          {initialValues.policyHolders.firstName}&nbsp;
          {initialValues.policyHolders.lastName}
        </h4>
        <p>Clearwater, FL 33602</p>
      </div>
      <footer>
        <FontAwesomeIcon icon="cat" />
      </footer>
    </div>
  );
};

export default PolicyholderCard;
