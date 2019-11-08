import React, { useState } from 'react';
import { Field, FormSpy, Radio, Modal, Button } from '@exzeo/core-ui';
import classNames from 'classnames';
import { AddressWithAutoFill } from '@exzeo/core-ui/src/@Harmony';

import { BOOL_OPTIONS } from '../../../constants/input';
import AddressCard from './AddressCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Address = ({ initialValues }) => {
  const [modal, setModal] = useState({ show: false });

  return (
    <section className="addressSection">
      <h4>Mailing Address</h4>
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
      {!initialValues.policyHolderMailingAddress.address1 && (
        <div className="card">
          <div className="cardContent">
            <h4>title</h4>
            <p>descritpion</p>
          </div>
          <div className="cardFooter">
            <a onClick={() => setModal({ show: true })}>
              <FontAwesomeIcon icon="edit" />
            </a>
          </div>
        </div>
      )}
      <h3>Add Mailing Address</h3>
      <Button
        data-test="add-address"
        onClick={() => setModal({ show: true })}
        disabled={initialValues.policyHolderMailingAddress.address1}
        className={Button.constants.classNames.icon}
        type="button"
      >
        +
      </Button>
      {modal.show && (
        <Modal size={Modal.sizes.xlarge} className="" header="">
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
        </Modal>
      )}
    </section>
  );
};

export default Address;
