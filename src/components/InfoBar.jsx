import React from 'react';
import { format } from '@exzeo/core-ui';

const InfoBar = ({ initialValues }) => {
  return (
    <div className="infoBar">
      <h2>
        Premium
        <strong>{format.toCurrency(initialValues.rating.netPremium)}</strong>
      </h2>
      <label>
        Quote Number <strong>{`# ${initialValues.quoteNumber}`}</strong>
      </label>
    </div>
  );
};

export default InfoBar;
