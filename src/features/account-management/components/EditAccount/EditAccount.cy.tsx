import { LINK_TO_ACCOUNT_SERVICE, API_ROOT } from '../../../../common/config/config';
import EditAccount from './EditAccount';

const START_ROOT = `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}accounts/1`;
const MOCK_DATA = {
  corporateEmail: 'test@tourmalinecore.com',
  firstName: 'TestName',
  lastName: 'TestLastName',
  roles: [
    {
      id: 1,
      name: 'CEO',
    },
  ],
};

describe('render elements EditAccount components', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      START_ROOT,
      MOCK_DATA,
    );

    mountComponent();
  });

  it('SHOULD render no edit page WHEN there is component', () => {
    cy.getByData('edit-account')
      .should('exist');
  });

  it(' AFTER render', () => {
    cy.getByData('corporate-email')
      .should('have.text', 'test@tourmalinecore.com');
  });

  it('first name input SHOULD have value AFTER render', () => {
    cy.getByData('first-name')
      .should('have.value', 'TestName');
  });

  it('last name input SHOULD have value AFTER render', () => {
    cy.getByData('last-name')
      .should('have.value', 'TestLastName');
  });

  it('middle name input SHOULD have value AFTER render', () => {
    cy.getByData('middle-name')
      .should('have.value', '');
  });

  it('role checkboxs SHOULD have value AFTER render', () => {
    cy.get('.tc-checkfield :checked')
      .should('be.checked')
      .and('have.value', 'CEO');
  });

  it('SHOULD render cancel button no the edit page WHEN there is component', () => {
    cy.getByData('cancel-button')
      .should('exist');
  });

  it('SHOULD render save button no the edit page WHEN there is component', () => {
    cy.getByData('save-button')
      .should('exist');
  });
});

describe('entering EditAccount component data', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      START_ROOT,
      MOCK_DATA,
    );

    mountComponent();
  });

  it('SHOULD render error messages WHEN click save button with empty inputs required', () => {
    cy.getByData('first-name')
      .clear();

    cy.getByData('last-name')
      .clear();

    cy.getByData('role')
      .uncheck(['CEO'], { force: true });

    cy.getByData('save-button')
      .click();

    cy.contains('This first name is required. Please fill it up.').should('exist');

    cy.contains('This last name is required. Please fill it up.').should('exist');

    cy.contains('Select at least one role').should('exist');
  });

  it('SHOULD not render error messages WHEN click save button with not empty inputs required', () => {
    cy.getByData('first-name')
      .clear()
      .type('First name');

    cy.getByData('last-name')
      .clear()
      .type('Last name');

    cy.getByData('role')
      .check(['Admin'], { force: true });

    cy.getByData('save-button')
      .click();

    cy.contains('This first name is required. Please fill it up.').should('not.exist');

    cy.contains('This last name is required. Please fill it up.').should('not.exist');

    cy.contains('Select at least one role').should('not.exist');
  });
});

function mountComponent() {
  cy.mount(
    <EditAccount />,
  );
}
