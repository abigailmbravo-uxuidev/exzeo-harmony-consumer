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
} from '@exzeo/core-ui';
import { quoteData } from '@exzeo/core-ui/src/@Harmony';

import { ROUTES } from 'constants/navigation';
import { VALID_QUOTE_STATES } from 'constants/quote';
import { useQuote } from 'context/QuoteContext';
import ContactPhoneAnchor from 'components/ContactPhoneAnchor';
import ContactEmailAnchor from 'components/ContactEmailAnchor';
import TypTapLink from 'components/TypTapLink';
import Footer from './Footer';

const initialState = {
  hasSearched: false,
  result: undefined,
  noResults: false,
  invalidQuoteState: false
};

const SearchByQuoteNumber = ({ cspMatch, csp }) => {
  const [searchState, setSearchState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { quote, setQuote } = useQuote();

  useEffect(() => {
    if (
      searchState.hasSearched &&
      !searchState.noResults &&
      !searchState.invalidQuoteState
    ) {
      setQuote({ quote: searchState.result });
    }
  }, [searchState, setQuote]);

  async function handleSearchSubmit(values) {
    try {
      if (searchState.hasSearched) {
        setSearchState(initialState);
      }

      setLoading(true);
      const results = await quoteData.searchQuotes(values);
      const result = results?.quotes[0] || {};
      const quoteFound = result.quoteNumber === values.quoteNumber;

      setSearchState({
        hasSearched: true,
        result: result.quotes[0],
        noResults: !quoteFound,
        invalidQuoteState:
          quoteFound && !VALID_QUOTE_STATES.includes(result.quoteState)
      });
    } catch (error) {
      if (error.status >= 400) {
        setSearchState({
          hasSearched: true,
          result: undefined,
          noResults: true,
          invalidQuoteState: false
        });
      }
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
      <Form
        onSubmit={handleSearchSubmit}
        initialValues={csp}
        subscription={{ pristine: true, submitting: true }}
      >
        {({ handleSubmit, submitting, pristine, form }) => (
          <form onSubmit={handleSubmit} className="retrieveQuoteForm">
            <div className="retrieveQuoteWrapper">
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
                    placeholder="TTIC-AF3-XXXXXX-X or 12-XXXXXXX-X"
                  />
                )}
              </Field>

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
                name="zip"
                validate={composeValidators([
                  validation.isRequired,
                  validation.validateZipCode
                ])}
              >
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    type="text"
                    styleName="required"
                    label="Property ZIP Code"
                    dataTest="zipCode"
                    placeholder="Property ZIP Code"
                  />
                )}
              </Field>
            </div>

            <section className="results">
              {loading && <SectionLoader />}

              {searchState.hasSearched && (
                <React.Fragment>
                  {searchState.noResults && (
                    <Modal
                      header={
                        <React.Fragment>
                          <h4>Oops! We're Sorry</h4>
                          <a onClick={() => resetSearch(form)}>
                            <FontAwesomeIcon icon="times" />
                          </a>
                        </React.Fragment>
                      }
                      size={Modal.sizes.small}
                      className="error"
                    >
                      <div className="card-block">
                        <p>
                          We were unable to find the quote you were looking for.
                          Please try again or feel free to contact us for
                          support.
                        </p>
                      </div>
                      <div className="card-footer">
                        <Link
                          to={`${cspMatch}/searchAddress`}
                          className={Button.constants.classNames.secondary}
                        >
                          Start New Quote
                        </Link>
                        <Button
                          className={Button.constants.classNames.primary}
                          data-test="reset"
                          onClick={() => resetSearch(form)}
                        >
                          Try Again
                        </Button>
                      </div>
                    </Modal>
                  )}

                  {searchState.invalidQuoteState && (
                    <Modal
                      size={Modal.sizes.small}
                      className="error"
                      header={<h4>Quote Can't Be Retrieved</h4>}
                    >
                      <div className="card-block">
                        <p>
                          We apologize, this quote can no longer be retrieved or
                          edited. For questions or edits, please contact us.
                        </p>
                        <div className="congratsCardFooter">
                          <ContactPhoneAnchor />
                          <ContactEmailAnchor />
                          <TypTapLink />
                        </div>
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
                          to={`${cspMatch}/searchAddress`}
                          className={Button.constants.classNames.primary}
                        >
                          Start New Quote
                        </Link>
                      </div>
                    </Modal>
                  )}

                  {!searchState.invalidQuoteState && quote.quoteNumber && (
                    <Redirect
                      to={`${cspMatch}/quote/${quote.quoteNumber}/${ROUTES.underwriting.path}`}
                    />
                  )}
                </React.Fragment>
              )}
            </section>

            <section>
              <Footer submitting={submitting} pristine={pristine} />
            </section>
          </form>
        )}
      </Form>
    </React.Fragment>
  );
};

export default SearchByQuoteNumber;
