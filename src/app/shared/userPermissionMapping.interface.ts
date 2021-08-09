export interface UserPermissionMappingData {
  permissions: string;
  permissionsList: number[];
  active: boolean;
  mapId: number;
  userRole: {
    active: boolean;
    description: string;
    roleId: number;
    roleName: string;
  };
}
