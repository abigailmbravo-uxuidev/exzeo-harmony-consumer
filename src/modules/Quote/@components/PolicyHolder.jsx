import React, { useState } from 'react';
import {
  Field,
  Form,
  ModalPortal,
  OnChangeListener,
  Radio,
  validation
} from '@exzeo/core-ui';
import { PolicyHolderModal } from '@exzeo/harmony-core';

import { BOOL_OPTIONS } from 'constants/input';

import PolicyholderCard from './PolicyholderCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const INITIAL_STATE = {
  show: false
};

function setInitialValues(quote) {
  return {
    policyHolder2: quote.policyHolders.length > 1
  };
}

const PolicyHolder = ({ initialValues, config, customHandlers }) => {
  const [modal, setModal] = useState(INITIAL_STATE);

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

  async function deletePolicyHolder(index) {}

  return (
    <div className={config.className}>
      <Form onSubmit={x => x} initialValues={setInitialValues(initialValues)}>
        {({ values }) => (
          <React.Fragment>
            <h4>Policyholder 1</h4>
            <PolicyholderCard
              policyHolder={initialValues.policyHolders[0]}
              icons={
                <a onClick={() => setModal({ show: true, ph: 0 })}>
                  <FontAwesomeIcon icon="cat" />
                </a>
              }
            />

            {modal.show && modal.ph === 0 && (
              <ModalPortal>
                <PolicyHolderModal
                  handleFormSubmit={handlePolicyHolderSubmit}
                  initialValues={initialValues.policyHolders[0]}
                  order={0}
                />
              </ModalPortal>
            )}

            {initialValues.policyHolders[1] && (
              <React.Fragment>
                <h4>Policyholder 2</h4>
                <PolicyholderCard
                  policyHolder={initialValues.policyHolders[1]}
                  icons={
                    <React.Fragment>
                      <a onClick={() => setModal({ show: true, ph: 1 })}>
                        <FontAwesomeIcon icon="cat" />
                      </a>
                      <a onClick={() => deletePolicyHolder(1)}>
                        <FontAwesomeIcon icon="dog" />
                      </a>
                    </React.Fragment>
                  }
                />
              </React.Fragment>
            )}

            {values.policyHolder2 && !initialValues.policyHolders[1] && (
              <ModalPortal>
                <PolicyHolderModal
                  fieldPrefix="ph"
                  handleFormSubmit={handlePolicyHolderSubmit}
                  handleCancel={() => setModal(INITIAL_STATE)}
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

            <OnChangeListener name="policyHolder2">
              {value => {
                if (!value && initialValues.policyHolders[1]) {
                  deletePolicyHolder(1);
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Form>
    </div>
  );
};

export default PolicyHolder;
