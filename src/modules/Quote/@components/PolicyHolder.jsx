import React, { useState } from 'react';
import {
  Button,
  Field,
  Form,
  ModalPortal,
  OnChangeListener,
  Radio,
  validation
} from '@exzeo/core-ui';
import { PolicyHolderModal } from '@exzeo/core-ui/src/@Harmony';

import { BOOL_OPTIONS } from 'constants/input';

import PolicyholderCard from './PolicyholderCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const INITIAL_STATE = {
  show: false,
  ph: null
};

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

    await customHandlers.handleSubmit(data);

    setModal(INITIAL_STATE);
  }

  return (
    <section className={config.className}>
      <h4>Policyholder(s)</h4>
      {initialValues.policyHolders.map(ph => (
        <PolicyholderCard
          key={ph.order}
          policyHolder={ph}
          icons={
            <a onClick={() => setModal({ show: true, ph: ph.order })}>
              <FontAwesomeIcon icon="edit" />
            </a>
          }
        />
      ))}
      <div className="addBtnWrapper">
        <h3>Add Policyholder</h3>
        <Button
          data-test="add-policyHolder"
          onClick={() =>
            setModal({ show: true, ph: initialValues.policyHolders.length })
          }
          disabled={initialValues.policyHolders.length > 1}
          className={Button.constants.classNames.icon}
          type="button"
        >
          +
        </Button>
      </div>

      {modal.show && (
        <ModalPortal>
          <PolicyHolderModal
            handleFormSubmit={handlePolicyHolderSubmit}
            handleCancel={() => setModal(INITIAL_STATE)}
            initialValues={initialValues.policyHolders[modal.ph]}
            order={modal.ph}
          />
        </ModalPortal>
      )}
    </section>
  );
};

export default PolicyHolder;
