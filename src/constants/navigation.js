export const ROUTES = {
  retrieveQuote: {
    path: '/retrieveQuote',
    order: 0
  },
  searchAddress: {
    path: '/searchAddress',
    order: 1
  },
  workflow: {
    path: '/quote/:quoteNumber/:step',
    order: null
  },
  underwriting: {
    path: 'underwriting',
    order: 2,
    workflowPage: 0
  },
  customize: {
    path: 'customize',
    order: 3,
    workflowPage: 1
  },
  save: {
    path: 'save',
    order: 4,
    workflowPage: 2
  },
  summary: {
    path: 'summary',
    order: 5,
    workflowPage: 3
  }
};

export const WORKFLOW_ROUTING = {
  [ROUTES.underwriting.path]: ROUTES.customize.path,
  [ROUTES.customize.path]: ROUTES.save.path,
  [ROUTES.save.path]: ROUTES.summary.path
};
