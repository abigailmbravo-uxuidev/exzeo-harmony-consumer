import React from 'react';
import { composeValidators, Field, Input, validation } from '@exzeo/core-ui';
import { SEARCH_TYPES } from 'constants/search';

const SearchFields = ({ searchState }) => {
  return (
    <React.Fragment>
      {searchState.searchType === SEARCH_TYPES.quoteNumber ? (
        <Field
          name="quoteNumber"
          validate={composeValidators([validation.isRequired])}
        >
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              styleName="required"
              label="Quote Number"
              dataTest="quoteNumber"
              placeholder="TTIC-AF3-XXXXXX-X or 12-XXXXXXX-X"
            />
          )}
        </Field>
      ) : (
        <Field
          name="emailAddress"
          validate={composeValidators([validation.isRequired])}
        >
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              styleName="required"
              label="Email"
              dataTest="email"
              placeholder="jsmith@email.com"
            />
          )}
        </Field>
      )}

      <Field
        name="lastName"
        validate={composeValidators([
          validation.isRequired,
          validation.isValidNameFormat
        ])}
      >
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            styleName="required"
            label="Last Name"
            dataTest="lastName"
            placeholder="Smith"
          />
        )}
      </Field>

      <Field
        name="zip"
        validate={composeValidators([
          validation.isRequired,
          validation.isZipCode
        ])}
      >
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            type="text"
            styleName="required"
            label="ZIP Code"
            dataTest="zipCode"
            placeholder="ZIP Code"
          />
        )}
      </Field>
    </React.Fragment>
  );
};

export default SearchFields;
