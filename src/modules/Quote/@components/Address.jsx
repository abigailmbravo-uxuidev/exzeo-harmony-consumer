import React, { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Field,
  Radio,
  Modal,
  Button,
  useField,
  useFormState,
  validation
} from '@exzeo/core-ui';
import { AddressWithAutoFill } from '@exzeo/core-ui/src/@Harmony';

import { BOOL_OPTIONS } from '../../../constants/input';
import AddressCard from './AddressCard';

const Address = ({ initialValues, formInstance }) => {
  const [modal, setModal] = useState({ show: false });
  const { values } = useFormState({ subscription: { values: true } });
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

      {values.policyHolderMailingAddress.address1 && (
        <AddressCard
          address={values.policyHolderMailingAddress}
          icons={
            <a onClick={() => setModal({ show: true })}>
              <FontAwesomeIcon icon="edit" />
            </a>
          }
        />
      )}

      <div
        className={classNames('addBtnWrapper', {
          disabled: values.policyHolderMailingAddress.address1
        })}
      >
        <h3>Add Mailing Address</h3>
        <Button
          data-test="add-address"
          onClick={() => setModal({ show: true })}
          className={Button.constants.classNames.icon}
          disabled={values.policyHolderMailingAddress.address1}
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
