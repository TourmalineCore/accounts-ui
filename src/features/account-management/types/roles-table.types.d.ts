type Permission = {
  id: number;
  name: string;
};

type PermissionGroup = {
  groupName: string;
  permissions: Permission[];
};
