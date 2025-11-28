describe(`RolesPage`, () => {
  beforeEach(`Authorize and cleanup`, () => {
    cy.authByApi()
    cy.removeRoles()

    cy
      .intercept(
        `GET`, 
        `/api/account-management/roles`,
      )
      .as(`getRoles`)
  })

  afterEach(`Cleanup`, () => {
    cy.removeRoles()
  })

  it(`
  GIVEN created role with name "[AUTO TEST] Manager1"
  WHEN changing its name to "[AUTO TEST] Manager2" and save it
  SHOULD display "[AUTO TEST] Manager2" in the list
`, () => {
    cy.visit(`/account-management/roles`)

    cy.wait(`@getRoles`)
    
    cy
      .getByData(`roles-table`)
      .should(`exist`)

    cy
      .getByData(`add-new-role-button`)
      .click()

    cy
      .getByData(`role-name-input`)
      .type(`[AUTO TEST] Manager1`)

    cy
      .getByData(`permission-checkbox`)      
      .first()
      .parent()
      .find(`.tc-checkfield__box`)
      .click()

    cy.getByData(`save-changes-button`)
      .click()

    cy
      .getByData(`edit-role-button-[AUTO TEST] Manager1`)      
      .click()

    cy
      .getByData(`actions-dropdown`)  
      .click()

    cy
      .getByData(`role-name-input`)
      .clear()
      .type(`[AUTO TEST] Manager2`)

    cy
      .getByData(`save-changes-button`)
      .click()

    cy
      .getByData(`roles-table`)
      .contains(`[AUTO TEST] Manager2`)
  })
})

export {}
