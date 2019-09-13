import React from 'react';
import { createQuote } from '@exzeo/harmony-core';

const QuoteContext = React.createContext();

export function useQuote() {
  const context = React.useContext(QuoteContext);
  const [loading, setLoading] = React.useState(false);

  if (!context) {
    throw new Error(`useQuote must be used within a QuoteProvider`);
  }

  const [quote, setQuote] = context;

  const startQuote = async (address, companyCode, product) => {
    try {
      setLoading(true);
      const quote = await createQuote({
        igdID: address.id,
        stateCode: address.physicalAddress.state,
        companyCode,
        product
      });
      setQuote(quote);
    } catch (error) {
      throw Error('Error creating quote');
    } finally {
      setLoading(false);
    }
  };

  return {
    quote,
    loading,
    startQuote
  };
}

export function QuoteContextProvider(props) {
  const [quote, setQuote] = React.useState(null);
  const value = React.useMemo(() => [quote, setQuote], [quote]);
  return <QuoteContext.Provider value={value} {...props} />;
}
