import { setRouteAliases } from '../../helpers/setRouteAliases';

const knownAddress = '4131 TEST ADDRESS';
const unknownAddress = '7414 E Swoope St';

context('Search Address', () => {
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Should return known test address successfully', () => {
    cy.visit('/')
      .findDataTag('address')
      .type(knownAddress)
      .clickSubmit();
    cy.wait('@fetchAddress').then(({ request }) => {
      expect(request.body.path.includes(knownAddress));
    });
    cy.findDataTag(`result-${knownAddress}`)
      .should('exist')
      .and('be.visible');
  });

  it('Should display message when address not found', () => {
    cy.visit('/')
      .findDataTag('address')
      .type(unknownAddress)
      .clickSubmit();
    cy.wait('@fetchAddress').then(({ request }) => {
      expect(request.body.path.includes(unknownAddress));
    });
    cy.findDataTag('no-results')
      .should('exist')
      .and('be.visible');
  });
});
