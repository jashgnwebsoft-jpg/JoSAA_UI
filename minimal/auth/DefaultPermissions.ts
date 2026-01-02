import type { GlobalPermissions } from '@core/auth';

export const DefaultPermissions: GlobalPermissions = {
  University: {
    Delete: false,
    Insert: false,
    Options: false,
    List: false,
    Get: false,
    View: false,
    Update: false,
    Export: false,
  },
  Locale: {
    Create: false,
    Update: false,
    List: false,
  },
  RoleWiseOperation: {
    Get: false,
    Update: false,
    List: false,
  },
  User: {
    Insert: undefined,
    Export: undefined,
    Create: false,
    Update: false,
    List: false,
    Delete: false,
    View: false,
    Options: false,
  },
  RoleAllocation: {
    Create: false,
    Update: false,
    List: false,
    Delete: false,
    View: false,
    Options: false,
  },
  Role: {
    Create: false,
    Update: false,
    List: false,
    Delete: false,
    View: false,
    Options: false,
  },
  Setting: {
    List: false,
    Upsert: false,
    View: false,
  },
};
