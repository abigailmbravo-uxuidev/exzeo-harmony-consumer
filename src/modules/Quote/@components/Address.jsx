import React, { useState } from 'react';
import {
  Field,
  Radio,
  Modal,
  Button,
  useField,
  validation
} from '@exzeo/core-ui';
import classNames from 'classnames';
import { AddressWithAutoFill } from '@exzeo/core-ui/src/@Harmony';

import { BOOL_OPTIONS } from '../../../constants/input';
import AddressCard from './AddressCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Address = ({ initialValues, formInstance }) => {
  const [modal, setModal] = useState({ show: false });
  const phAddressField = useField('policyHolderMailingAddress.address1', {
    validate: validation.isRequired
  });

  function handleSubmit() {
    const formState = formInstance.getState();
    if (formState.invalid) {
      // This will mark each field dirty, showing validation errors
      formInstance.submit();
    } else {
      setModal({ show: false });
    }
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

      <div className="addBtnWrapper">
        <h3>Add Mailing Address</h3>
        <Button
          data-test="add-address"
          onClick={() => setModal({ show: true })}
          disabled={initialValues.policyHolderMailingAddress.address1}
          className={Button.constants.classNames.icon}
          type="button"
        >
          <FontAwesomeIcon icon="plus" />
        </Button>
      </div>
      {modal.show && (
        <Modal
          size={Modal.sizes.xlarge}
          className={'addMailingAddressModal'}
          header={<h4>Add Mailing Address</h4>}
        >
          <div class="card-block">
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
                type="button"
                data-test="ai-modal-submit"
              />
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Address;
