import React from 'react';
import store2 from 'store2';
import { quoteData } from '@exzeo/core-ui/src/@Harmony';

const QuoteContext = React.createContext();

export function useQuote() {
  const context = React.useContext(QuoteContext);
  const [loading, setLoading] = React.useState(false);

  if (!context) {
    throw new Error(`useQuote must be used within a QuoteProvider`);
  }

  const [quote, setQuote] = context;

  const retrieveQuote = async params => {
    try {
      setLoading(true);

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
            setQuote(savedQuote);
            return;
          }
        } else {
          throw Error('Unable to retrieve quote.');
        }
      } else {
        retrieveParams = params;
      }

      const quote = await quoteData.retrieveQuote(retrieveParams);
      const formattedQuote = formatQuoteForUser(quote);
      store2.set('quote', formattedQuote, true);
      setQuote(formattedQuote);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createQuote = async (address, companyCode, product) => {
    try {
      setLoading(true);
      const quote = await quoteData.createQuote({
        igdID: address.id,
        stateCode: address.physicalAddress.state,
        companyCode,
        product
      });

      const formattedQuote = formatQuoteForUser(quote);
      store2.set('quote', formattedQuote, true);
      setQuote(formattedQuote);
    } catch (error) {
      throw Error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuote = async (data, options = {}) => {
    try {
      setLoading(true);
      const updateData = formatQuoteForSubmit(data, options);

      const quote = await quoteData.updateQuote(updateData);

      const formattedQuote = formatQuoteForUser(quote);
      store2.set('quote', formattedQuote, true);
      setQuote(formattedQuote);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendApplication = async (quoteNumber, options = {}) => {
    try {
      setLoading(true);
      const quote = await quoteData.verifyQuote({ quoteNumber }, options);
      if (!quote || quote.quoteState !== 'Application Ready') {
        throw new Error('Quote is not in Application Ready state');
      }
      await quoteData.sendApplication(quoteNumber, 'docusign');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const setQuoteForUser = quote => {
    const formattedQuote = formatQuoteForUser(quote);
    setQuote(formattedQuote);
  };

  return {
    quote,
    setQuote,
    loading,
    createQuote,
    retrieveQuote,
    setQuoteForUser,
    updateQuote,
    sendApplication
  };
}

export function QuoteContextProvider(props) {
  const [quote, setQuote] = React.useState({});
  const value = React.useMemo(() => [quote, setQuote], [quote]);
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
