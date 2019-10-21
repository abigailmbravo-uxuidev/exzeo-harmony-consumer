import { setRouteAliases } from '../../helpers/setRouteAliases';

const address = '4131 TEST ADDRESS';

context('Search Address', () => {
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Should return known test address successfully', () => {
    cy.visit('/')
      .findDataTag('address')
      .type(address)
      .clickSubmit()
      .findDataTag(`result-${address}`)
      .should('exist')
      .and('be.visible');
  });
});
