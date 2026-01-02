import { GlobalPermissions } from '@core/auth';
import { NavSectionProps } from '../components/nav-section';

export type UserType = Record<string, any> | null;

export type AuthState = {
  User: UserType;
  Menu: NavSectionProps['Data'] | null;
  loading: boolean;
  UserPermissions: GlobalPermissions;
};

export type LoginResponse = {
  AccessToken: string;
  User: UserType;
  Menu: NavSectionProps['Data'] | null;
  loading: boolean;
  UserPermissions: GlobalPermissions;
};

export type AuthContextValue = {
  User: UserType;
  loading: boolean;
  Menu: NavSectionProps['Data'] | null;
  UserPermissions: GlobalPermissions;
  authenticated: boolean;
  unauthenticated: boolean;
  studentAuthenticated: boolean;
  studentUnauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
