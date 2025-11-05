import { AccountsContainer } from './AccountsContainer'
import { AccountsState } from './state/AccountsState'
import { AccountsStateContext } from './state/AccountsStateContext'

const initialData: Accounts[] = [
  {
    id: 7,
    corporateEmail: `1@tourmalinecore.com`,
    creationDate: `2024-02-12T08:14:21.32782Z`,
    firstName: `1`,
    lastName: `1`,
    middleName: `1`,
    isBlocked: false,
    tenantName: `Black`,
    roles: [
      {
        id: 2,
        name: `Employee`,
        permissions: [
          `ViewPersonalProfile`,
          `ViewContacts`,
          `ViewAccounts`,
        ],
      },
    ],
    canChangeAccountState: true,
  },
  {
    id: 9,
    corporateEmail: `2@tourmalinecore.com`,
    creationDate: `2024-02-12T08:14:21.32782Z`,
    firstName: `2`,
    lastName: `2`,
    middleName: `2`,
    isBlocked: false,
    canChangeAccountState: false,
    tenantName: `Blue`,
    roles: [
      {
        id: 2,
        name: `Employee`,
        permissions: [
          `ViewPersonalProfile`,
          `ViewContacts`,
          `ViewAccounts`,
        ],
      },
    ],
  },
]

describe(`AccountsContainer`, () => {
  beforeEach(() => {
    cy.viewport(2400, 780)
  })

  it(`
  GIVEN accounts page 
  WHEN visit accounts page
  SHOULD render accounts page content 
  `, () => {
    mountComponent({
      accounts: initialData,
    })

    cy.getByData(`accounts-page-content`)
      .should(`exist`)
  })

  it(`
  GIVEN accounts page content
  WHEN visit accounts page
  SHOULD render column with tenant 
  `, () => {
    context(`desktop resolution`, () => {
      mountComponent({
        accounts: initialData,
      })

      cy.getByData(`accounts-page-tenant-column`)
        .should(`exist`)
        .first()
        .should(`have.text`, `Black`)
    })
  })

  it(`
  GIVEN accounts page content
  WHEN click on actions menu
  SHOULD render edit, block and unblock account action if there is a solution for this
  `, () => {
    context(`desktop resolution`, () => {
      mountComponent({
        accounts: initialData,
      })

      cy
        .get(`:nth-child(1) > .tc-table-desktop__action-cell > .tc-table-desktop-actions-dropdown > .tc-table-desktop-actions-dropdown__button`)
        .click()
      cy
        .get(`.tc-table-desktop-actions-dropdown__list`)
        .children()
        .first()
        .should(`have.text`, `Edit`)
      cy
        .get(`.tc-table-desktop-actions-dropdown__list`)
        .children()
        .last()
        .should(`have.text`, `Block`)

      cy
        .get(`:nth-child(2) > .tc-table-desktop__action-cell`)
        .children()
        .should(`not.exist`)
    })
  })
  it(`
  GIVEN accounts page content
  WHEN block account
  SHOULD change account's status and add actions unblock
  `, () => {
    context(`desktop resolution`, () => {
      mountComponent({
        accounts: initialData,
      })

      cy
        .get(`:nth-child(1) > .tc-table-desktop__action-cell > .tc-table-desktop-actions-dropdown > .tc-table-desktop-actions-dropdown__button`)
        .click()
      cy
        .get(`.tc-table-desktop-actions-dropdown__list`)
        .children()
        .last()
        .should(`have.text`, `Block`)
        .click()

      cy
        .getByData(`accounts-page-status-column`)
        .should(`exist`)
        .first()
        .should(`have.text`, `Blocked`)

      cy
        .get(`#block`)
        .click()
      cy
        .getByData(`accounts-page-tenant-column`)
        .should(`exist`)
        .should(`have.length`, `1`)
        .should(`have.text`, `Black`)

      cy
        .get(`:nth-child(1) > .tc-table-desktop__action-cell > .tc-table-desktop-actions-dropdown > .tc-table-desktop-actions-dropdown__button`)
        .click()
      cy
        .get(`.tc-table-desktop-actions-dropdown__list`)
        .children()
        .should(`have.text`, `Unblock`)
        .click()

      cy
        .getByData(`accounts-page-tenant-column`)
        .should(`have.length`, `0`)
    })
  })
})

function mountComponent({
  accounts,
}: {
  accounts: Accounts[],
}) {
  const accountsState = new AccountsState()

  accountsState.getAccounts(accounts)
  cy.mount(
    <AccountsStateContext.Provider value={accountsState}>
      <AccountsContainer />
    </AccountsStateContext.Provider>,

  )
}
