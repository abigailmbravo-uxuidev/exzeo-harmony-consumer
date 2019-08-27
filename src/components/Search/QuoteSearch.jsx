import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Input,
  Form,
  Field,
  SectionLoader,
  validation,
  composeValidators,
  Switch
} from '@exzeo/core-ui';

import { searchAddress } from '@exzeo/core-ui/src/@Harmony';

import QuoteCard from './QuoteCard';
import NoResults from './NoResults';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const QuoteSearch = () => {
  const [searchState, setSearchState] = useState({
    hasSearched: false,
    results: [],
    noResults: false
  });
  const [loading, setLoading] = useState(false);

  async function handleSearchSubmit(values) {
    try {
      setLoading(true);
      await sleep(30);
      setSearchState({
        hasSearched: true,
        results: [{ quoteNumber: 1 }],
        noResults: false
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
            <h1>Retrieve Quote</h1>

            <div className="searchInputWrapper view-grid">
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
                name="zipCode"
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

              <Field name="hasQuoteNumber">
                {({ input, meta }) => (
                  <Switch
                    input={input}
                    meta={meta}
                    styleName="switch required"
                    label="Do you have access to the Quote Number"
                    dataTest="hasQuoteNumber"
                  />
                )}
              </Field>

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
                    placeholder="TTIC-A3-"
                  />
                )}
              </Field>
            </div>

            <Button
              className={Button.constants.classNames.primary}
              type="submit"
              data-test="submit"
            >
              Retrieve Quote
            </Button>
          </form>
        )}
      </Form>

      <section className="results">
        {loading && <SectionLoader />}

        {searchState.hasSearched && searchState.noResults ? (
          <NoResults />
        ) : (
          searchState.results.map(quote => (
            <QuoteCard key={quote.quoteNumber} property={quote} />
          ))
        )}
      </section>
    </main>
  );
};

export default QuoteSearch;
