import type { SxProps } from '@mui/material';
import type { ReactNode, PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
  title?: string;
  icon?: ReactNode;
  open: boolean;
  onClose: () => void;
  isEditMode?: boolean;
  loading?: boolean;
  titleSx?: SxProps;
  headerSx?: SxProps;
  contentSx?: SxProps;
}>;
