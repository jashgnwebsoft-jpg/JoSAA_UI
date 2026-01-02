import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export type ModalComponentProps<TModel> = {
  data: TModel;
  invalidateQueries?: () => void;
  [key: string]: any; // Allow additional props for extensibility
};

// Base modal configuration
export interface BaseModalProps {
  open: boolean;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  handleClose: () => void;
  modalTitle: string;
  disableEscapeKeyDown?: boolean;
}

// Loading state configuration
export interface LoadingStateProps {
  isFetching: boolean;
  loadingComponent?: ReactNode;
}

// Header configuration
export interface HeaderProps {
  header?: ReactNode;
  toolbar?: ReactNode | ReactNode[]
}

// Footer configuration
export interface FooterProps {
  footer?: ReactNode;
  isFooterShow?: boolean;
  footerActions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    disabled?: boolean;
  }>;
}

// Content configuration
export interface ContentProps<TModel> {
  data: TModel | undefined;
  Component: React.FC<ModalComponentProps<TModel>>;
  contentSx?: SxProps<Theme>;
  invalidateQueries?: () => void;
  additionalProps?: Record<string, any>;
}

// Main props interface combining all configurations
export type ModalDialogProps<TModel> = BaseModalProps &
  LoadingStateProps &
  HeaderProps &
  FooterProps &
  ContentProps<TModel>;
