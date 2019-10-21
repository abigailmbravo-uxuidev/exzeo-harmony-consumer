import React, { useMemo } from 'react';

import UnderwritingReview from 'components/UnderwritingReview.jsx';
import UnderwritingFatal from 'components/UnderwritingFatal';
import { ROUTES } from 'constants/navigation';
import { EXCEPTION_TYPES } from 'constants/underwriting';

function hasUnderwritingExceptions(workflowPage, underwritingExceptions) {
  const hasException =
    (workflowPage === ROUTES.share.workflowPage &&
      underwritingExceptions.some(
        ex => ex.action === EXCEPTION_TYPES.review
      )) ||
    (workflowPage === ROUTES.summary.workflowPage &&
      underwritingExceptions.some(ex => ex.action !== EXCEPTION_TYPES.info));

  const hasError =
    !hasException &&
    (workflowPage === ROUTES.underwriting.workflowPage ||
      workflowPage === ROUTES.customize.workflowPage ||
      workflowPage === ROUTES.save.workflowPage) &&
    underwritingExceptions.some(ex => ex.action === EXCEPTION_TYPES.fatal);

  return {
    hasException,
    hasError
  };
}

const UnderwritingExceptions = ({
  workflowPage,
  underwritingExceptions = []
}) => {
  const { hasError, hasException } = useMemo(
    () => hasUnderwritingExceptions(workflowPage, underwritingExceptions),
    [workflowPage, underwritingExceptions]
  );

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
