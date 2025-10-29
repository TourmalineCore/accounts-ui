import { API_ROOT, LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import '../../../cypress/support/commands'
import { CreateOrEditAccountStateContext } from './state/CreateOrEditAccountStateContext'
import { CreateOrEditAccountState } from './state/CreateOrEditAccountState'
import { CreateOrEditAccountContent } from './CreateOrEditAccountContent'

const START_ROOT_TENANTS_ALL = `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}tenants/all`
const START_ROOT_ROLES = `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}roles`
const START_ROOT = `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}accounts/findById/*`

const MOCK_DATA_TENANTS: Tenants[] = [
  {
    id: 1,
    name: `Blue`,
  },
  {
    id: 2,
    name: `Black`,
  },
]

const MOCK_DATA_ROLES = [
  {
    id: 1,
    name: `CEO`,
    permissions: [
      `ViewPersonalProfile`,
      `EditPersonalProfile`,
      `ViewContacts`,
    ],
  },
]

const MOCK_DATA_ACCOUNT = {
  corporateEmail: `test@tourmalinecore.com`,
  firstName: `TestName`,
  lastName: `TestLastName`,
  roles: [
    {
      id: 1,
      name: `CEO`,
    },
  ],
}

describe(`Create Account Container`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      START_ROOT_TENANTS_ALL,
      MOCK_DATA_TENANTS,
    )

    cy.intercept(
      `GET`,
      START_ROOT_ROLES,
      MOCK_DATA_ROLES,
    )

    mountComponent({})
  })

  it(`
  GIVEN create account page 
  WHEN visit account page
  SHOULD render account page content `, () => {
    mountComponent({})

    cy.getByData(`create-account`)
      .should(`exist`)

    cy.getByData(`first-name`)
      .should(`exist`)

    cy.getByData(`middle-name`)
      .should(`exist`)

    cy.getByData(`last-name`)
      .should(`exist`)

    cy.getByData(`email-input`)
      .should(`exist`)

    cy.getByData(`select-tenant`)
      .should(`exist`)

    cy.getByData(`cancel-button`)
      .should(`exist`)
      .should(`have.text`, `Cancel`)

    cy.getByData(`add-button`)
      .should(`exist`)
      .should(`have.text`, `Add`)
  })
  
  it(`
  GIVEN create account page 
  WHEN visit account page
  SHOULD render a select with data about tenants`, () => {
    cy.getByData(`select-tenant`)
      .should(`exist`)
      .select(`Black`)
  })
})

describe(`render elements EditAccount components`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      START_ROOT,
      MOCK_DATA_ACCOUNT,
    )

    cy.intercept(
      `GET`,
      START_ROOT_ROLES,
      MOCK_DATA_ROLES,
    )

    mountComponent({
      isEditMode: true,
    })
  })

  it(`SHOULD render edit page WHEN there is component`, () => {
    cy.getByData(`edit-account`)
      .should(`exist`)
  })

  it(`AFTER render`, () => {
    cy.getByData(`corporate-email`)
      .should(`have.text`, `test@tourmalinecore.com`)
  })

  it(`first name input SHOULD have value AFTER render`, () => {
    cy.getByData(`first-name`)
      .should(`have.value`, `TestName`)
  })

  it(`last name input SHOULD have value AFTER render`, () => {
    cy.getByData(`last-name`)
      .should(`have.value`, `TestLastName`)
  })

  it(`middle name input SHOULD have value AFTER render`, () => {
    cy.getByData(`middle-name`)
      .should(`have.value`, ``)
  })

  it(`role checkboxs SHOULD have value AFTER render`, () => {
    cy.get(`.tc-checkfield :checked`)
      .should(`be.checked`)
      .and(`have.value`, `on`)
  })

  it(`SHOULD render cancel button on the edit page WHEN there is component`, () => {
    cy.getByData(`cancel-button`)
      .should(`exist`)
  })

  it(`SHOULD render save button on the edit page WHEN there is component`, () => {
    cy.getByData(`save-button`)
      .should(`exist`)
  })
})

function mountComponent({
  isEditMode = false,
}: {
  isEditMode?: boolean,
}) {
  const createAccountState = new CreateOrEditAccountState()

  if (isEditMode) {
    createAccountState.setIsEditMode(true)
    createAccountState.setAccountData({
      firstName: MOCK_DATA_ACCOUNT.firstName,
      lastName: MOCK_DATA_ACCOUNT.lastName,
      corporateEmail: MOCK_DATA_ACCOUNT.corporateEmail,
    })
    createAccountState.setSelectedCheckboxes(
      new Set(MOCK_DATA_ACCOUNT.roles.map(role => String(role.id))),
    )
  }

  createAccountState.setTenantsData(MOCK_DATA_TENANTS)
  createAccountState.setRolesData({
    1: `CEO`,
  })

  const mockCreateAccount = cy.stub()
    .as(`createAccount`)
  const mockEditAccount = cy.stub()
    .as(`editAccount`)

  cy.mount(
    <CreateOrEditAccountStateContext.Provider value={createAccountState}>
      <CreateOrEditAccountContent
        createAccountAsync={mockCreateAccount}
        editAccountAsync={mockEditAccount}
        isEditMode={isEditMode}
      />
    </CreateOrEditAccountStateContext.Provider>,
  )
}
