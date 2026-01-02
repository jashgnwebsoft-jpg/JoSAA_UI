import type {
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
  GridSortModel,
  GridValidRowModel,
} from '@mui/x-data-grid';

import { EntityId } from '../hooks/useListView';

export type SimpleDataGridProps<R extends GridValidRowModel = GridValidRowModel> = {
  currentPage: number;
  pageSize: number;
  handlePagination: (model: GridPaginationModel) => void;
  handleSorting: (model: GridSortModel) => void;
  rows?: GridRowsProp<R>;
  columns: readonly GridColDef<R>[];
  totalRecords?: number;
  isLoading: boolean;
};

export type DataModalSlotProps = {
  selectedRow?: EntityId | null;
  showModal: boolean;
  onClose?: () => void;
};
