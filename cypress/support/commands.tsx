/// <reference types="cypress" />
/// <reference types="cypress-mailslurp" />

// import { MailSlurp } from 'mailslurp-client';

Cypress.Commands.add('getByData', (selector) => cy.get(`[data-cy=${selector}]`));

const apiKey = Cypress.env('MAILSLURP_API_KEY');
if (!apiKey) {
  throw new Error(
    'Error no MailSlurp API Key. Please set the `CYPRESS_MAILSLURP_API_KEY` '
        + 'environment variable to the value of your MailSlurp API Key to use the MailSlurp Cypress plugin. '
        + 'Create a free account at https://app.mailslurp.com/sign-up/. See https://docs.cypress.io/guides/guides/environment-variables#Option-3-CYPRESS_ for more information.',
  );
}

// const mailslurp = new MailSlurp({ apiKey, basePath: 'https://cypress.api.mailslurp.com' });

// Cypress.Commands.add('mailslurp', () => Promise.resolve(mailslurp));
