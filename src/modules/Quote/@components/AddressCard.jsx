import React from 'react';

const PolicyholderCard = ({ address, icons }) => {
  return (
    <div className="card" data-test="agency">
      <div className="cardContent">
        <h4>{address.address1}</h4>
        <p>{`${address.city}, ${address.state}  ${address.zip}`}</p>
      </div>
      <footer className="cardFooter">{icons}</footer>
    </div>
  );
};

export default React.memo(PolicyholderCard);
