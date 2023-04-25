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

function mountComponent() {
  cy.mount(
    <EditAccount />,
  );
}
