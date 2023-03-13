export type AccountCreate = {
  firstName: string;
  lastName: string;
  middleName?: string;
  corporateEmail: string;
  roleIds: number[];
};

export type Accounts = {
  id: number;
  corporateEmail: string;
  creationDate: Date;
  firstName: string;
  middleName?: string;
  lastName: string;
  roles: {
    id: number;
    name: string;
  }[];
};
