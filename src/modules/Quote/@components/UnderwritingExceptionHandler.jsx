import React, { useMemo } from 'react';

import UnderwritingReview from 'components/UnderwritingReview.jsx';
import UnderwritingFatal from 'components/UnderwritingFatal';
import { hasUnderwritingExceptions } from 'utilities/underwritingExceptions';

const UnderwritingExceptionHandler = ({ workflowPage, quote }) => {
  const { hasError, hasException } = useMemo(
    () => hasUnderwritingExceptions(workflowPage, quote.underwritingExceptions),
    [workflowPage, quote.underwritingExceptions]
  );

  if (!(hasException || hasError)) {
    return null;
  }

  return (
    <div className="underwritingExceptions">
      {hasException && <UnderwritingReview quote={quote} />}

      {hasError && <UnderwritingFatal />}
    </div>
  );
};

export default UnderwritingExceptionHandler;
