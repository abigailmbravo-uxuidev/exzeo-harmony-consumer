import React from 'react';
import store2 from 'store2';
import { quoteData } from '@exzeo/core-ui/src/@Harmony';

const QuoteContext = React.createContext();

export function useQuote() {
  const context = React.useContext(QuoteContext);

  if (!context) {
    throw new Error(`useQuote must be used within a QuoteProvider`);
  }

  const [quoteState, setQuoteState] = context;

  const retrieveQuote = async params => {
    try {
      setQuoteState(state => ({ ...state, loading: true }));

      let savedQuote = {};
      let retrieveParams = {};

      if (!params) {
        savedQuote = store2.get('quote');
        if (savedQuote) {
          if (
            savedQuote.property.physicalAddress.zip &&
            (savedQuote.policyHolders[0] || {}).lastName &&
            savedQuote.quoteNumber
          ) {
            retrieveParams = {
              quoteNumber: savedQuote.quoteNumber,
              zipCode: savedQuote.property.physicalAddress.zip,
              lastName: savedQuote.policyHolders[0].lastName
            };
          } else {
            setQuoteState(state => ({ ...state, quote: savedQuote }));
            return;
          }
        } else {
          setQuoteState(state => ({
            ...state,
            error: { message: 'Unable to retrieve quote.' }
          }));
        }
      } else {
        retrieveParams = params;
      }

      const quote = await quoteData.retrieveQuote(retrieveParams);
      const formattedQuote = formatQuoteForUser(quote);
      store2.set('quote', formattedQuote, true);
      setQuoteState(state => ({ ...state, quote: formattedQuote }));
    } catch (error) {
      setQuoteState(state => ({ ...state, error }));
    } finally {
      setQuoteState(state => ({ ...state, loading: false }));
    }
  };

  const createQuote = async (address, companyCode, product) => {
    try {
      setQuoteState(state => ({ ...state, loading: true }));
      const quote = await quoteData.createQuote({
        igdID: address.id,
        stateCode: address.physicalAddress.state,
        companyCode,
        product
      });

      const formattedQuote = formatQuoteForUser(quote);
      store2.set('quote', formattedQuote, true);
      setQuoteState(state => ({ ...state, quote: formattedQuote }));
    } catch (error) {
      setQuoteState(state => ({ ...state, error }));
    } finally {
      setQuoteState(state => ({ ...state, loading: false }));
    }
  };

  const updateQuote = async (data, options = {}) => {
    try {
      setQuoteState(state => ({ ...state, loading: true }));
      const updateData = formatQuoteForSubmit(data, options);

      const quote = await quoteData.updateQuote(updateData);

      const formattedQuote = formatQuoteForUser(quote);
      store2.set('quote', formattedQuote, true);
      setQuoteState(state => ({ ...state, quote: formattedQuote }));
    } catch (error) {
      setQuoteState(state => ({ ...state, error }));
    } finally {
      setQuoteState(state => ({ ...state, loading: false }));
    }
  };

  const sendApplication = async (quoteNumber, options = {}) => {
    try {
      setQuoteState(state => ({ ...state, loading: true }));
      const quote = await quoteData.verifyQuote({ quoteNumber }, options);
      if (!quote || quote.quoteState !== 'Application Ready') {
        setQuoteState(state => ({
          ...state,
          error: { message: 'Quote is not in Application Ready state' }
        }));
        return;
      }
      await quoteData.sendApplication(quoteNumber, 'docusign');
    } catch (error) {
      setQuoteState(state => ({ ...state, error }));
    } finally {
      setQuoteState(state => ({ ...state, loading: false }));
    }
  };

  const setQuoteForUser = quote => {
    const formattedQuote = formatQuoteForUser(quote);
    setQuoteState(state => ({ ...state, quote: formattedQuote }));
  };

  const setQuote = React.useCallback(
    quote => {
      setQuoteState(state => ({ ...state, quote }));
    },
    [setQuoteState]
  );

  return {
    quote: quoteState.quote,
    setQuote,
    loading: quoteState.loading,
    error: quoteState.error,
    createQuote,
    retrieveQuote,
    setQuoteForUser,
    updateQuote,
    sendApplication
  };
}

export function QuoteContextProvider(props) {
  const [quoteState, setQuoteState] = React.useState({
    quote: {},
    error: null,
    loading: false
  });
  const value = React.useMemo(() => [quoteState, setQuoteState], [quoteState]);
  return <QuoteContext.Provider value={value} {...props} />;
}

// Edit form data for quote-manager
function formatQuoteForSubmit(data, options) {
  // TODO this may not be necessary now that we are formatting the form data for quote in core-ui data layer
  return data;
}

// Edit quote for Form
function formatQuoteForUser(quoteData) {
  if (!quoteData) return {};
  return {
    ...quoteData,
    effectiveDate: new Date(quoteData.effectiveDate),
    policyHolderMailingAddress: quoteData.policyHolderMailingAddress || {},
    sameAsPropertyAddress:
      quoteData.property.physicalAddress.address1 ===
        (quoteData.policyHolderMailingAddress || {}).address1 &&
      quoteData.property.physicalAddress.city ===
        (quoteData.policyHolderMailingAddress || {}).city
  };
}
