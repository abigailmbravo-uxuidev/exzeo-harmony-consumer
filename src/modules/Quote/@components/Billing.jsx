import React from 'react';
import classNames from 'classnames';
import { SectionLoader, validation, useField } from '@exzeo/core-ui';
import {
  useFetchBillingConfiguration,
  getBillToConfiguration,
  BillingFieldWatchers
} from '@exzeo/core-ui/src/@Harmony';

import BillingOption from './BillingOption';
import PayPlanOptions from './PayPlanOptions';

const Billing = ({ initialValues }) => {
  const { billingConfig, loaded } = useFetchBillingConfiguration(initialValues);
  const billToIdField = useField('billToId', {
    validate: validation.isRequired
  });

  const payPlanField = useField('billPlan', {
    validate: validation.isRequired
  });

  if (!loaded) {
    return <SectionLoader />;
  }

  const billingError = billToIdField.meta.touched && billToIdField.meta.error;
  return (
    <section className={classNames('billing', { error: billingError })}>
      <h4>Who should we bill for your Policy?</h4>

      {billingError && (
        <span>
          Please select the person or company we should send the bill to for
          your Flood insurance policy.
        </span>
      )}

      <ul>
        {billingConfig.billingOptions.map(option => {
          const billingToConfig = getBillToConfiguration(
            billingConfig,
            option.answer
          );
          const isSelected = option.answer === billToIdField.input.value;

          return (
            <li key={option.answer}>
              <BillingOption
                option={option}
                handleClick={billToIdField.input.onChange}
                isSelected={isSelected}
              />

              <div className={classNames({ 'fade-in': isSelected })}>
                {isSelected && (
                  <PayPlanOptions
                    availablePlans={billingToConfig.availablePlans}
                    paymentPlans={billingConfig.paymentPlans}
                    handleClick={payPlanField.input.onChange}
                    selectedPlan={payPlanField.input.value}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <BillingFieldWatchers billingConfig={billingConfig} />
    </section>
  );
};

export default Billing;
