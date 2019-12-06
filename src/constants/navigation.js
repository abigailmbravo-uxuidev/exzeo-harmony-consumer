export const CSP_CONTEXT_PARAMS = '/:companyCode/:state/:product';

export const ROUTES = {
  retrieveQuote: {
    key: 'retrieve',
    path: `${CSP_CONTEXT_PARAMS}/retrieveQuote`,
    order: 0,
    label: 'Retrieve'
  },
  searchAddress: {
    key: 'search',
    path: `${CSP_CONTEXT_PARAMS}/searchAddress`,
    order: 1,
    label: 'Search'
  },
  thankYou: {
    key: 'thankYou',
    path: `${CSP_CONTEXT_PARAMS}/thankYou`,
    order: null,
    label: null
  },
  workflow: {
    key: 'workflow',
    path: `${CSP_CONTEXT_PARAMS}/quote/:quoteNumber/:step`,
    order: null,
    label: null
  },
  underwriting: {
    key: 'underwriting',
    path: 'underwriting',
    order: 2,
    workflowPage: 0,
    label: 'Underwriting'
  },
  customize: {
    key: 'customize',
    path: 'customize',
    order: 3,
    workflowPage: 1,
    label: 'Customize'
  },
  save: {
    key: 'save',
    path: 'save',
    order: 4,
    workflowPage: 2,
    label: 'Save'
  },
  share: {
    key: 'share',
    path: 'share',
    order: 5,
    workflowPage: 3,
    label: 'Congrats!'
  },
  additionalInfo: {
    key: 'additionalInfo',
    path: 'additionalInfo',
    order: 6,
    workflowPage: 4,
    label: 'Additional Insured'
  },
  policyholder: {
    key: 'policyholder',
    path: 'policyholder',
    order: 7,
    workflowPage: 5,
    label: 'Policyholder Info'
  },
  billing: {
    key: 'billing',
    path: 'billing',
    order: 8,
    workflowPage: 6,
    label: 'Billing Info'
  },
  summary: {
    key: 'summary',
    path: 'summary',
    order: 9,
    workflowPage: 7,
    label: 'Summary'
  },
  complete: {
    key: 'complete',
    path: 'complete',
    order: 10,
    workflowPage: 8,
    label: 'You Win!'
  }
};

export const NAV_BAR_MATCH_ROUTES = [
  ROUTES.searchAddress.path,
  ROUTES.retrieveQuote.path,
  ROUTES.workflow.path,
  ROUTES.thankYou.path
];

export const WORKFLOW_ROUTING = {
  [ROUTES.underwriting.path]: ROUTES.customize.path,
  [ROUTES.customize.path]: ROUTES.save.path,
  [ROUTES.save.path]: ROUTES.share.path,
  [ROUTES.share.path]: ROUTES.additionalInfo.path,
  [ROUTES.additionalInfo.path]: ROUTES.policyholder.path,
  [ROUTES.policyholder.path]: ROUTES.billing.path,
  [ROUTES.billing.path]: ROUTES.summary.path,
  [ROUTES.summary.path]: ROUTES.complete.path
};
