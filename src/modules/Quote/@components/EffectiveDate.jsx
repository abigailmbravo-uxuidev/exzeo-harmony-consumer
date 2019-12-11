import React from 'react';
import { Field, validation, DatePicker, date } from '@exzeo/core-ui';
import { useZipCodeSettings } from '@exzeo/core-ui/src/@Harmony';

const EffectiveDate = ({ initialValues }) => {
  const { settings, loaded } = useZipCodeSettings(initialValues);

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
            label="Please select an effective date:"
            styleName="effectiveDate datePicker"
            minDate={minDate}
            maxDate={maxDate}
            monthsShown={2}
            popperPlacement="top-end"
            disabled={!loaded}
          />
        )}
      </Field>
    </section>
  );
};

export default EffectiveDate;
