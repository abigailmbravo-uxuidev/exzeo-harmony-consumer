import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Input,
  Form,
  Field,
  SectionLoader,
  Modal,
  validation,
  composeValidators
  // Switch
} from '@exzeo/core-ui';
import { quoteData } from '@exzeo/core-ui/src/@Harmony';

import { useQuote } from 'modules/Quote';

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
  noResults: false,
  invalidQuoteState: false
};

const QuoteSearch = () => {
  const [searchState, setSearchState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { quote, setQuoteForUser } = useQuote();

  useEffect(() => {
    if (searchState.hasSearched && !searchState.invalidQuoteState) {
      setQuoteForUser(searchState.result);
    }
  }, [
    searchState.hasSearched,
    searchState.invalidQuoteState,
    searchState.result,
    setQuoteForUser
  ]);

  async function handleSearchSubmit({ lastName, zipCode, quoteNumber, email }) {
    try {
      if (searchState.hasSearched) {
        setSearchState(initialState);
      }

      const params = {
        lastName,
        zipCode,
        email,
        // TODO the above are currently being ignored by server
        quoteNumber
      };

      setLoading(true);
      // TODO for now only searching by quoteNumber, expecting one quote to return, but we will be adding the ability to search by email, which could result in multiple quotes...
      const result = await quoteData.retrieveQuote(params);
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

  function resetSearch(form) {
    form.reset();
    setSearchState(initialState);
  }

  return (
    <React.Fragment>
      <div className="title">Retrieve Quote</div>
      <Form
        onSubmit={handleSearchSubmit}
        subscription={{ pristine: true, submitting: true }}
      >
        {({ handleSubmit, submitting, pristine, form }) => (
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
            </div>

            <section className="results">
              {loading && <SectionLoader />}

              {searchState.hasSearched && (
                <React.Fragment>
                  {searchState.noResults && (
                    <Modal
                      header={
                        <span className="modalIcons">
                          <FontAwesomeIcon icon="exclamation-triangle" />
                        </span>
                      }
                      size={Modal.sizes.medium}
                      className="success"
                    >
                      <div className="cardContent">
                        <p>
                          Oops! We were unable to find the quote you were
                          looking for. Please try again or feel free to contact
                          us for support.
                        </p>
                      </div>
                      <div className="card-footer">
                        <Button
                          className={Button.constants.classNames.primary}
                          data-test="reset"
                          onClick={() => resetSearch(form)}
                        >
                          Try Again
                        </Button>
                        <Link
                          to="/searchAddress"
                          className={Button.constants.classNames.secondary}
                        >
                          New Quote
                        </Link>
                      </div>
                    </Modal>
                  )}

                  {searchState.result && searchState.invalidQuoteState && (
                    <Modal
                      header="Error Occurred"
                      size={Modal.sizes.medium}
                      className="error"
                    >
                      <div className="cardContent">
                        We apologize but this Quote has a status of{' '}
                        {searchState.result.quoteState} which is no longer
                        retrievable. For questions or edits, please contact us.
                        Provide phone and contact methods. Click Here to start a
                        new quote.
                      </div>
                      <div className="card-footer">
                        <Button
                          className={Button.constants.classNames.secondary}
                          data-test="reset"
                          onClick={() => resetSearch(form)}
                        >
                          Try Again
                        </Button>
                        <Link
                          to="/searchAddress"
                          className={Button.constants.classNames.primary}
                        >
                          Start New Quote
                        </Link>
                      </div>
                    </Modal>
                  )}

                  {searchState.result &&
                    !searchState.invalidQuoteState &&
                    quote.quoteNumber && (
                      <Redirect
                        to={`/quote/${quote.quoteNumber}/underwriting`}
                      />
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

            <section>
              {/* Quote Search Footer - combine with Address Search Footer */}
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
            </section>
          </form>
        )}
      </Form>
    </React.Fragment>
  );
};

export default QuoteSearch;