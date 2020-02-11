// The pattern for QuoteContext follows: https://kentcdodds.com/blog/how-to-use-react-context-effectively
// No need to export the Context.consumer - which is clumsy to use - but export a custom hook that returns the
// 'interface' for this Context
import React, { useCallback } from 'react';
import store2 from 'store2';
import { quoteData } from '@exzeo/core-ui/src/@Harmony';

const INITIAL_STATE = { quote: {}, loading: false, error: null };

const QuoteContext = React.createContext();

export function useQuote() {
  const context = React.useContext(QuoteContext);
  if (!context) {
    throw new Error(`useQuote must be used within a QuoteProvider`);
  }
  return context;
}

export function QuoteContextProvider({ initialState, children }) {
  const [quoteState, setState] = React.useState(initialState || INITIAL_STATE);

  const setQuote = useCallback((quoteState = INITIAL_STATE) => {
    const formattedQuote = formatQuoteForUser(quoteState.quote || {});
    store2.set('quote', formattedQuote, true);
    setState(state => ({ ...state, ...quoteState, quote: formattedQuote }));
  }, []);

  // Attempt to reload quote from localStorage, if there is a quote, and
  // the quote is far enough along to have enough info to retrieve, attempt
  // to retrieve latest from service. If we have a quote, but it is not far
  // enough along, rehydrate with what we have. Otherwise, set error to
  // trigger error screen. This is almost entirely a development environment issue.
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
      const formattedQuote = formatQuoteForSubmit(data, options);

      const updatedQuote = await quoteData.updateQuote(formattedQuote);

      // On final page of workflow we need to 'verify quote' to run final underwriting and update quote state
      let quote = {};
      if (options.verifyQuote && quote.quoteState !== 'Quote Stopped') {
        quote = await quoteData.verifyQuote({
          quoteNumber: data.quoteNumber
        });
        if (!quote || quote.quoteState !== 'Application Ready') {
          setState(state => ({
            ...state,
            error: { message: 'Quote is not in Application Ready state' }
          }));
          return;
        }
      } else {
        quote = updatedQuote;
      }

      const result = formatQuoteForUser(quote);
      store2.set('quote', result, true);
      setState(state => ({ ...state, quote: result }));
    } catch (error) {
      setState(state => ({ ...state, error }));
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  };

  const sendApplication = async (quoteNumber, options = {}) => {
    try {
      setState(state => ({ ...state, loading: true }));
      await quoteData.sendApplication(quoteNumber, 'docusign');
    } catch (error) {
      setState(state => ({ ...state, error }));
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  };

  return (
    <QuoteContext.Provider
      value={{
        quote: quoteState.quote,
        loading: quoteState.loading,
        error: quoteState.error,
        setQuote,
        createQuote,
        refreshQuote,
        retrieveQuote,
        sendApplication,
        updateQuote
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

// export function QuoteContextProvider(props) {
//   const [quoteState, setState] = React.useState(
//     props.initialState || INITIAL_STATE
//   );
//   const value = React.useMemo(() => [quoteState, setState], [quoteState]);
//   return <QuoteContext.Provider value={value} {...props} />;
// }

// Edit form data for quote-manager
function formatQuoteForSubmit(data, options) {
  // TODO this may not be necessary now that we are formatting the form data for quote in core-ui data layer
  return data;
}

// Edit quote for form
function formatQuoteForUser(quoteData = {}) {
  if (!quoteData.quoteNumber) return {};
  return {
    ...quoteData,
    effectiveDate: new Date(quoteData.effectiveDate),
    policyHolderMailingAddress: quoteData.policyHolderMailingAddress || {}
  };
}
