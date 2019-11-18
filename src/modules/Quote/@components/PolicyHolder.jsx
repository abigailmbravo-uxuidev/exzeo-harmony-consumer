import React, { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ModalPortal } from '@exzeo/core-ui';
import { PolicyHolderModal } from '@exzeo/core-ui/src/@Harmony';

import PolicyholderCard from './PolicyholderCard';

const INITIAL_STATE = {
  show: false,
  ph: 0
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
          type="button"
          data-test="add-policyHolder"
          className={Button.constants.classNames.icon}
          disabled={initialValues.policyHolders.length > 1}
          onClick={() =>
            setModal({ show: true, ph: initialValues.policyHolders.length })
          }
        >
          <span>Add Policyholder</span>
          <FontAwesomeIcon icon="plus" />
        </Button>
      </div>

      {modal.show && (
        <ModalPortal>
          <PolicyHolderModal
            className="policyholderModal"
            handleFormSubmit={handlePolicyHolderSubmit}
            handleCancel={() => setModal(INITIAL_STATE)}
            initialValues={initialValues.policyHolders[modal.ph]}
            order={modal.ph}
            header={
              <React.Fragment>
                <h4>{`Policyholder ${modal.ph + 1}`}</h4>
                {modal.ph === 1 && (
                  <p>
                    Policyholder 2 is for spouse or co-owner that resides in the
                    home.
                  </p>
                )}
              </React.Fragment>
            }
          />
        </ModalPortal>
      )}
    </section>
  );
};

export default PolicyHolder;
