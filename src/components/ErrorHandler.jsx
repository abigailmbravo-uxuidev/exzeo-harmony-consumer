import React from 'react';
import { useQuote } from 'modules/Quote';
import Error from 'components/Error';

const ErrorHandler = () => {
  const { error } = useQuote();
  return error ? <Error error={error} /> : null;
};

export default ErrorHandler;
