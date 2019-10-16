import React from 'react';
import { format, date } from '@exzeo/core-ui';
import { getFormattedPaymentPlans } from '@exzeo/harmony-core';

const PayPlanOptions = ({ availablePlans, paymentPlans }) => {
  const paymentPlan = getFormattedPaymentPlans(availablePlans, paymentPlans);
  return (
    <div>
      {paymentPlan && paymentPlan.amount && (
        <div className="card">
          <dl className="" data-test="annual-plan">
            <dt>Annual</dt>
            <dd>
              {format.toCurrency(paymentPlan.amount)} :{' '}
              {date.formatDate(paymentPlan.dueDate)}
            </dd>
          </dl>
        </div>
      )}
      {paymentPlan && paymentPlan.s1 && paymentPlan.s2 && (
        <div className="card">
          <dl className="" data-test="semi-annual-plan">
            <dt>Semi-Annual</dt>
            <dd>
              {format.toCurrency(paymentPlan.s1.amount)} :{' '}
              {date.formatDate(paymentPlan.s1.dueDate)}
            </dd>
            <dd>
              {format.toCurrency(paymentPlan.s2.amount)} :{' '}
              {date.formatDate(paymentPlan.s2.dueDate)}
            </dd>
          </dl>
        </div>
      )}
      {paymentPlan &&
        paymentPlan.q1 &&
        paymentPlan.q2 &&
        paymentPlan.q3 &&
        paymentPlan.q4 && (
          <div className="card">
            <dl className="" data-test="quarterly-plan">
              <dt>Quarterly</dt>
              <dd>
                {format.toCurrency(paymentPlan.q1.amount)} :{' '}
                {date.formatDate(paymentPlan.q1.dueDate)}
              </dd>
              <dd>
                {format.toCurrency(paymentPlan.q2.amount)} :{' '}
                {date.formatDate(paymentPlan.q2.dueDate)}
              </dd>
              <dd>
                {format.toCurrency(paymentPlan.q3.amount)} :{' '}
                {date.formatDate(paymentPlan.q3.dueDate)}
              </dd>
              <dd>
                {format.toCurrency(paymentPlan.q4.amount)} :{' '}
                {date.formatDate(paymentPlan.q4.dueDate)}
              </dd>
            </dl>
          </div>
        )}
    </div>
  );
};

export default PayPlanOptions;
