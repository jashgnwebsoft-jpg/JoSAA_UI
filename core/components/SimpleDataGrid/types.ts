import type { SxProps } from '@mui/material';
import type {
  DataGridProProps,
  FooterPropsOverrides,
  GridCellParams,
  GridColDef,
  GridColumnGroupingModel,
  GridColumnVisibilityModel,
  GridPaginationModel,
  GridRowIdGetter,
  GridRowsProp,
  GridSlotProps,
  GridSortModel,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import type { ReactNode } from 'react';

export type PostModel<TFilterModel> = {
  filterModel?: TFilterModel;
  pageOffset: number;
  pageSize: number;
  sortField: string | null;
  sortOrder: 'asc' | 'desc' | null | undefined;
  sortModel?: GridSortModel;
};

export type ActionButtonProps = {
  icon?: ReactNode;
  label?: string;
  tooltip?: string;
  action?: () => void;
  sx?: SxProps;
  visible?: boolean;
  variant?: 'contained' | 'outlined' | 'soft' | 'text';
  type?: 'button' | 'reset' | 'submit';
};

export type PermissionProps = {
  showExport?: boolean;
  showFilter?: boolean;
  showAdd?: boolean;
};

export type SimpleDataGridProps<TModel extends GridValidRowModel = any> = {
  rows: GridRowsProp<TModel>;
  columns: GridColDef<TModel>[];
  handlePagination?: (pageModel: GridPaginationModel) => void;
  handleSorting?: (sortModel: GridSortModel) => void;
  handleCellClick?: (params: GridCellParams<TModel>) => void;
  setRowId?: (id: number) => void;
  setViewOpen?: (viewOpen: boolean) => void;

  getRowId: GridRowIdGetter<TModel>;
  pageSizeOptions?: ReadonlyArray<
    | number
    | {
        value: number;
        label: string;
      }
  >;

  toolBar: {
    toolbarActions?: ActionButtonProps[];
    handleExport?: ((selectedFields: string[]) => void) | undefined;
  };

  footer: {
    footerActions?: ActionButtonProps[];
    onBulkUpdate?: () => void;
    onEmailSend?: () => void;
    onBulkDelete?: () => Promise<Response>;
    bulkDeleteHeader?: string;
  };

  totalCount: number;

  columnGroupingModel?: GridColumnGroupingModel;

  showAdd?: boolean;

  showExport?: boolean;
  showColumn?: boolean;
  showSearch?: boolean;
  showBulkUpdate?: boolean;
  showEmail?: boolean;
  showMultipleDelete?: boolean;
  showInDrawer?: boolean;
  showDataGridFooter?: boolean;
  showCheckBoxSelection?: boolean;

  columnVisibilityModel?: GridColumnVisibilityModel;
  datagridSx?: SxProps;
  loading?: boolean;
  rowHeight?: number;
  leftPin?: string;
  rightPin?: string;
};

export type DataGridFooterProps = Omit<GridSlotProps['footer'], 'footer'> & {
  footer?: {
    actionButtons: ActionButtonProps[];
    totalCount?: number;
  };
} & FooterPropsOverrides;

export type DataGridToolbarProps<TFilterModel, TModel extends GridValidRowModel = any> = Omit<
  DataGridProProps['slotProps'],
  'toolbar'
> & {
  toolbar?: {
    columns: GridColDef<TModel>[];
    handleExport?: (selectedFields: string[], filterModel: TFilterModel) => void;
    actionButtons?: ActionButtonProps[];
    addNew: () => void;
    showFilter?: () => void;
    filterModel: TFilterModel;
    permissions?: PermissionProps;
    extraMainButtons?: ActionButtonProps[];
  };
};

export type SimpleFormProps<TModel> = {
  open: boolean;
  isFetching: boolean;
  Component?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  title: string;
  subTitle?: string | null;
  icon?: ReactNode;
  titleSx?: SxProps;
  headerSx?: SxProps;
  contentSx?: SxProps;
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
  fullScreen?: boolean;
};

export type FilterProps<TFilterModel> = {
  handleFiltering: (pageModel: TFilterModel) => void;
  postModel: PostModel<TFilterModel>;
};
