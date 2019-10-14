import React from 'react';
import { SectionLoader } from '@exzeo/core-ui';
import { useFetchBillingConfiguration } from '@exzeo/harmony-core';

const Billing = ({ initialValues }) => {
  const { billingConfig, loaded } = useFetchBillingConfiguration(initialValues);

  if (!loaded) {
    return <SectionLoader />;
  }

  return (
    <div>
      {billingConfig.billingOptions.map(option => (
        <div key={option.answer} className="card" data-test="billToCard">
          <div className="cardContent">
            <h4>{option.label.split(' ').filter((s, i) => i !== 0)}</h4>
          </div>
        </div>
      ))}

      {/*<pre>{JSON.stringify(billingConfig, 0, 2)}</pre>*/}
    </div>
  );
};

export default Billing;
