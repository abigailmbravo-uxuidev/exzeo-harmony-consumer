import React from 'react';
import { SectionLoader } from '@exzeo/core-ui';
import { useFetchBillingConfiguration } from '@exzeo/harmony-core';

import BillingOption from './BillingOption';

const Billing = ({ initialValues, formInstance }) => {
  const { billingConfig, loaded } = useFetchBillingConfiguration(initialValues);

  function setBillToInfo(billToId, billToType, payPlan) {
    formInstance.batch(() => {
      formInstance.change('billToId', billToId);
      formInstance.change('billToType', billToType);
      formInstance.change('payPlan', payPlan);
    });
  }

  if (!loaded) {
    return <SectionLoader />;
  }

  return (
    <section className="billing">
      <ul>
        {billingConfig.billingOptions.map(option => (
          <li key={option.answer}>
            <BillingOption option={option} config={billingConfig} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Billing;
