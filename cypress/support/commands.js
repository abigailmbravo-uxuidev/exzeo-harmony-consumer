// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
/**
 * @param {string} name - String name of data-test tag.
 * @param {Object} options - Native cy.get options.
 * @returns {Object} DOM element(s) found.
 */
Cypress.Commands.add('findDataTag', (name, { timeout = 15000, ...rest } = {}) =>
  cy.get(`[data-test="${name}"]:not([disabled])`, { timeout, ...rest })
);

/**
 * @param {string} form - Name of form to submit.
 * @returns {Object} DOM element(s) found.
 */
Cypress.Commands.add('clickSubmit', (form = 'body', button = 'submit') =>
  cy.get(form).within(() => cy.findDataTag(button).click({ force: true }))
);

/**
 * @param {array} fields - Fields to fill out.
 * @param {Object} data - Data to fill out with keys corresponding to each entry in fields.
 */
Cypress.Commands.add('fillFields', (fields = [], data) =>
  cy.wrap(fields).each(field =>
    cy.findDataTag(`${field.name}`).then($el =>
      // Sometimes the dom structure nests inputs
      $el.find('input').length
        ? cy
            .wrap($el)
            .find('input')
            .type(data ? data[field.name] : field.data)
        : cy.wrap($el).type(data ? data[field.name] : field.data)
    )
  )
);
