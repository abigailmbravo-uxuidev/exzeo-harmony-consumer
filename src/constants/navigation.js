export const ROUTES = {
  retrieveQuote: {
    path: '/retrieveQuote',
    order: 0,
    label: 'Retrieve'
  },
  searchAddress: {
    path: '/searchAddress',
    order: 1,
    label: 'Search Address'
  },
  workflow: {
    path: '/quote/:quoteNumber/:step',
    order: null
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
    label: 'Customize Quote'
  },
  save: {
    path: 'save',
    order: 4,
    workflowPage: 2,
    label: 'Save Quote'
  },
  share: {
    path: 'share',
    order: 5,
    workflowPage: 3,
    label: 'Share Quote'
  },
  additionalInfo: {
    path: 'additionalInfo',
    order: 6,
    workflowPage: 4
  }
};

export const WORKFLOW_ROUTING = {
  [ROUTES.underwriting.path]: ROUTES.customize.path,
  [ROUTES.customize.path]: ROUTES.save.path,
  [ROUTES.save.path]: ROUTES.share.path,
  [ROUTES.share.path]: ROUTES.additionalInfo.path
};
