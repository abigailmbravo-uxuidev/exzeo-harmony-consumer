import React from 'react';
import classNames from 'classnames';
import { format } from '@exzeo/core-ui';

const InfoBar = ({ initialValues, config }) => {
  const { totalPremium } = initialValues.rating || {};
  return (
    <div className={classNames('infoBar', { className: config.className })}>
      <h2 tabIndex="0">
        Premium:&nbsp;
        <strong>
          {totalPremium ? format.toCurrency(totalPremium) : `$ --`}
        </strong>
      </h2>
      <label tabIndex="0">
        Quote Number: <strong>{`#${initialValues.quoteNumber}`}</strong>
      </label>
    </div>
  );
};

export default InfoBar;
