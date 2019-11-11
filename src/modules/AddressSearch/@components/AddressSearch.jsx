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

import { useAddressSearch } from '../hooks';
import AddressNoResults from './AddressNoResults';
import AddressResults from './AddressResults';

const AddressSearch = ({ location, match }) => {
  const { searchState, loading, handleSearchSubmit } = useAddressSearch();

  return (
    <React.Fragment>
      <div className="title">Search Address</div>
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
                    placeholder="Type your street address &amp; select Search Address"
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
              <p>Let’s get your quote started by looking for your address.</p>
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
              <div className="form-footer">
                <Button
                  className={Button.constants.classNames.primary}
                  type="submit"
                  data-test="submit"
                >
                  Search Address
                </Button>
              </div>
            </section>
          </form>
        )}
      </Form>
    </React.Fragment>
  );
};

export default AddressSearch;