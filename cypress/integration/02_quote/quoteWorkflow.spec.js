import { setRouteAliases } from '../../helpers/setRouteAliases';
import { AF3_QUOTE, CSP_BASE } from '../../fixtures';
import { envelopeIdCheck } from '../../helpers/requests';

context('Create new quote', () => {
  beforeEach('Set Route Aliases', () => setRouteAliases());

  it('Should create new quote with known address', () => {
    // Search for address and create quote
    cy.visit(`${CSP_BASE}/searchAddress`)
      .findDataTag('address-search')
      .should('have.text', 'Search Address')
      .findDataTag('address')
      .type(AF3_QUOTE.search_query)
      .clickSubmit();
    cy.wait('@fetchAddress').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.findDataTag(`result-${AF3_QUOTE.address}`).click();
    cy.wait('@createQuote').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });

    // Complete 'underwriting' page
    cy.wait('@underwritingQuestions')
      .then(({ response }) => {
        expect(response.body.status).to.equal(200);
      })
      .findDataTag('Underwriting Questions')
      .should('have.text', 'Underwriting Questions')
      .findDataTag('Property Address')
      .should('have.text', AF3_QUOTE.address);
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
      cy.findDataTag('Customize Quote')
        .should('have.text', 'Customize Quote')
        .findDataTag('Total Premium')
        .then($prem => {
          const premium = $prem.text();
          expect($prem.text()).not.to.eq('$ --');
          cy.sliderSet('coverageLimits.building.value-slider', 267000)
            .sliderSet('coverageLimits.personalProperty.value-slider', 67000)
            .findDataTag('deductibles.buildingDeductible.value_500')
            .click()
            .clickSubmit('#harmony-quote')
            .findDataTag('Total Premium')
            .should($prem2 => {
              expect($prem2.text()).not.to.eq($prem);
            });
        });
    });
    cy.clickSubmit('#harmony-quote')
      .wait('@updateQuote')
      .then(({ response }) => {
        expect(response.body.status).to.equal(200);
        cy.wrap(response.body.result.quoteNumber).as('quoteNumber');
      });

    cy.clickSubmit('#harmony-quote')
      .wait('@updateQuote')
      .then(({ response }) => {
        expect(response.body.result.quoteInputState).to.equal(
          'Qualified',
          'QuoteInputState'
        );
      });
    cy.findDataTag('Save Quote')
      .should('have.text', 'Save Quote')
      .wrap(Object.entries(AF3_QUOTE.customerInfo))
      .each(([field, value]) => {
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
      .findDataTag('agency-name')
      .should('contain.text', 'OMEGA')
      .clickSubmit('#harmony-quote');

    // Complete 'congrats' page

    cy.findDataTag('Congratulations!')
      .should('have.text', 'Congratulations!')
      .wait('@updateQuote')
      .then(({ response }) => {
        const quotePayload = response.body.result;
        expect(quotePayload.quoteInputState).to.equal(
          'Qualified',
          'QuoteInputState'
        );

        // TODO replace this with unit test once test harness is complete.
        cy.findDataTag('save-and-quit')
          .click()
          .wait('@shareQuote')
          .then(({ response }) => {
            expect(response.body.status).to.equal(
              200,
              "Auto 'SendQuoteSummary' response status"
            );
          });

        // Go to Retrieve quote page and retrieve the quote ----- Leave it here temporary till we have ability of seeding the quote
        const quoteRetrieveValues = {
          // quoteNumber: quotePayload.quoteNumber,
          email: quotePayload.policyHolders[0].emailAddress,
          lastName: quotePayload.policyHolders[0].lastName,
          zipCode: quotePayload.zipCodeSettings.zip
        };

        cy.task('log', 'Attempting to retrieve saved quote by email')
          .visit(`${CSP_BASE}/retrieveQuote`)
          .findDataTag('search-by-email')
          .click()
          .wrap(Object.entries(quoteRetrieveValues))
          .each(([field, value]) => {
            cy.findDataTag(field).type(`{selectall}{backspace}${value}`);
          });
        cy.clickSubmit()
          .wait('@searchQuotes')
          .then(({ response }) => {
            expect(response.body.status).to.equal(
              200,
              "'SearchQuotes' response status"
            );
          })
          .findDataTag(`quote-${quotePayload.quoteNumber}`)
          .click()
          .wait('@retrieveQuote')
          .then(({ response }) => {
            expect(response.body.status).to.equal(
              200,
              'RetrieveQuote response status'
            );
          });
        cy.task('log', 'Retrieve Quote by email successful');

        cy.task('log', 'Attempting to retrieve saved quote by quote number')
          .visit(`${CSP_BASE}/retrieveQuote`)
          .findDataTag('search-by-quoteNumber')
          .click()
          .get('@quoteNumber')
          .then(quoteNum => {
            const quoteRetrieveValues = {
              quoteNumber: quoteNum,
              lastName: quotePayload.policyHolders[0].lastName,
              zipCode: quotePayload.zipCodeSettings.zip
            };
            cy.wrap(Object.entries(quoteRetrieveValues)).each(
              ([field, value]) => {
                cy.findDataTag(field).type(`{selectall}{backspace}${value}`);
              }
            );
            cy.clickSubmit()
              .wait('@retrieveQuote')
              .then(({ response }) => {
                expect(response.body.status).to.equal(
                  200,
                  "'SearchQuotes' response status"
                );
              });
          });
        cy.findDataTag('Underwriting Questions')
          .should('have.text', 'Underwriting Questions')

          // Click Contunue 3 times in order to get back to Congratulations page and continue the workflow
          .clickSubmit('#harmony-quote');
        cy.wait('@updateQuote').then(({ response }) => {
          expect(response.body.status).to.equal(
            200,
            '1st Update after retrieved'
          );
        });
        cy.findDataTag('Customize Quote')
          .should('have.text', 'Customize Quote')
          .clickSubmit('#harmony-quote')
          .wait('@updateQuote')
          .then(({ response }) => {
            expect(response.body.status).to.equal(
              200,
              '2nd Update after retrieved'
            );
          });
        cy.findDataTag('Save Quote')
          .should('have.text', 'Save Quote')
          .clickSubmit('#harmony-quote')
          .wait('@updateQuote')
          .then(({ response }) => {
            expect(response.body.status).to.equal(
              200,
              '3rd Update after retrieved'
            );
          });
      });

    cy.findDataTag('Congratulations!')
      .should('have.text', 'Congratulations!')
      // End of the retrieve quote -----------------------------------------------------------------------------------------------------------------------------------

      .findDataTag('share')
      .click()
      .wrap(Object.entries(AF3_QUOTE.shareQuoteInfo))
      .each(([field, value]) => {
        cy.findDataTag(field).type(`{selectall}{backspace}${value}`);
      });
    cy.clickSubmit('.modal', 'modal-submit');
    cy.wait('@shareQuote').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.clickSubmit('#harmony-quote');

    // Complete 'additional insured' page
    cy.wait('@getQuestions').then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
    cy.findDataTag('Additional Insured')
      .should('have.text', 'Additional Insured')
      .findDataTag('mortgagee1_true')
      .click()
      .wrap(Object.entries(AF3_QUOTE.mortgageeInfo))
      .each(([field, value]) => {
        cy.findDataTag(field).type(`{selectall}{backspace}${value}`);
      });
    cy.clickSubmit('.AdditionalInterestModal', 'ai-modal-submit')
      .findDataTag('Mortgagee-0-name')
      .should('contain.text', AF3_QUOTE.mortgageeInfo.name1)
      .wait('@updateQuote')
      .then(({ response }) => {
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
    cy.findDataTag('Policyholder Information')
      .should('have.text', 'Policyholder Information')
      .findDataTag('add-address')
      .click()
      .findDataTag('mailingSameAsProperty_true')
      .click();
    cy.clickSubmit('.modal', 'ai-modal-submit')
      .findDataTag('property-address')
      .should('have.text', AF3_QUOTE.address)
      .get("[class*='react-datepicker-w']")
      .click();
    cy.wait('@updateQuote').then(({ response }) => {
      expect(response.body.result.quoteInputState).to.equal(
        'AppStarted',
        'QuoteInputState'
      );
      cy.get('input[class*="react-datepicker"]')
        .invoke('val')
        .then(effDate => {
          cy.wrap(effDate).as('defaultEffDate');
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
      cy.clickSubmit('#harmony-quote');
      cy.wait('@updateQuote').should(({ response }) => {
        expect(response.body.result.quoteInputState).to.equal(
          'AppStarted',
          'QuoteInputState'
        );
      });
    });

    //Complete 'billing' page
    //TODO test with a couple of different AI's?

    cy.findDataTag('Billing Information')
      .should('have.text', 'Billing Information')
      .findDataTag('billing-option_Policyholder')
      .first()
      .click();
    cy.findDataTag('payment-plan-annual')
      .should('have.class', 'selected')
      .clickSubmit('#harmony-quote');
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

    cy.get('@defaultEffDate')
      .then(effDate => {
        cy.findDataTag('Effective Date').should(
          'not.have.text',
          effDate,
          'Verify that Effective date is different from the default date'
        );
      })
      .findDataTag('Property Address')
      .should('contain.text', AF3_QUOTE.address)
      .findDataTag('confirm')
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
