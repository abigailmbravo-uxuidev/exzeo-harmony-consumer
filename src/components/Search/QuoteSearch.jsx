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

// import QuoteCard from './QuoteCard';
// import NoResults from './NoResults';

export const VALID_QUOTE_STATES = [
  'Quote Started',
  'Quote Qualified',
  'Application Started',
  'Application Ready',
  'Quote Stopped'
];

const initialState = {
  hasSearched: false,
  result: null,
  noResults: false
};

const QuoteSearch = () => {
  const [searchState, setSearchState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  async function handleSearchSubmit({ lastName, zipCode, quoteNumber, email }) {
    try {
      if (searchState.hasSearched) {
        setSearchState(initialState);
      }

      const params = {
        quoteNumber,
        email
      };

      setLoading(true);
      // TODO for now only searching by quoteNumber, expecting one quote to return, but we will be adding the ability to search by email, which could result in multiple quotes...
      const result = await retrieveQuote(params);
      const quoteFound = result && result.quoteNumber;

      setSearchState({
        hasSearched: true,
        result: result,
        noResults: !quoteFound,
        // TODO this is confusing logic, but will ultimately not be needed here once we accept 'email' as valid search criteria and can then potentially return multiple quotes
        invalidQuoteState:
          quoteFound && !VALID_QUOTE_STATES.includes(result.quoteState)
      });
    } catch (error) {
      console.error('Error searching: ', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="view-grid">
      <h1 className="title">Retrieve Quote</h1>
      <Form
        onSubmit={handleSearchSubmit}
        subscription={{ pristine: true, submitting: true }}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="retrieveQuoteWrapper">
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
                  disabled={submitting || pristine}
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

        {searchState.hasSearched && (
          <React.Fragment>
            {searchState.noResults && (
              <div>
                Oops! We were unable to find the quote you were looking for.
                Please try again or feel free to contact us for support.
              </div>
            )}

            {searchState.result && searchState.invalidQuoteState && (
              <div>
                We apologize but this Quote has a status of “ ... “ (show the
                quote state) which is no longer retrievable. For questions or
                edits, please contact us. Provide phone and contact methods.
                Click Here to start a new quote (take Quote Number them to
                consumer “landing page”).
              </div>
            )}
            {searchState.result && !searchState.invalidQuoteState && (
              <div>
                Yay we found your quote: {searchState.result.quoteNumber}
              </div>
            )}
          </React.Fragment>
        )}

        {/*{searchState.hasSearched &&*/}
        {/*  (searchState.noResults ? (*/}
        {/*    <NoResults />*/}
        {/*  ) : (*/}
        {/*    <QuoteCard*/}
        {/*      key={searchState.result.quoteNumber}*/}
        {/*      quote={searchState.result}*/}
        {/*    />*/}
        {/*  ))}*/}
      </section>
    </div>
  );
};

export default QuoteSearch;
