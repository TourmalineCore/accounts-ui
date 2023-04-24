import EditAccount from './EditAccount';

describe('EditAccount', () => {
  it('SHOULD render no edit page WHEN there is component', () => {
    mountComponent();

    cy.getByData('edit-account')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <EditAccount />,
  );
}
