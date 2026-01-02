import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Item
 */
export type NavItemRenderProps = {
  navIcon?: Record<string, React.ReactNode>;
  navInfo?: (val: string) => Record<string, React.ReactElement>;
};

export type NavItemStateProps = {
  open?: boolean;
  active?: boolean;
  disabled?: boolean;
};

export type NavItemSlotProps = {
  sx?: SxProps<Theme>;
  icon?: SxProps<Theme>;
  texts?: SxProps<Theme>;
  title?: SxProps<Theme>;
  caption?: SxProps<Theme>;
  info?: SxProps<Theme>;
  arrow?: SxProps<Theme>;
};

export type NavSlotProps = {
  rootItem?: NavItemSlotProps;
  subItem?: NavItemSlotProps;
  subheader?: SxProps<Theme>;
  dropdown?: {
    paper?: SxProps<Theme>;
  };
};

export type NavItemOptionsProps = {
  depth?: number;
  hasChild?: boolean;
  externalLink?: boolean;
  enabledRootRedirect?: boolean;
  render?: NavItemRenderProps;
  slotProps?: NavItemSlotProps;
};

export type NavItemDataProps = Pick<NavItemStateProps, 'disabled'> & {
  Path: string;
  Title: string;
  Icon?: string | React.ReactNode;
  Info?: string[] | React.ReactNode;
  Caption?: string;
  deepMatch?: boolean;
  allowedRoles?: string | string[];
  children?: NavItemDataProps[];
  Roles?: string[];
};

export type NavItemProps = ButtonBaseProps &
  NavItemDataProps &
  NavItemStateProps &
  NavItemOptionsProps;

/**
 * List
 */
export type NavListProps = Pick<NavItemProps, 'render' | 'depth' | 'enabledRootRedirect'> & {
  cssVars?: CSSObject;
  Data: NavItemDataProps;
  slotProps?: NavSlotProps;
  checkPermissions?: (allowedRoles?: NavItemProps['allowedRoles']) => boolean;
};

export type NavSubListProps = Omit<NavListProps, 'Data'> & {
  Data: NavItemDataProps[];
};

export type NavGroupProps = Omit<NavListProps, 'Data' | 'depth'> & {
  Subheader?: string;
  Items: NavItemDataProps[];
};

/**
 * Main
 */
export type NavSectionProps = React.ComponentProps<'nav'> &
  Omit<NavListProps, 'Data' | 'depth'> & {
    sx?: SxProps<Theme>;
    Data: {
      Subheader?: string;
      Items: NavItemDataProps[];
    }[];
  };
