/// <reference types="cypress" />

// import { MailSlurp } from 'mailslurp-client';

declare namespace Cypress {
  interface Chainable {
    // mailslurp: () => Promise<MailSlurp>;
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    // mailSlurp()x
    // mailslurp(): Chainable<Promise<MailSlurp>>;
  }
}
