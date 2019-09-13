import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Input,
  Form,
  Field,
  SectionLoader,
  validation,
  composeValidators
} from '@exzeo/core-ui';

import AddressNoResults from './AddressNoResults';

import AddressResults from './AddressResults';
import AddressSearchFooter from './AddressSearchFooter';
import { useAddressSearch } from '../hooks';

const AddressSearch = ({ location, match }) => {
  const { searchState, loading, handleSearchSubmit } = useAddressSearch();

  return (
    <>
      <h1 className="title">Address</h1>
      <Form onSubmit={handleSearchSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
            <section className="results">
              {loading && <SectionLoader />}

              {searchState.hasSearched &&
                (searchState.noResults ? (
                  <AddressNoResults />
                ) : (
                  <AddressResults
                    results={searchState.results}
                    companyCode={'TTIC'}
                    product={'AF3'}
                  />
                ))}
            </section>

            <hr />

            <section>
              <AddressSearchFooter />
            </section>
          </form>
        )}
      </Form>
    </>
  );
};

export default AddressSearch;
