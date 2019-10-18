import React from 'react';

import UnderwritingReview from 'components/UnderwritingReview.jsx';
import UnderwritingFatal from 'components/UnderwritingFatal';

const UnderwritingExceptions = ({ hasException, hasError }) => {
  if (!(hasException || hasError)) {
    return null;
  }

  return (
    <div className="underwritingExceptions">
      {hasException && <UnderwritingReview />}

      {hasError && <UnderwritingFatal />}
    </div>
  );
};

export default UnderwritingExceptions;
