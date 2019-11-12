import React from 'react';
import Error from 'components/Error';

const QuoteUpdateError = ({ error }) => {
  // TODO depending on the error, show different views/instructions. For now, reusing the Error view.
  return <Error error={error} />;
};

export default QuoteUpdateError;
