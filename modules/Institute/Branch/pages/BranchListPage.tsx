import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { BranchListRequest, BranchListResponse } from '../types';
import { Button } from '@mui/material';
import { useBranchListStore } from '../api/store';
import { useBranchListQuery } from '../api/hooks';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { CONFIG } from '@/global-config';
import MainContent from '@core/components/MainContent/MainContent';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { dataGridStyles } from '@core/components/Styles';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Helmet } from 'react-helmet-async';
import { paths } from '@/paths';
import { useTranslate } from '@minimal/utils/locales';

const BranchListPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslate();

  const columns = useMemo<GridColDef<BranchListResponse>[]>(
    () => [
      // {
      //   field: 'BranchAdmissionCode',
      //   headerName: t('Institute.Branch.BranchAdmissionCode.Label'),
      //   minWidth: 120,
      //   flex: 0.3,
      //   sortable: true,
      // },
      {
        field: 'BranchProperName',
        headerName: t('Institute.Branch.BranchName.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
      },
      {
        field: 'SystemBranchProperName',
        headerName: t('Institute.Branch.MotherBranch.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
      },
      {
        field: 'Intake',
        headerName: t('Institute.IntakeCutoff.Intake.Label'),
        minWidth: 120,
        flex: 0.3,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'Colleges',
        headerName: t('Institute.College.List.Title'),
        minWidth: 120,
        flex: 0.3,
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
                navigate(paths.josaa.branchWiseCollege.root(params.row.BranchID));
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

  const { postModel, handlePagination, handleSorting } = useBranchListStore();

  const { data, totalRecords, isLoading } = useBranchListQuery(postModel);

  const toolbarProps: DataGridToolbarProps<BranchListRequest, BranchListResponse> = {
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
        <title>{t('Institute.Branch.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <MainContent
        breadCrumbsProps={{
          heading: t('Institute.Branch.List.Title'),
          links: [{ name: 'Home' }, { name: t('Institute.Branch.List.Title') }],
        }}
      >
        <DataGridPro
          rows={data}
          columns={columns}
          getRowId={row => row.BranchID}
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
          sx={dataGridStyles}
        />
      </MainContent>
    </DashboardContent>
  );
};
export default BranchListPage;
