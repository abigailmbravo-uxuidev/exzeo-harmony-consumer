import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function formatPhoneNumber(phoneNumberString) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return '';
}

const PolicyholderCard = ({ policyHolder, handleEdit }) => {
  return (
    <div className="card" data-test="agency">
      <div className="cardContent">
        <h4>
          {policyHolder.firstName}&nbsp;{policyHolder.lastName}
        </h4>
        <p>
          {`${policyHolder.emailAddress.toLowerCase()}`}
          &nbsp;|&nbsp;
          {`${formatPhoneNumber(policyHolder.primaryPhoneNumber)}`}
        </p>
      </div>
      <a onClick={handleEdit}>
        <FontAwesomeIcon icon="cat" />
      </a>
    </div>
  );
};

export default React.memo(PolicyholderCard);
