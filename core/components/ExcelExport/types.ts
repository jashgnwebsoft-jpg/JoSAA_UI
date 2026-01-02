import type { DialogProps } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid-pro';

export type ExportExcelDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  onClose: () => void;
  title: React.ReactNode;
  action: React.ReactNode;
  content?: React.ReactNode;

  columns: GridColDef[];
  selectedColumns: string[];
  setSelectedColumns: (cols: string[]) => void;
};
