import React from 'react';
import classNames from 'classnames';
import { format, date } from '@exzeo/core-ui';
import { getFormattedPaymentPlans, PAY_PLANS } from '@exzeo/harmony-core';

const PayPlanOptions = ({
  availablePlans,
  paymentPlans,
  handleClick,
  selectedPlan
}) => {
  const paymentPlan = getFormattedPaymentPlans(availablePlans, paymentPlans);
  return (
    <>
      {paymentPlan && paymentPlan.amount && (
        <div
          className={classNames('card', 'payPlan', {
            selected: selectedPlan === PAY_PLANS.annual
          })}
          onClick={() => handleClick(PAY_PLANS.annual)}
        >
          <div className="card-header">
            <h3>Annual</h3>
          </div>
          <div className="cardContent">
            <dl className="" data-test="annual-plan">
              <div>
                <dd>
                  <span>
                    <strong>Due on:&nbsp;</strong>
                  </span>
                  {date.formatDate(paymentPlan.dueDate)}
                </dd>
                <dd>
                  <span>
                    <strong>Amount:&nbsp;</strong>
                  </span>
                  {format.toCurrency(paymentPlan.amount)}
                </dd>
              </div>
            </dl>
          </div>
          <div className="card-footer">
            <label>
              {selectedPlan === PAY_PLANS.annual ? 'Selected' : 'Select'}
            </label>
          </div>
        </div>
      )}
      {paymentPlan && paymentPlan.s1 && paymentPlan.s2 && (
        <div
          className={classNames('card', 'payPlan', {
            selected: selectedPlan === PAY_PLANS.semiAnnual
          })}
          onClick={() => handleClick(PAY_PLANS.semiAnnual)}
        >
          <div className="card-header">
            <h3>Semi-Annual</h3>
          </div>
          <div className="cardContent">
            <dl className="" data-test="semi-annual-plan">
              <div className="semiCard">
                <dd>
                  <span>
                    <strong>Due on:&nbsp;</strong>
                  </span>
                  {date.formatDate(paymentPlan.s1.dueDate)}
                </dd>
                <dd>
                  <span>
                    <strong>Amount:&nbsp;</strong>
                  </span>
                  {format.toCurrency(paymentPlan.s1.amount)}
                </dd>
              </div>

              <div>
                <dd>
                  <span>
                    <strong>Due on:&nbsp;</strong>
                  </span>
                  {date.formatDate(paymentPlan.s2.dueDate)}
                </dd>
                <dd>
                  <span>
                    <strong>Amount:&nbsp;</strong>
                  </span>
                  {format.toCurrency(paymentPlan.s2.amount)}
                </dd>
              </div>
            </dl>
          </div>
          <div className="card-footer">
            <label>
              {selectedPlan === PAY_PLANS.semiAnnual ? 'Selected' : 'Select'}
            </label>
          </div>
        </div>
      )}
      {paymentPlan &&
        paymentPlan.q1 &&
        paymentPlan.q2 &&
        paymentPlan.q3 &&
        paymentPlan.q4 && (
          <div
            className={classNames('card', 'payPlan', {
              selected: selectedPlan === PAY_PLANS.quarterly
            })}
            onClick={() => handleClick(PAY_PLANS.quarterly)}
          >
            <div className="card-header">
              <h3>Quarterly</h3>
            </div>
            <div className="cardContent">
              <dl className="" data-test="quarterly-plan">
                <div>
                  <dd>
                    <span>
                      <strong>Due on:&nbsp;</strong>
                    </span>
                    {date.formatDate(paymentPlan.q1.dueDate)}
                  </dd>
                  <dd>
                    <span>
                      <strong>Amount:&nbsp;</strong>
                    </span>
                    {format.toCurrency(paymentPlan.q1.amount)}
                  </dd>
                </div>

                <div>
                  <dd>
                    <span>
                      <strong>Due on:&nbsp;</strong>
                    </span>
                    {date.formatDate(paymentPlan.q2.dueDate)}
                  </dd>
                  <dd>
                    <span>
                      <strong>Amount:&nbsp;</strong>
                    </span>
                    {format.toCurrency(paymentPlan.q2.amount)}
                  </dd>
                </div>

                <div>
                  <dd>
                    <span>
                      <strong>Due on:&nbsp;</strong>
                    </span>
                    {date.formatDate(paymentPlan.q3.dueDate)}
                  </dd>
                  <dd>
                    <span>
                      <strong>Amount:&nbsp;</strong>
                    </span>
                    {format.toCurrency(paymentPlan.q3.amount)}
                  </dd>
                </div>

                <div>
                  <dd>
                    <span>
                      <strong>Due on:&nbsp;</strong>
                    </span>
                    {date.formatDate(paymentPlan.q4.dueDate)}
                  </dd>
                  <dd>
                    <span>
                      <strong>Amount:&nbsp;</strong>
                    </span>
                    {format.toCurrency(paymentPlan.q4.amount)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="card-footer">
              <label>
                {selectedPlan === PAY_PLANS.quarterly ? 'Selected' : 'Select'}
              </label>
            </div>
          </div>
        )}
    </>
  );
};

export default PayPlanOptions;
