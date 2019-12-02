import { ROUTES } from 'constants/navigation';

export const EXCEPTION_TYPES = {
  info: 'Informational',
  missingInfo: 'Missing Info',
  review: 'Underwriting Review',
  fatal: 'Fatal Error'
};

export const SHOW_FATAL_EXCEPTIONS_PAGES = [
  ROUTES.underwriting.workflowPage,
  ROUTES.customize.workflowPage,
  ROUTES.save.workflowPage,
  ROUTES.share.workflowPage
];
