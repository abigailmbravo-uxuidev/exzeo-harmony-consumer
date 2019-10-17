import React from 'react';
import { Field, validation, DatePicker, date } from '@exzeo/core-ui';

const EffectiveDate = ({ initialValues }) => {
  const { zipCodeSettings } = initialValues;

  const minDate = new Date(
    // override default formatting
    date.formatDate(zipCodeSettings.minEffectiveDate, undefined)
  );
  const maxDate = new Date(
    // override default formatting
    date.formatDate(zipCodeSettings.maxEffectiveDate, undefined)
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
