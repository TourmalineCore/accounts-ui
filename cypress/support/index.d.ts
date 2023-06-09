/// <reference types="cypress" />

import MailSlurp from 'mailslurp-client';

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    auth(): Chainable<JQuery<HTMLElement>>;
    mailslurp(): Chainable<Promise<MailSlurp>>
  }
}
