import React, { useEffect } from 'react';
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

import { useQuote } from 'modules/Quote';

import { useAddressSearch } from '../hooks';
import AddressNoResults from './AddressNoResults';
import AddressResults from './AddressResults';
import AddressSearchFooter from './AddressSearchFooter';

const AddressSearch = ({ location, match }) => {
  const { searchState, loading, handleSearchSubmit } = useAddressSearch();

  return (
    <>
      <Form onSubmit={handleSearchSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="title">Address</div>
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
