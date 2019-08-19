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
              <p>Enter the street address only (e.g., 123 Main Street)</p>
            </div>
            <div className="form-group radio segmented">
              <label className="group-label label-segmented">
                Is the home or any structures on the property ever rented?
              </label>
              <div className="segmented-answer-wrapper">
                <div className="">
                  <label className="label-segmented">
                    <span>Yes</span>
                  </label>
                </div>
                <div className="">
                  <label className="label-segmented">
                    <span>Occasionally</span>
                  </label>
                </div>
                <div className="selected">
                  <label className="label-segmented selected">
                    <span tabindex="0">Never</span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        )}
      </Form>
    </main>
  );
};

export default AddressSearch;
