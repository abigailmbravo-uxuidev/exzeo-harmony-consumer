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
  invalidQuoteState: false,
  noResults: false,
  result: undefined
};

const SearchByQuoteNumber = ({ cspMatch, csp }) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { quote, setQuote } = useQuote();

  useEffect(() => {
    if (state.hasSearched && !state.noResults && !state.invalidQuoteState) {
      setQuote({ quote: state.result });
    }
  }, [
    state.hasSearched,
    state.invalidQuoteState,
    state.noResults,
    state.result,
    setQuote
  ]);

  async function handleSearchSubmit({
    lastName,
    zipCode,
    quoteNumber,
    companyCode,
    state,
    product
  }) {
    try {
      setLoading(true);
      if (state.hasSearched) {
        setState(initialState);
      }

      const quote = await quoteData.retrieveQuote({
        lastName,
        zipCode,
        quoteNumber
      });
      const quoteFound =
        quote &&
        quote.quoteNumber &&
        quote.companyCode === companyCode &&
        quote.state === state &&
        quote.product === product;

      setState({
        result: quote,
        hasSearched: true,
        noResults: !quoteFound,
        invalidQuoteState:
          quoteFound && !VALID_QUOTE_STATES.includes(quote.quoteState)
      });
    } catch (error) {
      if (error.status >= 400) {
        setState({
          hasSearched: true,
          invalidQuoteState: false,
          noResults: true,
          result: undefined
        });
      }
    } finally {
      setLoading(false);
    }
  }

  function resetSearch(form) {
    form.reset();
    setState(initialState);
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
                name="zipCode"
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

              {state.hasSearched && (
                <React.Fragment>
                  {state.noResults && (
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

                  {state.invalidQuoteState && (
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

                  {!state.invalidQuoteState && quote.quoteNumber && (
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
