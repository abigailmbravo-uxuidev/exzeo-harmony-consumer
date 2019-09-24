import React from 'react';
import classNames from 'classnames';
import { format } from '@exzeo/core-ui';

const InfoBar = ({ initialValues, config }) => {
  return (
    <div className={classNames('infoBar', { className: config.className })}>
      <h2>
        Premium:&nbsp;
        <strong>{format.toCurrency(initialValues.rating.totalPremium)}</strong>
      </h2>
      <label>
        Quote Number <strong>{`# ${initialValues.quoteNumber}`}</strong>
      </label>
    </div>
  );
};

export default InfoBar;
