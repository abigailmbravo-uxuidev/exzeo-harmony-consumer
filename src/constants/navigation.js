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
  share: {
    path: 'share',
    order: 5,
    workflowPage: 3
  },
  summary: {
    path: 'summary',
    order: 6,
    workflowPage: 4
  },
  additionalInfo: {
    path: 'additionalInfo',
    order: 7,
    workflowPage: 5
  }
};

export const WORKFLOW_ROUTING = {
  [ROUTES.underwriting.path]: ROUTES.customize.path,
  [ROUTES.customize.path]: ROUTES.save.path,
  [ROUTES.save.path]: ROUTES.share.path,
  [ROUTES.share.path]: ROUTES.summary.path,
  [ROUTES.summary.path]: ROUTES.additionalInfo.path
};
