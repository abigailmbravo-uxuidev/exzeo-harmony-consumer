import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Input,
  Form,
  Field,
  validation,
  composeValidators
} from '@exzeo/core-ui';

const AddressSearch = () => {
  return (
    <main role="main">
      <Form onSubmit={x => x}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h1>Address</h1>

            <div className="searchInputWrapper">
              <Field
                name="address"
                validate={composeValidators([
                  validation.isRequired,
                  validation.isValidAddressFormat
                ])}
              >
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    type={'text'}
                    label="Property Address"
                    styleName="property-search"
                    dataTest="address"
                    placeholder="Search for Property Address"
                  />
                )}
              </Field>

              <Button
                className={Button.constants.classNames.primary}
                customClass="multi-input btnSearch"
                type="submit"
                data-test="submit"
              >
                <FontAwesomeIcon icon="search" size="sm" />
              </Button>
            </div>
            <p>Enter the street address only (e.g., 123 Main Street).</p>
          </form>
        )}
      </Form>
    </main>
  );
};

export default AddressSearch;
