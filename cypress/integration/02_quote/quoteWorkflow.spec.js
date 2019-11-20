import { setRouteAliases } from '../../helpers/setRouteAliases';
import { AF3_QUOTE } from '../../fixtures';

context('Create new quote', () => {
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Should create new quote with known address', () => {
    cy.visit('/FL/Flood')
      .findDataTag('address')
      .type(AF3_QUOTE.search_query)
      .clickSubmit();
    cy.wait('@fetchAddress').then(({ request }) => {
      expect(request.body.path.includes(AF3_QUOTE.search_query));
    });
    cy.findDataTag(`result-${AF3_QUOTE.address}`).click();
    cy.wait('@createQuote').then(({ response }) => {
      expect(response.body.result.property.physicalAddress.address1).to.equal(
        AF3_QUOTE.address
      );
    });

    // Complete 'underwriting' page
    cy.wait('@underwritingQuestions').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.wrap(Object.entries(AF3_QUOTE.underwriting))
      .each(([name, value]) => {
        cy.findDataTag(`underwritingAnswers.${name}.answer_${value}`).click();
      })
      .clickSubmit('#harmony-quote');

    // Complete 'customize' page
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Initial Data');
    });
    cy.findDataTag('detail-header').within(() => {
      cy.get('h2').should('contain', '$ 312');
    });

    // TODO maybe alter the customize values and recalculate?
    cy.clickSubmit('#harmony-quote');

    // Complete 'save' page
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Initial Data');
    });
    cy.findDataTag('detail-header').within(() => {
      cy.get('h2').should('contain', '$ 312');
    });
    cy.wrap(Object.entries(AF3_QUOTE.customerInfo)).each(([field, value]) => {
      cy.findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`);
    });
    cy.clickSubmit('#harmony-quote');

    // Complete 'congrats' page
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Qualified');
    });
    cy.findDataTag('continue').click();
  });
});
