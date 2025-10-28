import { API_ROOT, LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import '../../../cypress/support/commands'
import { CreateOrEditAccountStateContext } from './state/CreateOrEditAccountStateContext'
import { CreateOrEditAccountState } from './state/CreateOrEditAccountState'
import { CreateOrEditAccountContent } from './CreateOrEditAccountContent'

const START_ROOT_TENANTS_ALL = `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}tenants/all`
const START_ROOT_ROLES = `${API_ROOT}${LINK_TO_ACCOUNT_SERVICE}roles`

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

    mountComponent()
  })

  it(`
  GIVEN create account page 
  WHEN visit account page
  SHOULD render account page content `, () => {
    mountComponent()

    cy.getByData(`create-account-page`)
      .should(`exist`)

    cy.getByData(`create-account-page-input-firstName`)
      .should(`exist`)

    cy.getByData(`create-account-page-input-middleName`)
      .should(`exist`)

    cy.getByData(`create-account-page-input-lastName`)
      .should(`exist`)

    cy.getByData(`create-account-page-input-email`)
      .should(`exist`)

    cy.getByData(`create-account-page-select-tenant`)
      .should(`exist`)

    cy.getByData(`create-account-page-button-cancel`)
      .should(`exist`)
      .should(`have.text`, `Cancel`)

    cy.getByData(`create-account-page-button-add`)
      .should(`exist`)
      .should(`have.text`, `Add`)
  })
  
  it(`
  GIVEN create account page 
  WHEN visit account page
  SHOULD render a select with data about tenants`, () => {
    cy.getByData(`create-account-page-select-tenant`)
      .should(`exist`)
      .select(`Black`)
  })
})

function mountComponent(isEditMode = false) {
  const createAccountState = new CreateOrEditAccountState()

  createAccountState.setTenantsData(MOCK_DATA_TENANTS)
  createAccountState.setRolesData({
    1: `CEO`,
  })

  const mockCreateAccount = cy.stub().as('createAccount')
  const mockEditAccount = cy.stub().as('editAccount')

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
