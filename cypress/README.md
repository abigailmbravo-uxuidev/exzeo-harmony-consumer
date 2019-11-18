# Cypress

## Getting started

This assumes you already have harmony-consumer
[configured](https://bitbucket.org/exzeo-usa/harmony-consumer/src/master/).

By default, Cypress is configured to run against a local instance of Harmony-Web running on your computer.
To change this behavior and point to a different environment, see below.

Confirm that the following ENV variable is in `.env.local`

```bash
# point cypress to a different environment
#CYPRESS_BASE_URL=https://localhost:8282
```

**This variable can me modified to point to various harmony environments.*

Run test suite

`npm run cypress` **run with the Test Runner*

`npm run cypress -- --headless` **run in headless mode*

## Contributing

Take a look at the
[Cypress Docs](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file).  
Cypress uses [Chai Assertions](https://www.chaijs.com/api/bdd/).  
Be sure to read the [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html).

The organization of the tests should be

```bash
cypress/
  integration/
    [feature]/
      -[feature-test].spec.js
```

## Walkthrough

1) Update your test plan by marking integration points in Google Doc

1) Determine if you need a new test suite or not:

    Are you testing a new part of the app that Cypress currently doesn’t touch? => YES

    Is the test long, complicated, and will leave the app in a bad state? => Probably

    Is this testing something that is not generally used in the app, or that we
    don’t want to test every time? => Probably

1) Determine where to put your new test:

    If you are testing a new piece of core integration, put the test inside of
    one of the `pageTests/` -- these get run on every run through.

    If you are testing a new section of the app, add a new suite inside of `integration/`.

## Project Opinions

### **YOU ARE WRITING INTEGRATION TESTS**

 Leave small functionality checks to unit tests. You should only be checking if the ui is generally correct after
 receiving some new updates from the back end.

To navigate to a page inside of the app, use the **navigation helpers**.
If you are navigating to a new part of the application, add a new navigation helper.
This should be written in your `before()` hook
(or `beforeEach() if you have to navigate away from the page inside of each test)
and will most likely be utilized on every test.

Whenever possible, use a reusable function listed in `support/inputs` or
`support/utils`. This should cover the majority of test cases. **Favor `findDataTag()`
over `get()`**. If you have to `get()` frequently, consider adding data-test tags into
the harmony-consumer code itself. **When adding data-test tags, use dashes.**

When creating a test, place any reusable functions at the top, inside the describe.
For example, if you are always typing on the same inputs, this is a good place
to create a reusable call.

**Favor dot notation over callback notation.** Only use `then` calls if necessary.
A good place for then calls is when waiting on async calls, such as a network request. For example:

```js
  cy.clickSubmit().wait('@searchPolicy').then(({ response }) =>
    expect(response).toEqual(goodResponse));
```

Also avoid these `then` calls because they expost the
element as a jQuery element, without the Cypress wrapper, requiring using the jQuery assertions.

*Not this*:

```js
cy.get('button[type="submit"][form="SearchBar"]')
  .then($button => {
    expect($button).to.not.be.disabled;
    expect($button).to.contain('Search');
    $button.click();
  });
```

*but this:*

```js
cy.get('button[type="submit"][form="SearchBar"]')
  .should('not.be.disabled')
  .and('contain', 'Search')
  .click();
```

Also to note is to never use the jQuery objects, but always use `cy.wrap()` around them. A common
use case here is for things like `cy.get('something').each($el => {//do stuff})`, make sure to
`cy.wrap($el)` and use cypress chainers. Aside from establishing better patterns, cypress will
retry failing assertions whereas jQuery will not. So if you expect a DOM element to change after
some action is fired, jQuery assertions may fail while the DOM updates, whereas cypress will retry
those assertions.
