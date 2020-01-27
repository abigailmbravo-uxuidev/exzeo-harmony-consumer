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
      .clickSubmit();
    cy.wait('@fetchAddress').then(({ request }) => {
      expect(request.body.path.includes(AF3_QUOTE.search_query));
    });
    cy.findDataTag(`result-${AF3_QUOTE.address}`).click();
    cy.wait('@createQuote').then(({ response }) => {
      expect(response.body.result.property.physicalAddress.address1).to.equal(
        AF3_QUOTE.address,
        'Property Address'
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
      expect(response.body.result.quoteInputState).to.equal(
        'Qualified',
        'QuoteInputState'
      );
      const premium = response.body.result.rating.totalPremium;
      cy.findDataTag('detail-header').within(() => {
        cy.get('h2>strong').should('not.have.text', '$ --');
      });
      cy.sliderSet('coverageLimits.building.value-slider', 267000)
        .sliderSet('coverageLimits.personalProperty.value-slider', 67000)
        .findDataTag('deductibles.buildingDeductible.value_500')
        .click()
        .clickSubmit('#harmony-quote');
      cy.wait('@updateQuote').then(({ response }) => {
        expect(response.body.result.rating.totalPremium).not.to.eq(
          premium,
          'Premium change'
        );
      });
    });
    cy.clickSubmit('#harmony-quote')
      .wait('@searchAgencies')
      .then(({ response }) => {
        expect(response.body.status).to.equal(200);
      });
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal(
        'Qualified',
        'QuoteInputState'
      );
    });
    cy.wrap(Object.entries(AF3_QUOTE.customerInfo)).each(([field, value]) => {
      cy.findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`);
    });
    cy.findDataTag('edit-agency').click();
    cy.wait('@searchAgencies').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.get("input[id*='react-s']")
      .click({ force: true })
      .chooseReactSelectOption('agency-select_wrapper', 20003)
      .wait(1000)
      .clickSubmit('#harmony-quote');

    // Complete 'congrats' page

    cy.wait('@updateQuote').then(({ response }) => {
      const quotePayload = response.body.result;
      expect(quotePayload.quoteInputState).to.equal(
        'Qualified',
        'QuoteInputState'
      );
      expect(quotePayload.agencyCode).to.equal(20003, 'Expected AgencyCode');
      // TODO replace this with unit test once test harness is complete.
      const expectedSummaryPayload = {
        quoteNumber: quotePayload.quoteNumber,
        summaryType: 'consumer',
        toEmail: quotePayload.policyHolders[0].emailAddress,
        toName: quotePayload.policyHolders[0].firstName
      };

      cy.findDataTag('save-and-quit')
        .click()
        .wait('@shareQuote')
        .then(({ request }) => {
          expect(request.body.data).to.deep.equal(
            expectedSummaryPayload,
            "Expected 'SendQuoteSummary' payload"
          );
        });

      // Go to Retrieve quote page and retrieve the quote ----- Leave it here temporary till we have ability of seeding the quote
      const quoteRetrieveValues = {
        lastName: quotePayload.policyHolders[0].lastName,
        zipCode: quotePayload.zipCodeSettings.zip,
        quoteNumber: quotePayload.quoteNumber
      };

      cy.task('log', 'Attempting to retrieve saved quote');
      cy.visit(`${CSP_BASE}/retrieveQuote`)
        .wrap(Object.entries(quoteRetrieveValues))
        .each(([field, value]) => {
          cy.findDataTag(field).type(`{selectall}{backspace}${value}`);
        });
      cy.clickSubmit()
        .wait('@retrieveQuote')
        .then(({ response }) => {
          expect(response.body.status).to.equal(200);
        });
      // Click Contunue 3 times in order to get back to Congratulations page and continue the workflow
      cy.clickSubmit('#harmony-quote');
      cy.wait('@updateQuote').then(({ response }) => {
        expect(response.body.status).to.equal(200);
      });
      cy.clickSubmit('#harmony-quote');
      cy.wait('@updateQuote').then(({ response }) => {
        expect(response.body.status).to.equal(200);
      });
      cy.clickSubmit('#harmony-quote');
      cy.wait('@updateQuote').then(({ response }) => {
        expect(response.body.status).to.equal(200);
      });
    });
    // End of the retrieve quote -----------------------------------------------------------------------------------------------------------------------------------

    cy.findDataTag('share')
      .click()
      .wrap(Object.entries(AF3_QUOTE.shareQuoteInfo))
      .each(([field, value]) => {
        cy.findDataTag(field).type(`{selectall}{backspace}${value}`);
      });
    cy.clickSubmit('.modal', 'modal-submit');
    cy.wait('@shareQuote').then(({ response }) => {
      expect(response.body.message).to.equal('success', 'Share Quote');
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
    cy.clickSubmit('.AdditionalInterestModal', 'ai-modal-submit');
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal(
        'AppStarted',
        'QuoteInputState'
      );
    });
    cy.clickSubmit('#harmony-quote');

    // Complete 'policyholder' page
    // TODO add secondary policyHolder, maybe edit effective date?
    cy.wait('@getZipCodeSettings').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.findDataTag('add-address')
      .click()
      .findDataTag('mailingSameAsProperty_true')
      .click()
      .findDataTag('policyHolderMailingAddress.address1')
      .should('have.value', AF3_QUOTE.address);
    cy.clickSubmit('.modal', 'ai-modal-submit')
      .get("[class*='react-datepicker-w']")
      .click();
    cy.wait('@updateQuote').then(({ request, response }) => {
      expect(
        request.body.data.quote.policyHolderMailingAddress.address1
      ).to.equal(
        request.body.data.quote.property.physicalAddress.address1,
        'Mailing Address same as Property Address'
      );
      expect(response.body.result.quoteInputState).to.equal(
        'AppStarted',
        'QuoteInputState'
      );
      cy.get('input[class*="react-datepicker"]')
        .invoke('val')
        .then(effDate => {
          let effDay = parseInt(effDate.split('/')[1]);
          let shift = effDay <= 28 ? 1 : -1;
          cy.get('input[class*="react-datepicker"]').type(
            '{selectall}{backspace}' +
              effDate.split('/')[0] +
              '/' +
              (effDay + shift) +
              '/' +
              effDate.split('/')[2] +
              '{enter}'
          );
        });
      const effDate = response.body.result.effectiveDate;
      cy.clickSubmit('#harmony-quote');
      cy.wait('@updateQuote').should(({ response }) => {
        expect(response.body.result.effectiveDate).not.to.eq(
          effDate,
          'Effective Date change'
        );
        expect(response.body.result.quoteInputState).to.equal(
          'AppStarted',
          'QuoteInputState'
        );
      });
    });

    //Complete 'billing' page
    //TODO test with a couple of different AI's?
    cy.wait('@getBillingOptions').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.findDataTag('billing-option_Policyholder')
      .first()
      .click();
    cy.findDataTag('payment-plan-annual')
      .should('have.class', 'selected')
      .clickSubmit('#harmony-quote');
    cy.wait('@updateQuote').then(({ request, response }) => {
      expect(request.body.data.quote.billToType).to.equal(
        'Policyholder',
        'BillToType'
      );
      expect(request.body.data.quote.billPlan).to.equal('Annual', 'BillPlan');
      expect(response.body.result.quoteInputState).to.equal(
        'Ready',
        'QuoteInputState'
      );
    });

    cy.wait('@verifyQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal(
        'Ready',
        'QuoteInputState'
      );
      expect(response.body.result.quoteState).to.equal(
        'Application Ready',
        'QuoteState'
      );
    });

    // Complete 'summary' page
    cy.findDataTag('confirm')
      .should('have.length', 5)
      .each($el => {
        $el.trigger('click');
      })
      .findDataTag('confirmed')
      .should('have.length', 5)
      .clickSubmit('#harmony-quote')
      .clickSubmit('.modal');

    // 'complete' page.
    cy.wait('@sendApplication').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal(
        'Ready',
        'QuoteInputState'
      );
      const apiUrl = Cypress.env('API_URL') + '/svc';
      const payLoad = {
        quoteNumber: response.body.result.quoteNumber,
        lastName: response.body.result.policyHolders[0].lastName,
        zipCode: response.body.result.zipCodeSettings.zip
      };
      envelopeIdCheck(payLoad, apiUrl, 'consumer').then(response => {
        expect(response.body.result.envelopeId, 'Quote has an envelopeId').to
          .not.be.empty;
      });
    });
  });
});
