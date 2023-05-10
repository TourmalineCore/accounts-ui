type Permission = {
  id: string;
  name: string;
};

type PermissionGroup = {
  groupName: string;
  children: Permission[];
};

type RolePermission = {
  id: number;
  name: string;
  permissions: string[];
};
