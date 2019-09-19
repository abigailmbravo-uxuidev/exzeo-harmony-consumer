import React from 'react';
import { quoteData } from '@exzeo/harmony-core';
import { formatDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';
import { ROUTES } from 'constants/navigation';

const QuoteContext = React.createContext();

export function useQuote() {
  const context = React.useContext(QuoteContext);
  const [loading, setLoading] = React.useState(false);

  if (!context) {
    throw new Error(`useQuote must be used within a QuoteProvider`);
  }

  const [quote, setQuote] = context;

  const retrieveQuote = async (quoteNumber, lastName, zipCode, email) => {
    try {
      setLoading(true);
      const params = {
        lastName,
        zipCode,
        email,
        quoteNumber
      };

      // TODO for now only searching by quoteNumber, expecting one quote to return, but we will be adding the ability to search by email, which could result in multiple quotes...
      const quote = await quoteData.retrieveQuote(params);
      const formattedQuote = formatQuoteForUser(quote);
      setQuote(formattedQuote);
    } catch (error) {
      throw Error(error);
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
      setQuote(formattedQuote);
    } catch (error) {
      throw Error('Error creating quote');
    } finally {
      setLoading(false);
    }
  };

  const updateQuote = async (data, options) => {
    try {
      setLoading(true);
      const updateData = formatQuoteForSubmit(data, options);

      const quote = await quoteData.updateQuote(updateData);

      const formattedQuote = formatQuoteForUser(quote);
      setQuote(formattedQuote);
    } catch (error) {
      throw Error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    quote,
    setQuote,
    loading,
    createQuote,
    retrieveQuote,
    updateQuote
  };
}

export function QuoteContextProvider(props) {
  const [quote, setQuote] = React.useState({});
  const value = React.useMemo(() => [quote, setQuote], [quote]);
  return <QuoteContext.Provider value={value} {...props} />;
}

// Edit form data for quote-manager
function formatQuoteForSubmit(data, options) {
  if (options.workflowPage === ROUTES.save.workflowPage) {
    data.policyHolders[0].electronicDelivery = false;
    data.policyHolders[0].order = 0;
    data.policyHolders[0].entityType = 'Person';
  }

  return data;
}

// Edit quote for Form
function formatQuoteForUser(quoteData) {
  quoteData.effectiveDate = formatDate(
    quoteData.effectiveDate,
    FORMATS.SECONDARY
  );

  // if (quoteData.policyHolders[1] && quoteData.policyHolders[1].firstName) {
  //   quoteData.additionalPolicyholder = true;
  // }

  // if (quoteData.product === 'AF3') {
  //   quoteData.personalPropertySlider = Math.ceil(
  //     (quoteData.coverageLimits.personalProperty.amount * 100) /
  //     quoteData.coverageLimits.building.amount
  //   );
  //   return quoteData;
  // }

  return quoteData;
}
