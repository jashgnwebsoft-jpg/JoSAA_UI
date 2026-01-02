export interface RoleWiseOperationPermission {
  Get: boolean;
  Update: boolean;
  List: boolean;
}

export interface UserPermissions {
  Insert: boolean | undefined;
  Export: boolean | undefined;
  Create: boolean;
  Update: boolean;
  List: boolean;
  Delete: boolean;
  View: boolean;
  Options: boolean;
}

export interface RoleAllocationPermissions {
  Create: boolean;
  Update: boolean;
  List: boolean;
  Delete: boolean;
  View: boolean;
  Options: boolean;
}

export interface RolePermissions {
  Create: boolean;
  Update: boolean;
  List: boolean;
  Delete: boolean;
  View: boolean;
  Options: boolean;
}

export interface SettingPermissions {
  View: boolean;
  Upsert: boolean;
  List: boolean;
  Delete: boolean;
}

export interface LocalePermissions {
  Create: boolean;
  Update: boolean;
  List: boolean;
}

export interface Setting {
  List: boolean;
  Upsert: boolean;
  View: boolean;
}
