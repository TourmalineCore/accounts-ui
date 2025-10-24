type Accounts = {
  id: number,
  corporateEmail: string,
  creationDate: Date | string,
  canChangeAccountState: boolean,
  isBlocked: boolean,
  firstName: string,
  middleName?: string,
  lastName: string,
  tenantName: string,
  roles: {
    id: number,
    name: string,
    permissions: string[],
  }[],
};
