import React from 'react';
import _cloneDeep from 'lodash.clonedeep';
import { quoteData } from '@exzeo/harmony-core';
import {
  formatToUTC,
  formatDate,
  FORMATS
} from '@exzeo/core-ui/src/Utilities/date';
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
      setQuote(formattedQuote);
    } catch (error) {
      throw Error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendApplication = async (quoteNumber, options = {}) => {
    try {
      setLoading(true);
      const quote = await quoteData.verifyQuote({ quoteNumber }, options);
      if (quote.quoteState !== 'Application Ready') {
        throw new Error('Quote is not in Apllcation Ready state');
      }
      await quoteData.sendApplication(quoteNumber, 'docusign');
    } catch (error) {
      throw Error(error);
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
  const quote = _cloneDeep(data);

  quote.effectiveDate = formatToUTC(
    formatDate(data.effectiveDate, FORMATS.SECONDARY),
    data.property.timezone
  );

  if (options.workflowPage === ROUTES.save.workflowPage) {
    quote.policyHolders[0].electronicDelivery = false;
    quote.policyHolders[0].order = 0;
    quote.policyHolders[0].entityType = 'Person';
  }

  return quote;
}

// Edit quote for Form
function formatQuoteForUser(quoteData) {
  return {
    ...quoteData,
    effectiveDate: new Date(quoteData.effectiveDate),
    policyHolderMailingAddress: quoteData.policyHolderMailingAddress || {},
    sameAsPropertyAddress:
      quoteData.property.physicalAddress.address1 ===
        quoteData.policyHolderMailingAddress.address1 &&
      quoteData.property.physicalAddress.city ===
        quoteData.policyHolderMailingAddress.city
  };

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
}
