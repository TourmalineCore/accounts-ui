import { API_ROOT, LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import '../../../cypress/support/commands'
import { CreateOrEditAccountStateContext } from './state/CreateOrEditAccountStateContext'
import { CreateOrEditAccountState } from './state/CreateOrEditAccountState'
import { CreateOrEditAccountContent } from './CreateOrEditAccountContent'

const START_ROOT_TENANTS_ALL = `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}tenants/all`
const START_ROOT_ROLES = `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}roles`
const START_ROOT_FIND_BY_ID = `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}accounts/findById/*`

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

describe(`CreateOrEditAccountContent`, () => {
  describe(`createAccountContent`, createAccountContent)
  describe(`editAccountContent`, editAccountContent)
})

function createAccountContent() {
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
  SHOULD render account page content`, () => {
    mountComponent({})

    cy
      .getByData(`create-account`)
      .should(`exist`)

    cy
      .getByData(`first-name`)
      .should(`exist`)

    cy
      .getByData(`middle-name`)
      .should(`exist`)

    cy
      .getByData(`last-name`)
      .should(`exist`)

    cy
      .getByData(`email-input`)
      .should(`exist`)

    cy
      .getByData(`select-tenant`)
      .should(`exist`)

    cy
      .getByData(`cancel-button`)
      .should(`exist`)
      .should(`have.text`, `Cancel`)

    cy
      .getByData(`add-button`)
      .should(`exist`)
      .should(`have.text`, `Add`)
  })
  
  it(`
  GIVEN create account page 
  WHEN visit account page
  SHOULD render a select with data about tenants`, () => {
    cy
      .getByData(`select-tenant`)
      .should(`exist`)
      .select(`Black`)
  })
}

function editAccountContent() {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      START_ROOT_FIND_BY_ID,
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

  it(`
    SHOULD render edit page 
    WHEN there is component`, () => {
    cy
      .getByData(`edit-account`)
      .should(`exist`)
  })

  it(`
    GIVEN edit account page 
    SHOULD display corporate email of the account
    AFTER render`, () => {
    cy
      .getByData(`corporate-email`)
      .should(`have.text`, `test@tourmalinecore.com`)
  })

  it(`
    GIVEN first name input 
    SHOULD display value 
    AFTER render`, () => {
    cy
      .getByData(`first-name`)
      .should(`have.value`, `TestName`)
  })

  it(`
    GIVEN last name input 
    SHOULD display value
    AFTER render`, () => {
    cy
      .getByData(`last-name`)
      .should(`have.value`, `TestLastName`)
  })

  it(`
    GIVEN middle name input 
    SHOULD display value
    AFTER render`, () => {
    cy
      .getByData(`middle-name`)
      .should(`have.value`, ``)
  })

  it(`
    GIVEN role checkbox 
    SHOULD be checked
    AFTER render`, () => {
    cy
      .get(`.tc-checkfield :checked`)
      .should(`be.checked`)
      .and(`have.value`, `on`)
  })

  it(`
    GIVEN edit account page 
    SHOULD render cancel button
    WHEN there is component`, () => {
    cy
      .getByData(`cancel-button`)
      .should(`exist`)
  })

  it(`
    GIVEN edit account page 
    SHOULD render save button
    WHEN there is component`, () => {
    cy
      .getByData(`save-button`)
      .should(`exist`)
  })
}

function mountComponent({
  isEditMode = false,
}: {
  isEditMode?: boolean,
}) {
  const createAccountState = new CreateOrEditAccountState()

  if (isEditMode) {
    createAccountState.setIsEditMode()
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
      />
    </CreateOrEditAccountStateContext.Provider>,
  )
}
