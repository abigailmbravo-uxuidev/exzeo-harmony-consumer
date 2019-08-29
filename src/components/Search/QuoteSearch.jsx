import React, { useState } from 'react';
import {
  Button,
  Input,
  Form,
  Field,
  SectionLoader,
  validation,
  composeValidators
  // Switch
} from '@exzeo/core-ui';

import { retrieveQuote } from '@exzeo/core-ui/src/@Harmony';

import QuoteCard from './QuoteCard';
import NoResults from './NoResults';

const QuoteSearch = () => {
  const [searchState, setSearchState] = useState({
    hasSearched: false,
    result: null,
    noResults: false
  });
  const [loading, setLoading] = useState(false);

  async function handleSearchSubmit({ lastName, zipCode, quoteNumber, email }) {
    try {
      const params = {
        quoteNumber,
        email
      };

      setLoading(true);
      // TODO for now only searching by quoteNumber, expecting one quote to return, but we will be adding the ability to search by email, which could result in multiple quotes...
      const result = await retrieveQuote(params);

      setSearchState({
        hasSearched: true,
        result: result,
        noResults: !result.quoteNumber
      });
    } catch (error) {
      console.error('Error searching: ', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSearchSubmit} subscription={{}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="retrieveQuoteWrapper view-grid">
              <h1>Retrieve Quote</h1>
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

              {/*<Field name="hasQuoteNumber">*/}
              {/*  {({ input, meta }) => (*/}
              {/*    <Switch*/}
              {/*      input={input}*/}
              {/*      meta={meta}*/}
              {/*      styleName="switch"*/}
              {/*      label="Do you have access to the Quote Number"*/}
              {/*      dataTest="hasQuoteNumber"*/}
              {/*    />*/}
              {/*  )}*/}
              {/*</Field>*/}

              {/*{values.hasQuoteNumber ? (*/}
              {/*  <Field*/}
              {/*    name="quoteNumber"*/}
              {/*    validate={composeValidators([validation.isRequired])}*/}
              {/*  >*/}
              {/*    {({ input, meta }) => (*/}
              {/*      <Input*/}
              {/*        input={input}*/}
              {/*        meta={meta}*/}
              {/*        styleName="required"*/}
              {/*        label="Quote Number"*/}
              {/*        dataTest="quoteNumber"*/}
              {/*        placeholder="TTIC-A3-"*/}
              {/*      />*/}
              {/*    )}*/}
              {/*  </Field>*/}
              {/*) : (*/}
              {/*  <Field*/}
              {/*    name="email"*/}
              {/*    validate={composeValidators([validation.isRequired])}*/}
              {/*  >*/}
              {/*    {({ input, meta }) => (*/}
              {/*      <Input*/}
              {/*        input={input}*/}
              {/*        meta={meta}*/}
              {/*        styleName="required"*/}
              {/*        label="Email"*/}
              {/*        dataTest="email"*/}
              {/*        placeholder="jsmith@email.com"*/}
              {/*      />*/}
              {/*    )}*/}
              {/*  </Field>*/}
              {/*)}*/}
              <div className="form-footer">
                <Button
                  className={Button.constants.classNames.primary}
                  type="submit"
                  data-test="submit"
                >
                  Retrieve Quote
                </Button>
              </div>
            </div>
          </form>
        )}
      </Form>

      <section className="results">
        {loading && <SectionLoader />}

        {searchState.hasSearched &&
          (searchState.noResults ? (
            <NoResults />
          ) : (
            <QuoteCard
              key={searchState.result.quoteNumber}
              quote={searchState.result}
            />
          ))}
      </section>
    </>
  );
};

export default QuoteSearch;
