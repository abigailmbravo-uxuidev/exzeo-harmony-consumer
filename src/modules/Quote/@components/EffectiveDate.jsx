import React from 'react';
import { Field, validation, DatePicker } from '@exzeo/core-ui';
import { useZipCodeSettings } from '@exzeo/harmony-core';

// function calculateEffectiveDateRange(zipCodeSettings) {
//   return {
//     minDate: new Date(zipCodeSettings.minEffectiveDate),
//     maxDate: new Date(zipCodeSettings.maxEffectiveDate)
//   };
// }

const EffectiveDate = ({ initialValues }) => {
  const { companyCode, state, product, property } = initialValues;
  const { settings = {} } = useZipCodeSettings(
    companyCode,
    state,
    product,
    property.physicalAddress.zip
  );

  const minDate = new Date(settings.minEffectiveDat);
  const maxDate = new Date(settings.maxEffectiveDate);

  // const { minDate, maxDate } = useMemo(
  //   () => calculateEffectiveDateRange(settings),
  //   [settings.minEffectiveDate, settings.maxEffectiveDate]
  // );

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
          />
        )}
      </Field>
    </section>
  );
};

export default EffectiveDate;
