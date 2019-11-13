import React from 'react';
import store2 from 'store2';
import { quoteData } from '@exzeo/core-ui/src/@Harmony';

const INITIAL_STATE = { quote: {}, loading: false, error: null };

const QuoteContext = React.createContext();

export function useQuote() {
  const context = React.useContext(QuoteContext);

  if (!context) {
    throw new Error(`useQuote must be used within a QuoteProvider`);
  }

  const [quoteState, setState] = context;

  const setQuote = React.useCallback(
    (quoteState = INITIAL_STATE) => {
      const formattedQuote = formatQuoteForUser(quoteState.quote || {});
      setState(state => ({ ...state, ...quoteState, quote: formattedQuote }));
    },
    [setState]
  );

  // Attempt to reload quote from localStorage, if there is a quote, and
  // the quote is far enough along to have enough info to retrieve, attempt
  // to retrieve latest from service. If we have a quote, but it is not far
  // enough along, rehydrate with what we have. Otherwise, set error to
  // trigger error screen.
  const refreshQuote = quoteNumber => {
    let savedQuote = {};
    savedQuote = store2.get('quote');
    if (savedQuote && savedQuote.quoteNumber === quoteNumber) {
      if (
        savedQuote.property.physicalAddress.zip &&
        (savedQuote.policyHolders[0] || {}).lastName &&
        savedQuote.quoteNumber
      ) {
        const params = {
          quoteNumber: savedQuote.quoteNumber,
          zipCode: savedQuote.property.physicalAddress.zip,
          lastName: savedQuote.policyHolders[0].lastName
        };

        retrieveQuote(params);
      } else {
        setState(state => ({ ...state, quote: savedQuote }));
      }
    } else {
      throw new Error(
        'Unable to refresh quote. Please start over or go back to retrieve'
      );
    }
  };

  const retrieveQuote = async params => {
    try {
      setState(state => ({ ...state, loading: true }));
      const quote = await quoteData.retrieveQuote(params);
      const formattedQuote = formatQuoteForUser(quote);
      store2.set('quote', formattedQuote, true);
      setState(state => ({ ...state, quote: formattedQuote }));
    } catch (error) {
      setState(state => ({ ...state, error }));
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  };

  const createQuote = async (address, companyCode, product) => {
    try {
      setState(state => ({ ...state, loading: true }));
      const quote = await quoteData.createQuote({
        igdID: address.id,
        stateCode: address.physicalAddress.state,
        companyCode,
        product
      });

      const formattedQuote = formatQuoteForUser(quote);
      store2.set('quote', formattedQuote, true);
      setState(state => ({ ...state, quote: formattedQuote }));
    } catch (error) {
      setState(state => ({ ...state, error }));
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  };

  const updateQuote = async (data, options = {}) => {
    try {
      setState(state => ({ ...state, loading: true }));
      const updateData = formatQuoteForSubmit(data, options);

      const quote = await quoteData.updateQuote(updateData);

      const formattedQuote = formatQuoteForUser(quote);
      store2.set('quote', formattedQuote, true);
      setState(state => ({ ...state, quote: formattedQuote }));
    } catch (error) {
      setState(state => ({ ...state, error }));
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  };

  const sendApplication = async (quoteNumber, options = {}) => {
    try {
      setState(state => ({ ...state, loading: true }));
      const quote = await quoteData.verifyQuote({ quoteNumber }, options);
      if (!quote || quote.quoteState !== 'Application Ready') {
        setState(state => ({
          ...state,
          error: { message: 'Quote is not in Application Ready state' }
        }));
        return;
      }
      await quoteData.sendApplication(quoteNumber, 'docusign');
    } catch (error) {
      setState(state => ({ ...state, error }));
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  };

  return {
    quote: quoteState.quote,
    loading: quoteState.loading,
    error: quoteState.error,
    setQuote,
    createQuote,
    refreshQuote,
    retrieveQuote,
    sendApplication,
    updateQuote
  };
}

export function QuoteContextProvider(props) {
  const [quoteState, setState] = React.useState(INITIAL_STATE);
  const value = React.useMemo(() => [quoteState, setState], [quoteState]);
  return <QuoteContext.Provider value={value} {...props} />;
}

// Edit form data for quote-manager
function formatQuoteForSubmit(data, options) {
  // TODO this may not be necessary now that we are formatting the form data for quote in core-ui data layer
  return data;
}

// Edit quote for Form
function formatQuoteForUser(quoteData = {}) {
  if (!quoteData.quoteNumber) return {};
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
