export function retrieveQuote(payLoad, apiUrl, token) {
  return cy.request({
    url: apiUrl,
    method: 'POST',
    auth: { bearer: 'consumer' },
    failOnStatusCode: false,
    body: {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.retrieveQuote',
      data: payLoad
    }
  });
}
// Total retry time limit ~5 min
const WAIT_TIME_MS = 5000;
const RETRY_MAX = 60;

export function envelopeIdCheck(payLoad, apiUrl, token, attemptNumber = 0) {
  // Custom functions should return a 'cy chain' to be able to enforce order of ops
  return retrieveQuote(payLoad, apiUrl, token).then(res => {
    if (res.status === 200 && res.body.result.envelopeId) {
      // must wrap a var to make it chainable
      return cy.wrap(res);
    }

    assert.isBelow(
      attemptNumber,
      RETRY_MAX,
      "Number of retries to 'retrieveQuote' waiting for envelopeId to exist on quote"
    );
    cy.wait(WAIT_TIME_MS);
    envelopeIdCheck(payLoad, apiUrl, token, attemptNumber + 1);
  });
}
