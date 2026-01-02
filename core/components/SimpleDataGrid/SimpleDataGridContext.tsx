import type { SxProps } from '@mui/material';
import type { GridRowSelectionModel } from '@mui/x-data-grid-pro';
import type { PropsWithChildren, ReactNode } from 'react';

import { createContext, useCallback, useContext, useState } from 'react';

interface CommandButtonProps {
  readonly icon?: ReactNode;
  readonly label?: string;
  readonly tooltip?: string;
  readonly action?: () => void;
  readonly sx?: SxProps;
}

interface SimpleDataGridState {
  readonly footerActionButtons: CommandButtonProps[] | undefined;
  readonly setFooterActionButtons: (buttons: CommandButtonProps[]) => void;

  readonly actionButtons: CommandButtonProps[] | undefined;
  readonly setActionButtons: (buttons: CommandButtonProps[]) => void;

  readonly rowId: string;
  readonly setRowId: (rowId: string) => void;

  readonly showFilter: boolean;
  readonly setShowFilter: (rowId: boolean) => void;

  readonly showDrawer: boolean;
  readonly setShowDrawer: (rowId: boolean) => void;

  readonly selectedColumns: GridRowSelectionModel | undefined;
  readonly setSelectedColumns: (selectedColumns: GridRowSelectionModel) => void;

  readonly filterValues: Record<string, Record<string, string | number>> | undefined;
  readonly setFilterValues: (
    filterValues: Record<string, Record<string, string | number>> | undefined
  ) => void;

  readonly clearAll: boolean;
  readonly setClearAll: (clearAll: boolean) => void;
}

const SimpleDataGridContext = createContext<SimpleDataGridState | undefined>(undefined);

type SimpleDataGridProviderProps = PropsWithChildren & {};

export const SimpleDataGridProvider: React.FC<SimpleDataGridProviderProps> = ({ children }) => {
  const [rowId, setRowId] = useState<string>('');
  const [footerActionButtons, setFooterActionButtons] = useState<CommandButtonProps[] | undefined>(
    []
  );
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(true);
  const [actionButtons, setActionButtons] = useState<CommandButtonProps[] | undefined>([]);
  const [selectedColumns, setSelectedColumns] = useState<GridRowSelectionModel | undefined>();
  const [filterValues, setFilterValuesState] = useState<
    Record<string, Record<string, string | number>> | undefined
  >();
  const [clearAll, setClearAll] = useState<boolean>(false);

  const setFilterValues = useCallback(
    (val: Record<string, Record<string, string | number>> | undefined) => {
      setFilterValuesState(val);
    },
    []
  );

  const value: SimpleDataGridState = {
    footerActionButtons,
    setFooterActionButtons: (buttons: CommandButtonProps[]) => setFooterActionButtons(buttons),
    actionButtons,
    setActionButtons: (buttons: CommandButtonProps[]) => setActionButtons(buttons),
    rowId,
    setRowId,
    selectedColumns,
    setSelectedColumns: (row: GridRowSelectionModel) => setSelectedColumns(row),
    filterValues,
    setFilterValues,
    clearAll,
    setClearAll,
    showFilter,
    setShowFilter,
    showDrawer,
    setShowDrawer,
  };

  return <SimpleDataGridContext.Provider value={value}>{children}</SimpleDataGridContext.Provider>;
};

export const useSimpleDataGrid = (): SimpleDataGridState => {
  const context = useContext(SimpleDataGridContext);
  if (!context) {
    throw new Error('useSimpleDataGrid must be used within a SimpleDataGridProvider');
  }
  return context;
};
