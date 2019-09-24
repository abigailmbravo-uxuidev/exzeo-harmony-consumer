export const ROUTES = {
  workflow: {
    path: '/quote/:quoteNumber/:step',
    order: null,
    label: null
  },
  retrieveQuote: {
    path: '/retrieveQuote',
    order: 0,
    label: 'Retrieve'
  },
  searchAddress: {
    path: '/searchAddress',
    order: 1,
    label: 'Search'
  },
  underwriting: {
    path: 'underwriting',
    order: 2,
    workflowPage: 0,
    label: 'Underwriting'
  },
  customize: {
    path: 'customize',
    order: 3,
    workflowPage: 1,
    label: 'Customize'
  },
  save: {
    path: 'save',
    order: 4,
    workflowPage: 2,
    label: 'Save'
  },
  share: {
    path: 'share',
    order: 5,
    workflowPage: 3,
    label: 'Share'
  },
  additionalInfo: {
    path: 'additionalInfo',
    order: 6,
    workflowPage: 4,
    label: 'Additional Info'
  },
  policyholder: {
    path: 'policyholder',
    order: 7,
    workflowPage: 5,
    label: 'Policyholder Info'
  },
  billing: {
    path: 'billing',
    order: 8,
    workflowPage: 6,
    label: 'Billing Info'
  },
  summary: {
    path: 'summary',
    order: 9,
    workflowPage: 7,
    label: 'Summary'
  },
  complete: {
    path: 'complete',
    order: 10,
    workflowPage: 8,
    label: 'You Win!'
  }
};

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
