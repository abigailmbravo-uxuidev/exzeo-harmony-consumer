import React from 'react';
import {
  Field,
  Input,
  composeValidators,
  format,
  validation
} from '@exzeo/core-ui';

const { toUppercase } = format;
const { isRequired, validateState, validateZipCode } = validation;

const AddressFormFields = ({ fieldPrefix }) => {
  return (
    <React.Fragment>
      <Field name={`${fieldPrefix}.address1`} validate={isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Address 1"
            styleName="input"
            dataTest={`${fieldPrefix}.address1`}
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.address2`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Address 2"
            styleName="input"
            dataTest={`${fieldPrefix}.address2`}
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.city`} validate={isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="City"
            size="view-col-9"
            styleName="input"
            dataTest={`${fieldPrefix}.city`}
          />
        )}
      </Field>

      <Field
        name={`${fieldPrefix}.state`}
        parse={toUppercase}
        validate={composeValidators([isRequired, validateState])}
      >
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="State"
            size="view-col-1"
            styleName="input"
            dataTest={`${fieldPrefix}.state`}
          />
        )}
      </Field>

      <Field
        name={`${fieldPrefix}.zip`}
        validate={composeValidators([isRequired, validateZipCode])}
      >
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Zip"
            size="view-col-2"
            styleName="input"
            dataTest={`${fieldPrefix}.zip`}
          />
        )}
      </Field>
    </React.Fragment>
  );
};

export default AddressFormFields;
