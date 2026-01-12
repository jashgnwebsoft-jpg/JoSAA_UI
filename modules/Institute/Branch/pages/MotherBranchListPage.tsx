import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import { useMotherBranchListStore } from '../api/store';
import { useMotherBranchListQuery } from '../api/hooks';
import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { MotherBranchListRequest, MotherBranchListResponse } from '../types';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { CONFIG } from '@/global-config';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { dataGridStyles } from '@core/components/Styles';
import MainContent from '@core/components/MainContent/MainContent';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { paths } from '@/paths';
import { useTranslate } from '@minimal/utils/locales';

const MotherBranchListPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslate();

  const columns = useMemo<GridColDef<MotherBranchListResponse>[]>(
    () => [
      {
        field: 'SystemBranchProperName',
        headerName: t('Institute.Branch.BranchName.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
      },
      {
        field: 'Intake',
        headerName: t('Institute.IntakeCutoff.Intake.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'Colleges',
        headerName: t('Institute.College.List.Title'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 130,
        filterable: false,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        renderCell: params => {
          return (
            <Button
              variant='text'
              size='small'
              color='primary'
              onClick={() => {
                navigate(paths.josaa.systemBranchWiseCollege.root(params.row.SystemBranchID));
              }}
            >
              view
            </Button>
          );
        },
      },
    ],
    []
  );

  const { postModel, handlePagination, handleSorting } = useMotherBranchListStore();

  const { data, totalRecords, isLoading } = useMotherBranchListQuery(postModel);

  const toolbarProps: DataGridToolbarProps<MotherBranchListRequest, MotherBranchListResponse> = {
    toolbar: {
      columns,
      filterModel: postModel.filterModel ?? {},
      addNew: () => {},
      handleExport: () => {},
      showFilter: () => {},
      actionButtons: [],
      permissions: {
        showAdd: false,
        showExport: false,
        showFilter: false,
      },
    },
  };

  const footerProps: DataGridFooterProps = {
    footer: {
      actionButtons: [],
      totalCount: totalRecords,
    },
  };

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Institute.Branch.MotherBranch.Label') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <MainContent
        breadCrumbsProps={{
          heading: t('Institute.Branch.MotherBranch.Label'),
          links: [{ name: 'Home' }, { name: t('Institute.Branch.MotherBranch.Label') }],
        }}
      >
        <DataGridPro
          rows={data}
          density='compact'
          columns={columns}
          getRowId={row => row.SystemBranchID}
          paginationMode='server'
          sortingMode='server'
          localeText={{ noRowsLabel: 'No Data' }}
          disableColumnMenu={true}
          initialState={{
            pagination: {
              paginationModel: {
                page: postModel.pageOffset,
                pageSize: postModel.pageSize,
              },
            },
            sorting: {
              sortModel: postModel.sortModel,
            },
          }}
          onPaginationModelChange={handlePagination}
          onSortModelChange={handleSorting}
          rowCount={totalRecords}
          loading={isLoading}
          pageSizeOptions={CONFIG.defaultPageSizeOptions}
          disableRowSelectionOnClick
          slots={{
            toolbar: ExtendedDataGridToolbar,
            footer: ExtendedDataGridFooter,
          }}
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
            toolbar: toolbarProps,
            footer: footerProps,
          }}
          sx={{
            ...dataGridStyles,
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: theme => theme.palette.action.hover,
            },
            '& .MuiTablePagination-root': {
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
            },
            '& .MuiTablePagination-toolbar': {
              paddingLeft: { xs: 0 },
            },
            '& .MuiBox-root .css-1shozee': {
              display: 'none',
            },
          }}
        />
      </MainContent>
    </DashboardContent>
  );
};
export default MotherBranchListPage;
