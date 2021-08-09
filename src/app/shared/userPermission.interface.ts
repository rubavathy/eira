export interface UserPermission {
  permissionId: number;
  permissionName: string;
  category: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
  permission: string;
}
