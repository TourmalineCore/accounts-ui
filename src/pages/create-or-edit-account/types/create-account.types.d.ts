type AccountCreate = {
  firstName: string,
  lastName: string,
  middleName?: string,
  corporateEmail: string,
  roleIds: number[],
  tenantId?: string
};

type AccountEdit = {
  corporateEmail: string,
  firstName: string,
  lastName: string,
  middleName?: string,
  roles: {
    id: number,
    name: string,
    permissions: string[],
  }[],
};
