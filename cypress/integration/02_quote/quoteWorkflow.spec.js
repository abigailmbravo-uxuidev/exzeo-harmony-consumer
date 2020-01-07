import { setRouteAliases } from '../../helpers/setRouteAliases';
import { AF3_QUOTE, CSP_BASE } from '../../fixtures';

context('Create new quote', () => {
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Should create new quote with known address', () => {
    // Search for address and create quote

    cy.visit(`${CSP_BASE}/searchAddress`)
      .findDataTag('address')
      .type(AF3_QUOTE.search_query)
      .clickSubmit();
    cy.wait('@fetchAddress').then(({ request }) => {
      expect(request.body.path.includes(AF3_QUOTE.search_query));
    });
    cy.findDataTag(`result-${AF3_QUOTE.address}`).trigger('click');
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
        cy.findDataTag(`underwritingAnswers.${name}.answer_${value}`).trigger(
          'click'
        );
      })
      .clickSubmit('#harmony-quote');

    // Complete 'customize' page
    // TODO maybe alter the customize values and recalculate?

    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Initial Data');
    });
    cy.findDataTag('detail-header').within(() => {
      cy.get('h2').should('contain', '$ 312');
    });
    cy.clickSubmit('#harmony-quote');

    // Complete 'save' page
    // TODO test the 'edit agency' typeahead

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
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Qualified');
    });

    // Complete 'congrats' page
    // TODO test 'send quote summary' and probably 'save and continue later' stuff

    // this submit does not update the quote
    cy.clickSubmit('#harmony-quote');

    // Complete 'additional insured' page
    // TODO test AI Page functionality: Add/remove some AIs

    cy.wait('@getQuestions').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.clickSubmit('#harmony-quote');

    // Complete 'policyholder' page
    // TODO add secondary policyHolder, maybe edit effective date?

    cy.wait('@getZipCodeSettings').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.findDataTag('add-address')
      .trigger('click')
      .findDataTag('mailingSameAsProperty_true')
      .trigger('click');
    cy.findDataTag('policyHolderMailingAddress.address1')
      .should('have.value', AF3_QUOTE.address)
      .findDataTag('ai-modal-submit')
      .trigger('click');
    cy.wait('@updateQuote').then(({ request, response }) => {
      expect(
        request.body.data.quote.policyHolderMailingAddress.address1
      ).to.equal(request.body.data.quote.property.physicalAddress.address1);
      expect(response.body.result.quoteInputState).to.equal('AppStarted');
    });
    cy.clickSubmit('#harmony-quote');
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('AppStarted');
    });

    // Complete 'billing' page
    // TODO test with a couple of different AI's?

    cy.wait('@getBillingOptions').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.findDataTag('billing-option_Policyholder')
      .first()
      .trigger('click');
    cy.findDataTag('payment-plan-annual').should('have.class', 'selected');
    cy.clickSubmit('#harmony-quote');
    cy.wait('@updateQuote').then(({ request, response }) => {
      expect(request.body.data.quote.billToType).to.equal('Policyholder');
      expect(request.body.data.quote.billPlan).to.equal('Annual');
      expect(response.body.result.quoteInputState).to.equal('Ready');
    });

    // Complete 'summary' page
    cy.findDataTag('confirm')
      .should('have.length', 5)
      .each($el => {
        $el.trigger('click');
        // there are currently 5 sections that the user must review and confirm
      })
      .findDataTag('confirmed')
      .should('have.length', 5)
      .clickSubmit('#harmony-quote');
    cy.clickSubmit('.modal');
    cy.wait('@verifyQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Ready');
    });
    cy.wait('@sendApplication').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Ready');
    });

    // 'complete' page.
    // for now just making sure we ended up on the 'complete/congrats' page.
    cy.findDataTag('quote-complete');
  });
});
