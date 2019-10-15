import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayPlanTable, getBillToConfiguration } from '@exzeo/harmony-core';

const BillingOption = ({ option, config }) => {
  const billingConfig = getBillToConfiguration(config, option.answer);

  return (
    <React.Fragment>
      <div className="card" data-test="billToCard">
        <div className="cardContent">
          <h4>{option.label.split(' ').filter((s, i) => i !== 0)}</h4>
          <FontAwesomeIcon icon="angle-right" />
        </div>
      </div>

      <PayPlanTable
        availablePlans={billingConfig.availablePlans}
        paymentPlans={config.paymentPlans}
      />
      {/*<pre>{JSON.stringify(billingConfig, 0, 2)}</pre>*/}
    </React.Fragment>
  );
};

export default BillingOption;
