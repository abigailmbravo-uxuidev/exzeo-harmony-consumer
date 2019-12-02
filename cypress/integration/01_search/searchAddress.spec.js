import { setRouteAliases } from '../../helpers/setRouteAliases';
import { KNOWN_ADDRESS, UNKNOWN_ADDRESS } from '../../fixtures';

context('Search Address', () => {
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Should return known test address successfully', () => {
    cy.visit('/FL/Flood');
    // we expect the index route to redirect to 'search'
    cy.url().should('include', '/searchAddress');
    cy.findDataTag('address')
      .type(KNOWN_ADDRESS)
      .clickSubmit();
    cy.wait('@fetchAddress').then(({ request }) => {
      expect(request.body.path.includes(KNOWN_ADDRESS));
    });
    cy.findDataTag(`result-${KNOWN_ADDRESS}`)
      .should('exist')
      .and('be.visible');
  });

  it('Should display message when address not found', () => {
    cy.visit('/FL/Flood')
      .findDataTag('address')
      .type(UNKNOWN_ADDRESS)
      .clickSubmit();
    cy.wait('@fetchAddress').then(({ request }) => {
      expect(request.body.path.includes(UNKNOWN_ADDRESS));
    });
    cy.findDataTag('no-results')
      .should('exist')
      .and('be.visible');
  });
});
