import React, { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Field,
  Form,
  Radio,
  Modal,
  ModalPortal,
  Button,
  useField,
  validation
} from '@exzeo/core-ui';
import { AddressWithAutoFill } from 'components/Address';

import { BOOL_OPTIONS } from '../../../constants/input';
import AddressCard from './AddressCard';

function initializeAddressForm(document) {
  return {
    sameAsPropertyAddress: String(
      document.property.physicalAddress.address1 ===
        document.policyHolderMailingAddress.address1
    ),
    policyHolderMailingAddress: document.policyHolderMailingAddress
  };
}

const Address = ({ initialValues, customHandlers }) => {
  const [modal, setModal] = useState({ show: false });
  const phAddressField = useField('policyHolderMailingAddress.address1', {
    validate: validation.isRequired
  });

  async function handleSubmit(formValues) {
    const data = {
      ...initialValues,
      policyHolderMailingAddress: formValues.policyHolderMailingAddress
    };

    await customHandlers.handleSubmit(data);
    setModal({ show: false });
  }

  const phAddressError =
    phAddressField.meta.touched && phAddressField.meta.error;

  return (
    <section
      className={classNames('addressSection', { error: phAddressError })}
    >
      <h4>Mailing Address</h4>

      {phAddressError && (
        <span>{phAddressError /* or whatever you want here */}</span>
      )}

      {initialValues.policyHolderMailingAddress.address1 && (
        <AddressCard
          address={initialValues.policyHolderMailingAddress}
          icons={
            <a onClick={() => setModal({ show: true })}>
              <FontAwesomeIcon icon="edit" />
            </a>
          }
        />
      )}

      <div
        className={classNames('addBtnWrapper', {
          disabled: initialValues.policyHolderMailingAddress.address1
        })}
      >
        <h3>Add Mailing Address</h3>
        <Button
          data-test="add-address"
          onClick={() => setModal({ show: true })}
          className={Button.constants.classNames.icon}
          disabled={!!initialValues.policyHolderMailingAddress.address1}
          type="button"
        >
          <span>Add Mailing Address</span>
          <FontAwesomeIcon icon="plus" />
        </Button>
      </div>

      {modal.show && (
        <ModalPortal>
          <Modal
            size={Modal.sizes.xlarge}
            className="addMailingAddressModal"
            header={<h4>Add Mailing Address</h4>}
          >
            <Form
              onSubmit={handleSubmit}
              initialValues={initializeAddressForm(initialValues)}
            >
              {({ handleSubmit }) => (
                <React.Fragment>
                  <div className="card-block">
                    <Field name="sameAsPropertyAddress">
                      {({ input, meta }) => (
                        <Radio
                          input={input}
                          meta={meta}
                          answers={BOOL_OPTIONS}
                          label="Is your mailing address the same as the property address?"
                          styleName="mailingSameAsProperty radio"
                          dataTest="mailingSameAsProperty"
                          segmented
                        />
                      )}
                    </Field>

                    <AddressWithAutoFill
                      watchField="sameAsPropertyAddress"
                      fieldPrefix="policyHolderMailingAddress"
                      matchPrefix="property.physicalAddress"
                      values={initialValues}
                    />
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <Button
                        className={Button.constants.classNames.secondary}
                        label="cancel"
                        onClick={() => setModal({ show: false })}
                        data-test="ai-modal-cancel"
                      />

                      <Button
                        className={Button.constants.classNames.primary}
                        label="save"
                        onClick={handleSubmit}
                        onKeyPress={e => e.charCode === 13 && handleSubmit(e)}
                        type="button"
                        data-test="ai-modal-submit"
                      />
                    </div>
                  </div>
                </React.Fragment>
              )}
            </Form>
          </Modal>
        </ModalPortal>
      )}
    </section>
  );
};

export default Address;
