export const setRouteAliases = () =>
  cy
    .server()
    .route('POST', '/svc?fetchAddresses')
    .as('fetchAddress')
    .route('POST', '/svc?quoteManager.createQuote')
    .as('createQuote')
    .route('POST', '/svc?quoteManager.updateQuote')
    .as('updateQuote')
    .route('POST', '/svc?quoteManager.reviewQuote')
    .as('reviewQuote')
    .route('POST', '/svc?quoteManager.retrieveQuote')
    .as('retrieveQuote')
    .route('POST', '/svc?getBillingOptions')
    .as('getBillingOptions')
    .route('POST', '/svc?UWQuestions')
    .as('underwritingQuestions')
    .route('POST', 'questions')
    .as('getQuestions');
