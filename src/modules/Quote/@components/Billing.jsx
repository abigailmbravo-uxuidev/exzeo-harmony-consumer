import React from 'react';
import { SectionLoader, validation } from '@exzeo/core-ui';
import {
  useFetchBillingConfiguration,
  getBillToConfiguration,
  BillingFieldWatchers
} from '@exzeo/core-ui/src/@Harmony';
import { useField } from '@exzeo/core-ui';

import BillingOption from './BillingOption';
import classNames from 'classnames';
import PayPlanOptions from './PayPlanOptions';

const Billing = ({ initialValues, formInstance }) => {
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

  return (
    <section className="billing">
      <h4>Who should we bill for your Policy?</h4>
      {billToIdField.meta.touched && billToIdField.meta.error && (
        <span>You did something way wrong!</span>
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
