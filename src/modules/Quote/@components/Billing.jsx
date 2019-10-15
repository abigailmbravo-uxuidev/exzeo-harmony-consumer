import React from 'react';
import { SectionLoader, useField } from '@exzeo/core-ui';
import { useFetchBillingConfiguration } from '@exzeo/harmony-core';

import BillingOption from './BillingOption';

const Billing = ({ initialValues }) => {
  const { billingConfig, loaded } = useFetchBillingConfiguration(initialValues);

  if (!loaded) {
    return <SectionLoader />;
  }

  return (
    <section>
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
