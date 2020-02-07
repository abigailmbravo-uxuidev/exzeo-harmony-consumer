import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Form,
  SectionLoader,
  Modal,
  composeValidators,
  Field,
  Input,
  validation
} from '@exzeo/core-ui';
import { quoteData } from '@exzeo/core-ui/src/@Harmony';

import { ROUTES } from 'constants/navigation';
import { useQuote } from 'context/QuoteContext';

import QuoteCard from './QuoteCard';
import Footer from './Footer';

const initialState = {
  hasSearched: false,
  results: [],
  noResults: false
};

const SearchByEmail = ({ cspMatch, history, csp }) => {
  const [searchState, setSearchState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState();
  const { retrieveQuote } = useQuote();

  async function handleSearchSubmit(values) {
    try {
      setLoading(true);
      const response = await quoteData.searchQuotes(values);
      // Have to keep this around for when use selects a quote from list
      setUserState({
        zipCode: values.zip, // TODO change this to zip after HAR-8545 is complete
        lastName: values.lastName
      });
      setSearchState({
        hasSearched: true,
        results: response.quotes,
        noResults: !response.quotes || response.quotes.length < 0
      });
    } catch (error) {
      if (error.status >= 400) {
        setSearchState({
          hasSearched: true,
          results: [],
          noResults: true
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

  async function handleQuoteSelection(quoteNumber) {
    await retrieveQuote({ ...userState, quoteNumber });
    history.push(
      `${cspMatch}/quote/${quoteNumber}/${ROUTES.underwriting.path}`
    );
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
                name="emailAddress"
                validate={composeValidators([
                  validation.isRequired,
                  validation.isEmail
                ])}
              >
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    styleName="required"
                    label="Email"
                    dataTest="email"
                    placeholder="jsmith@email.com"
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
                  {searchState.noResults ? (
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
                  ) : (
                    <React.Fragment>
                      <p>{`We found a total of ${searchState.results.length} matching quotes! Please select one: `}</p>
                      {searchState.results.map(quote => (
                        <QuoteCard
                          key={quote.quoteNumber}
                          quote={quote}
                          handleClick={handleQuoteSelection}
                        />
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </section>

            <section>
              <div className="form-footer">
                <Footer submitting={submitting} pristine={pristine} />
              </div>
            </section>
          </form>
        )}
      </Form>
    </React.Fragment>
  );
};

export default SearchByEmail;
