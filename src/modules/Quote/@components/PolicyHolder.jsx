import React from 'react';
import { Field, Form, ModalPortal, Radio, validation } from '@exzeo/core-ui';
import { PolicyHolderModal } from '@exzeo/harmony-core';

import { BOOL_OPTIONS } from 'constants/input';

import PolicyholderCard from './PolicyholderCard';

function setInitialValues(quote) {
  return {
    policyHolder1: !!quote.policyHolders.length < 0,
    policyHolder2: !!quote.policyHolders.length < 1
  };
}

const PolicyHolder = ({ initialValues, config, customHandlers }) => {
  async function handlePolicyHolderSubmit(policyHolder) {
    const updatedPolicyHolders = initialValues.policyHolders.filter(
      p => p.order !== policyHolder.order
    );

    updatedPolicyHolders.push(policyHolder);
    if (updatedPolicyHolders.length > 1) {
      updatedPolicyHolders.sort((a, b) => a.order - b.order);
    }

    const data = {
      ...initialValues,
      policyHolders: updatedPolicyHolders
    };

    customHandlers.handleSubmit(data);
  }

  return (
    <div className={config.className}>
      <Form onSubmit={x => x} initialValues={setInitialValues(initialValues)}>
        {({ values }) => (
          <React.Fragment>
            <h4>Policyholder 1</h4>
            <PolicyholderCard policyHolder={initialValues.policyHolders[0]} />

            {values.policyHolder2 && initialValues.policyHolders[1] && (
              <React.Fragment>
                <h4>Policyholder 2</h4>
                <PolicyholderCard
                  policyHolder={initialValues.policyHolders[1]}
                />
              </React.Fragment>
            )}

            {values.policyHolder2 && !initialValues.policyHolders[1] && (
              <ModalPortal>
                <PolicyHolderModal
                  fieldPrefix="ph"
                  handleFormSubmit={handlePolicyHolderSubmit}
                  initialValues={initialValues.policyHolders[1]}
                  order={1}
                />
              </ModalPortal>
            )}

            <Field name="policyHolder2" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Radio
                  input={input}
                  meta={meta}
                  answers={BOOL_OPTIONS}
                  styleName="policyHolder radio"
                  dataTest="policyHolder2"
                  label="Did you get your boo to buy this house with you?"
                  hint=""
                  segmented
                />
              )}
            </Field>
          </React.Fragment>
        )}
      </Form>
    </div>
  );
};

export default PolicyHolder;
