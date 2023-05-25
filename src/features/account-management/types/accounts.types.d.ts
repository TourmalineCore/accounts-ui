type AccountCreate = {
  firstName: string;
  lastName: string;
  middleName?: string;
  corporateEmail: string;
  roleIds: number[];
};

type AccountEdit = {
  corporateEmail: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  roles: {
    id: number;
    name: string;
    permissions: string[];
  }[]
};

type Accounts = {
  id: number;
  corporateEmail: string;
  creationDate: Date | string;
  isBlocked?: boolean;
  firstName: string;
  middleName?: string;
  lastName: string;
  roles: {
    id: number;
    name: string;
    permissions: string[];
  }[];
};
