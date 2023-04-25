import { LINK_TO_ACCOUNT_SERVICE, API_ROOT } from '../../../../common/config/config';
import EditAccount from './EditAccount';

describe('EditAccount', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}accounts/1`,
      {
        corporateEmail: 'test@tourmalinecore.com',
        firstName: 'TestName',
        lastName: 'TestLastName',
        roles: [
          {
            id: 1,
            name: 'CEO',
          },
        ],
      },
    );

    mountComponent();
  });

  it('SHOULD render no edit page WHEN there is component', () => {
    cy.getByData('edit-account')
      .should('exist');
  });

  it('SHOULD call the backend to get data WHEN it wants to render corporate email', () => {
    cy.getByData('corporate-email')
      .should('have.text', 'test@tourmalinecore.com');
  });

  it('SHOULD call the backend to get data WHEN it wants to render first name input with value', () => {
    cy.getByData('first-name')
      .should('have.value', 'TestName');
  });

  it('SHOULD call the backend to get data WHEN it wants to render last name input with value', () => {
    cy.getByData('last-name')
      .should('have.value', 'TestLastName');
  });

  it('SHOULD call the backend to get data WHEN it wants to render middle name input with not have value', () => {
    cy.getByData('middle-name')
      .should('have.value', '');
  });

  it('SHOULD call the backend to get data WHEN it wants to render roles with selected values', () => {
    cy.get('.tc-checkfield :checked')
      .should('be.checked')
      .and('have.value', 'CEO');
  });
});

describe('Button', () => {
  it('SHOULD render cancel button no the edit page WHEN there is component', () => {
    mountComponent();

    cy.getByData('cancel-button')
      .should('exist');
  });

  it('SHOULD render save button no the edit page WHEN there is component', () => {
    mountComponent();

    cy.getByData('save-button')
      .should('exist');
  });
});

describe('entering EditAccount component data', () => {
  it('SHOULD render error messages WHEN click save button with empty inputs required', () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}accounts/1`,
      {
        corporateEmail: 'test@tourmalinecore.com',
        firstName: 'TestName',
        lastName: 'TestLastName',
        roles: [
          {
            id: 1,
            name: 'CEO',
          },
        ],
      },
    );

    mountComponent();

    cy.getByData('first-name')
      .clear();

    cy.getByData('last-name')
      .clear();

    cy.getByData('role')
      .uncheck(['CEO'], { force: true });

    cy.getByData('save-button')
      .click();

    cy.contains('This first name is required. Please fill it up.');

    cy.contains('This last name is required. Please fill it up.');

    cy.contains('Select at least one role');
  });

  it('SHOULD not render error messages WHEN click save button with not empty inputs required', () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}accounts/1`,
      {
        corporateEmail: 'test@tourmalinecore.com',
        firstName: 'TestName',
        lastName: 'TestLastName',
        roles: [
          {
            id: 1,
            name: 'CEO',
          },
        ],
      },
    );

    mountComponent();

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

    cy.should('not.contain', 'This first name is required. Please fill it up.');

    cy.should('not.contain', 'This last name is required. Please fill it up.');

    cy.should('not.contain', 'Select at least one role');
  });
});

function mountComponent() {
  cy.mount(
    <EditAccount />,
  );
}
