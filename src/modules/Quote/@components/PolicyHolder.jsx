import React, { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ModalPortal } from '@exzeo/core-ui';
import { PolicyHolderModal } from '@exzeo/core-ui/src/@Harmony';

import PolicyholderCard from './PolicyholderCard';

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

  function deleteSecondaryPolicyHolder() {
    const data = {
      ...initialValues,
      policyHolders: [initialValues.policyHolders[0]]
    };

    customHandlers.handleSubmit(data);
  }

  return (
    <section className={config.className}>
      <h4>Policyholder(s)</h4>
      {initialValues.policyHolders.map(ph => (
        <PolicyholderCard
          key={ph.order}
          policyHolder={ph}
          icons={
            <React.Fragment>
              <a onClick={() => setModal({ show: true, ph: ph.order })}>
                <FontAwesomeIcon icon="edit" />
              </a>
              {ph.order === 1 ? (
                <a onClick={deleteSecondaryPolicyHolder}>
                  <FontAwesomeIcon icon="times" />
                </a>
              ) : null}
            </React.Fragment>
          }
        />
      ))}
      <div
        className={classNames('addBtnWrapper', {
          disabled: initialValues.policyHolders.length > 1
        })}
      >
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
          <FontAwesomeIcon icon="plus" />
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
