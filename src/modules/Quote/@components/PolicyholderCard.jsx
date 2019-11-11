import React from 'react';

function formatPhoneNumber(phoneNumberString) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return '';
}

const PolicyholderCard = ({ policyHolder, icons }) => {
  return (
    <div className="card" data-test="agency">
      <div className="cardContent">
        <h4>
          {`Policyholder ${policyHolder.order + 1}: ${policyHolder.firstName} ${
            policyHolder.lastName
          }`}
        </h4>
        <p>
          {`${policyHolder.emailAddress.toLowerCase()}`}
          &nbsp;|&nbsp;
          {`${formatPhoneNumber(policyHolder.primaryPhoneNumber)}`}
        </p>
      </div>
      <footer className="cardFooter">{icons}</footer>
    </div>
  );
};

export default React.memo(PolicyholderCard);
