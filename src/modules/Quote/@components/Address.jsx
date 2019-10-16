import React from 'react';
import { Field, FormSpy, Radio } from '@exzeo/core-ui';
import classNames from 'classnames';
import { AddressFormFields, AddressFieldWatchers } from '@exzeo/harmony-core';
import { BOOL_OPTIONS } from '../../../constants/input';

const Address = ({ initialValues, config }) => {
  const initialValue =
    initialValues.property.physicalAddress.address1 ===
      initialValues.policyHolderMailingAddress.address1 &&
    initialValues.property.physicalAddress.address2 ===
      initialValues.policyHolderMailingAddress.address2;

  return (
    <section className="addressSection">
      <Field name="sameAsPropertyAddress" initialValue={initialValue}>
        {({ input, meta }) => (
          <Radio
            input={input}
            meta={meta}
            answers={BOOL_OPTIONS}
            label="Is your mailing address different from the property address?"
            styleName="mailingSameAsProperty radio"
            dataTest="mailingSameAsProperty"
            segmented
          />
        )}
      </Field>

      <FormSpy subscription={{ values: true }}>
        {({ values }) => (
          <div
            className={classNames('well', {
              hide: !values.sameAsPropertyAddress
            })}
          >
            <AddressFormFields fieldPrefix="policyHolderMailingAddress" />
          </div>
        )}
      </FormSpy>

      <AddressFieldWatchers
        watchField="sameAsPropertyAddress"
        fieldPrefix="policyHolderMailingAddress"
        matchPrefix="property.physicalAddress"
        values={initialValues}
      />
    </section>
  );
};

export default Address;
