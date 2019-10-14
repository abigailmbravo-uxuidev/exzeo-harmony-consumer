import React from 'react';
import { Field, validation, DatePicker, date } from '@exzeo/core-ui';
import { useZipCodeSettings } from '@exzeo/harmony-core';

const EffectiveDate = ({ initialValues }) => {
  const { companyCode, state, product, property } = initialValues;
  const { settings = {} } = useZipCodeSettings(
    companyCode,
    state,
    product,
    property.physicalAddress.zip
  );

  const minDate = new Date(
    // override default formatting
    date.formatDate(settings.minEffectiveDate, undefined)
  );
  const maxDate = new Date(
    // override default formatting
    date.formatDate(settings.maxEffectiveDate, undefined)
  );

  return (
    <section className="datePicker">
      <Field name="effectiveDate" validate={validation.isRequired}>
        {({ input, meta }) => (
          <DatePicker
            input={input}
            meta={meta}
            dataTest="effectiveDate"
            label="Please select a date for your policy to become effective."
            styleName="effectiveDate datePicker"
            minDate={minDate}
            maxDate={maxDate}
            monthsShown={2}
            inline
          />
        )}
      </Field>
    </section>
  );
};

export default EffectiveDate;
