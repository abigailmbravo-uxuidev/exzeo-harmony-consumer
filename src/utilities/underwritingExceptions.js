import { ROUTES } from 'constants/navigation';
import { EXCEPTION_TYPES } from 'constants/underwriting';

export function hasUnderwritingExceptions(
  workflowPage,
  underwritingExceptions = []
) {
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
