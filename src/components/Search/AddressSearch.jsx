import React, { useState } from 'react';
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

import { searchAddress } from '@exzeo/core-ui/src/@Harmony';

import AddressCard from './AddressCard';
import NoResults from './NoResults';

const AddressSearch = () => {
  const [searchState, setSearchState] = useState({
    hasSearched: false,
    results: [],
    noResults: false
  });
  const [loading, setLoading] = useState(false);

  async function handleSearchSubmit(values) {
    try {
      setLoading(true);
      const results = await searchAddress(values.address);
      setSearchState({
        hasSearched: true,
        results: results.IndexResult,
        noResults: !results.TotalCount
      });
    } catch (error) {
      console.error('Error searching: ', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main role="main">
      <Form onSubmit={handleSearchSubmit}>
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
          </form>
        )}
      </Form>

      <section className="results">
        {loading && <SectionLoader />}

        {searchState.hasSearched && searchState.noResults ? (
          <NoResults />
        ) : (
          searchState.results.map(property => (
            <AddressCard key={property.id} property={property} />
          ))
        )}
      </section>
    </main>
  );
};

export default AddressSearch;
