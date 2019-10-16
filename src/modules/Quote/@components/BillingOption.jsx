import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBillToConfiguration } from '@exzeo/harmony-core';

import PayPlanOptions from './PayPlanOptions';

const BillingOption = ({ option, config }) => {
  const billingConfig = getBillToConfiguration(config, option.answer);

  return (
    <React.Fragment>
      <div className="card billToId" data-test="billToCard">
        <div className="cardContent">
          <h4>{option.label.split(' ').filter((s, i) => i !== 0)}</h4>
          <FontAwesomeIcon icon="chevron-down" />
        </div>
      </div>

      <PayPlanOptions
        availablePlans={billingConfig.availablePlans}
        paymentPlans={config.paymentPlans}
      />
    </React.Fragment>
  );
};

export default BillingOption;
