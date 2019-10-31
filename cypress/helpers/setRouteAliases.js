export const setRouteAliases = () =>
  cy
    .server()
    .route('POST', '/svc?fetchAddresses')
    .as('fetchAddress');
