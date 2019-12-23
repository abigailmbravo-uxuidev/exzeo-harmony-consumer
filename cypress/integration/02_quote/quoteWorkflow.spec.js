import { setRouteAliases } from '../../helpers/setRouteAliases';
import { AF3_QUOTE, CSP_BASE } from '../../fixtures';
import { envelopeIdCheck } from '../../helpers/requests';

context('Create new quote', () => {
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Should create new quote with known address', () => {
    // Search for address and create quote
    cy.visit(`${CSP_BASE}/searchAddress`)
      .findDataTag('address')
      .type(AF3_QUOTE.search_query)
      .clickSubmit()
      .wait('@fetchAddress')
      .then(({ request }) => {
        expect(request.body.path.includes(AF3_QUOTE.search_query));
      });
    cy.findDataTag(`result-${AF3_QUOTE.address}`)
      .trigger('click')
      .wait('@createQuote')
      .then(({ response }) => {
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
    cy.log('[LOG] Notes / Customize page: Verify header content');
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Initial Data');
      const premium = response.body.result.rating.totalPremium;
      cy.findDataTag('detail-header').within(() => {
        cy.get('h2>strong').should('not.have.text', '$ --');
      });
      cy.log('[LOG] Notes / Customize page: Change sliders values')
        .sliderSet('coverageLimits.building.value-slider', 267000)
        .sliderSet('coverageLimits.personalProperty.value-slider', 67000)
        .log('[LOG] Notes / Customize page: Set Deductible value')
        .findDataTag('deductibles.buildingDeductible.value_500')
        .trigger('click')
        .clickSubmit('#harmony-quote')
        .wait('@updateQuote')
        .then(({ response }) => {
          expect(response.body.result.rating.totalPremium).not.to.eq(premium);
        });
    });
    cy.clickSubmit('#harmony-quote');

    cy.log('[LOG] Notes / Save page');
    cy.wait('@searchAgencies').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.wrap(Object.entries(AF3_QUOTE.customerInfo)).each(([field, value]) => {
      cy.findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`);
    });
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Initial Data');
    });
    cy.findDataTag('edit-agency')
      .click()
      .wait('@searchAgencies')
      .then(({ response }) => {
        expect(response.body.status).to.equal(200);
      });
    cy.get("input[id*='react-s']")
      .click({ force: true })
      .chooseReactSelectOption('agency-select_wrapper', 20003)
      .wait(1000)
      .clickSubmit('#harmony-quote');

    // Complete 'congrats' page
    cy.log('[LOG] Notes / Congratulation page: Waiting for "Qualified status"')
      .wait('@updateQuote')
      .then(({ response }) => {
        expect(response.body.result.quoteInputState).to.equal('Qualified');
        expect(response.body.result.agencyCode).to.equal(20003);
      });
    cy.findDataTag('share')
      .click()
      .wrap(Object.entries(AF3_QUOTE.shareQuoteInfo))
      .each(([field, value]) => {
        cy.findDataTag(field).type(`{selectall}{backspace}${value}`);
      });
    cy.findDataTag('modal-submit')
      .click()
      .wait('@shareQuote')
      .then(({ response }) => {
        expect(response.body.message).to.equal('success');
      });
    cy.clickSubmit('#harmony-quote');

    // Complete 'additional insured' page
    cy.wait('@getQuestions').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });

    cy.findDataTag('mortgagee1_true')
      .click()
      .wrap(Object.entries(AF3_QUOTE.mortgageeInfo))
      .each(([field, value]) => {
        cy.findDataTag(field).type(`{selectall}{backspace}${value}`);
      });
    cy.findDataTag('ai-modal-submit')
      .click()
      .wait('@updateQuote')
      .then(({ response }) => {
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
      .trigger('click')
      .findDataTag('policyHolderMailingAddress.address1')
      .should('have.value', AF3_QUOTE.address)
      .findDataTag('ai-modal-submit')
      .trigger('click');

    cy.log(
      '[LOG] Notes / Policyholder page: Compare addresses, change Effective date and verify that the date has been changed'
    );
    cy.get("[class*='react-datepicker-w']")
      .click()
      .wait('@updateQuote')
      .then(({ request, response }) => {
        expect(
          request.body.data.quote.policyHolderMailingAddress.address1
        ).to.equal(request.body.data.quote.property.physicalAddress.address1);
        expect(response.body.result.quoteInputState).to.equal('AppStarted');
        const effDate = response.body.result.effectiveDate;
        let today = new Date();
        today.setMonth(today.getMonth() + 1);
        today.setDate(today.getDate() + 1);
        let d = today.getDate();
        let m = today.getMonth() + 1;
        let y = today.getFullYear();
        let dExt = d <= 9 ? '00' : '0';
        let mExt = m <= 9 ? '0' : '';
        cy.get(
          "[aria-label='month-" +
            y +
            '-' +
            mExt +
            m +
            "']>[class*='react']>[class='react-datepicker__day react-datepicker__day--" +
            dExt +
            d +
            "']"
        )
          .click()
          .clickSubmit('#harmony-quote')
          .wait('@updateQuote')
          .should(({ response }) => {
            expect(response.body.result.effectiveDate).not.to.eq(effDate);
            expect(response.body.result.quoteInputState).to.equal('AppStarted');
          });
      });

    //Complete 'billing' page
    //TODO test with a couple of different AI's?
    cy.log('[LOG] Notes / Billing page')
      .wait('@getBillingOptions')
      .then(({ response }) => {
        expect(response.body.status).to.equal(200);
      });
    cy.findDataTag('billing-option_Policyholder')
      .first()
      .trigger('click');
    cy.findDataTag('payment-plan-annual')
      .should('have.class', 'selected')
      .clickSubmit('#harmony-quote')
      .wait('@updateQuote')
      .then(({ request, response }) => {
        expect(request.body.data.quote.billToType).to.equal('Policyholder');
        expect(request.body.data.quote.billPlan).to.equal('Annual');
        expect(response.body.result.quoteInputState).to.equal('Ready');
      });

    // Complete 'summary' page
    cy.log('[LOG] Notes / Summary page')
      .findDataTag('confirm')
      .should('have.length', 5)
      .each($el => {
        $el.trigger('click');
      })
      .findDataTag('confirmed')
      .should('have.length', 5)
      .clickSubmit('#harmony-quote')
      .clickSubmit('.modal')
      .wait('@verifyQuote')
      .then(({ response }) => {
        expect(response.body.result.quoteInputState).to.equal('Ready');
      });

    // 'complete' page.
    cy.log('[LOG] Notes / Complete page').findDataTag('quote-complete');
    cy.wait('@sendApplication').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Ready');
      const payLoad = {
        quoteNumber: response.body.result.quoteNumber,
        lastName: response.body.result.policyHolders[0].lastName,
        zipCode: response.body.result.zipCodeSettings.zip
      };
      envelopeIdCheck(payLoad, 'https://api.harmony-ins.com/svc').then(
        response => {
          cy.log('[LOG] Verify that envelopeID is not empty');
          expect(response.body.result.envelopeId).to.not.be.empty;
        }
      );
    });
  });
});
