import {
  LocalePermissions,
  RolePermissions,
  UniversityPermissions,
  RoleAllocationPermissions,
  RoleWiseOperationPermission,
  UserPermissions,
  Setting,
} from './permissions';

export interface GlobalPermissions {
  University: UniversityPermissions;
  RoleWiseOperation: RoleWiseOperationPermission;
  User: UserPermissions;
  RoleAllocation: RoleAllocationPermissions;
  Role: RolePermissions;
  Locale: LocalePermissions;
  Setting: Setting;
}
