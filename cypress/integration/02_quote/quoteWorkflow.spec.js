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
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Initial Data');
    });
    cy.wrap(Object.entries(AF3_QUOTE.customerInfo)).each(([field, value]) => {
      cy.findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`);
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
    cy.log('[LOG] Notes / Congratulation page: Waiting for "Qualified status"');

    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal('Qualified');
      expect(response.body.result.agencyCode).to.equal(20003);
      const payLoad = {
        lastName: response.body.result.policyHolders[0].lastName,
        zipCode: response.body.result.zipCodeSettings.zip,
        quoteNumber: response.body.result.quoteNumber
      };
      // Go to Retrieve quote page and retrieve the quote
      cy.get("a[href*='retrieve']")
        .click()
        .wrap(Object.entries(payLoad))
        .each(([field, value]) => {
          cy.findDataTag(field).type(`{selectall}{backspace}${value}`);
        });
      cy.findDataTag('submit')
        .click()
        .wait('@retrieveQuote')
        .then(({ response }) => {
          expect(response.body.status).to.equal(200);
        });
      // Click Contunue 3 times in order to get back to Congratulations page and continue the workflow
      cy.clickSubmit('#harmony-quote')
        .wait('@updateQuote')
        .then(({ response }) => {
          expect(response.body.status).to.equal(200);
        });
      cy.clickSubmit('#harmony-quote')
        .wait('@updateQuote')
        .then(({ response }) => {
          expect(response.body.status).to.equal(200);
        });
      cy.clickSubmit('#harmony-quote')
        .wait('@updateQuote')
        .then(({ response }) => {
          expect(response.body.status).to.equal(200);
        });
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
        cy.get('input[class*="r"]')
          .invoke('val')
          .then(val1 => {
            let day = parseInt(val1.split('/')[1]);
            let shift = day <= 28 ? 1 : -1;
            cy.get('input[class*="r"]').type(
              '{selectall}{backspace}' +
                val1.split('/')[0] +
                '/' +
                (day + shift) +
                '/' +
                val1.split('/')[2] +
                '{enter}'
            );
          });
        const effDate = response.body.result.effectiveDate;
        cy.clickSubmit('#harmony-quote')
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
