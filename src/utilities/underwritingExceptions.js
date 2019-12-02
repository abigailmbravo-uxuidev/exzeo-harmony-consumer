import { ROUTES } from 'constants/navigation';
import {
  EXCEPTION_TYPES,
  SHOW_FATAL_EXCEPTIONS_PAGES
} from 'constants/underwriting';

export function hasUnderwritingExceptions(
  workflowPage,
  underwritingExceptions = []
) {
  const hasException =
    (workflowPage === ROUTES.share.workflowPage &&
      underwritingExceptions.some(
        ex => ex.action === EXCEPTION_TYPES.review && !ex.overridden
      )) ||
    (workflowPage === ROUTES.summary.workflowPage &&
      underwritingExceptions.some(
        ex => ex.action !== EXCEPTION_TYPES.info && !ex.overridden
      ));

  const hasError =
    !hasException &&
    underwritingExceptions.some(
      ex => ex.action === EXCEPTION_TYPES.fatal && !ex.overridden
    ) &&
    SHOW_FATAL_EXCEPTIONS_PAGES.some(page => page === workflowPage);

  return {
    hasException,
    hasError
  };
}
