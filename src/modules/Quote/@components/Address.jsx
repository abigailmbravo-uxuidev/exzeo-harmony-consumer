import React from 'react';
import { Field, FormSpy, Radio } from '@exzeo/core-ui';
import classNames from 'classnames';
import { AddressFormFields, AddressFieldWatchers } from '@exzeo/harmony-core';
import { BOOL_OPTIONS } from '../../../constants/input';

const Address = ({ initialValues, config }) => {
  function initializeSameAsPropertyField(values) {
    return false;
  }

  return (
    <section className="addressSection">
      <Field
        name="sameAsPropertyAddress"
        initialValue={initializeSameAsPropertyField(initialValues)}
      >
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

      <FormSpy subscription={{ values: true }}>
        {({ values }) => (
          <div
            className={classNames('well', {
              hide: values.sameAsPropertyAddress
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
