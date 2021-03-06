import React from 'react';
import classNames from 'classnames';
import { format } from '@exzeo/core-ui';

const InfoBar = ({ initialValues, config = {} }) => {
  const { totalPremium } = initialValues.rating || {};
  return (
    <div
      className={classNames('infoBar', { className: config.className })}
      data-test="detail-header"
    >
      <h2 aria-labelledby="premium-label">
        Premium:&nbsp;
        <strong data-test="Total Premium">
          {totalPremium ? format.toCurrency(totalPremium) : `$ --`}
        </strong>
      </h2>
      <label id="premium-label">
        Quote Number:&nbsp;<strong>{initialValues.quoteNumber}</strong>
      </label>
    </div>
  );
};

export default InfoBar;
