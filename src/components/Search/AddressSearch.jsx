import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  Button,
  Input,
  Form,
  Field,
  SectionLoader,
  validation,
  composeValidators
} from '@exzeo/core-ui';

import { searchAddress } from '@exzeo/harmony-core';

import { CONTACT_PHONE } from '../../constants/contactInformation';

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
                  <NoResults />
                ) : (
                  <>
                    {searchState.results.map(property => (
                      <AddressCard key={property.id} property={property} />
                    ))}

                    <p>
                      If you don’t see your address in the list provided, try
                      entering less address information to see if it comes up.
                      Please note, at this time we are only writing single
                      family dwellings in the state of Florida.
                      <br />
                      <br />
                      If you still have problems, please&nbsp;
                      <a href={CONTACT_PHONE.href}>call us</a>&nbsp;and one of
                      our representative will be glad to help you.
                    </p>
                  </>
                ))}
            </section>

            <hr />

            <section>
              <label>Already received a quote? No problem!</label>
              <p>Your quote will be saved up to 30 days.</p>

              <div className="form-footer">
                <Link to="/retrieveQuote" className="btn btn-secondary">
                  Retrieve Quote
                </Link>
              </div>
            </section>
          </form>
        )}
      </Form>
    </>
  );
};

export default AddressSearch;
