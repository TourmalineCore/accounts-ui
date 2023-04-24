/// <reference types="cypress" />

import { existUser } from '../e2e/constants/index';
import AuthView from '../e2e/pages/AuthView';

Cypress.Commands.add('auth', () => {
  const { login } = existUser;
  const { password } = existUser;

  AuthView.enterLogin(login);
  AuthView.enterPassword(password);

  AuthView.tapLogIn();
});

Cypress.Commands.add('getByData', (selector) => cy.get(`[data-cy=${selector}]`));
