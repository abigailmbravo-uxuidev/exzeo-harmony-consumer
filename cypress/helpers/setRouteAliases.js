export const setRouteAliases = () =>
  cy
    .server()
    .route('POST', '/svc?fetchAddresses')
    .as('fetchAddress')
    .route('POST', '/svc?quoteManager.createQuote')
    .as('createQuote')
    .route('POST', '/svc?quoteManager.updateQuote')
    .as('updateQuote')
    .route('POST', '/svc?UWQuestions')
    .as('underwritingQuestions');
