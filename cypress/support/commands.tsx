/// <reference types="cypress" />

import { existUser } from '../e2e/constants/index';
import AuthView from '../e2e/pages/AuthView';
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
Cypress.Commands.add('auth', () => {
  const { login } = existUser;
  const { password } = existUser;

  AuthView.enterLogin(login);
  AuthView.enterPassword(password);

  AuthView.tapLogIn();
});
