/// <reference types="cypress" />

Cypress.Commands.add('getByData', (selector) => cy.get(`[data-cy=${selector}]`));

const mailslurp = new MailSlurp({ apiKey, basePath: 'https://cypress.api.mailslurp.com' });
// register MailSlurp with cypress under "mailslurp" command
// afterwards you can access it in tests using `cy.mailslurp().then(mailslurp => /* do stuff */)`
Cypress.Commands.add('mailslurp', () => Promise.resolve(mailslurp));
