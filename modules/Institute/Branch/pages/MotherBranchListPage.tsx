import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import { useMotherBranchListStore } from '../api/store';
import { useMotherBranchListQuery } from '../api/hooks';
import { useEffect, useMemo, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { MotherBranchListRequest, MotherBranchListResponse } from '../types';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { CONFIG } from '@/global-config';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { josaaDataGridStyles } from '@core/components/Styles';
import MainContent from '@core/components/MainContent/MainContent';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { paths } from '@/paths';
import { useTranslate } from '@minimal/utils/locales';
import { fNumber } from '@core/utils/format-number';
import { Iconify } from '@minimal/components/iconify';
import TextHighlighter from '@modules/Institute/College/view/TextHighlighter';

const MotherBranchListPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const columns = useMemo<GridColDef<MotherBranchListResponse>[]>(
    () => [
      {
        field: 'SystemBranchProperName',
        headerName: t('Institute.Branch.BranchName.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        renderCell: params => (
          <Tooltip title={params.row.SystemBranchName}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                '&:hover': { cursor: 'pointer', color: 'primary.main' },
              }}
            >
              <Typography
                variant='body2'
                width='100%'
                // onClick={() =>
                //   navigate(paths.josaa.systemBranchWiseCollege.root(params.row.SystemBranchID))
                // }
                // sx={{ '&:hover': { cursor: 'pointer' } }}
              >
                <TextHighlighter
                  text={params.row.SystemBranchProperName}
                  highlight={debouncedSearch}
                />
              </Typography>
            </Box>
          </Tooltip>
        ),
      },
      {
        field: 'Intake',
        headerName: t('Institute.IntakeCutoff.Intake.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => <span>{fNumber(params.row.Intake)}</span>,
      },
      {
        field: 'Colleges',
        headerName: t('Institute.College.List.Title'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => <span>{fNumber(params.row.Colleges)}</span>,
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
              startIcon={<Iconify icon='solar:eye-bold' height={15} />}
              onClick={e => {
                e.stopPropagation();
                navigate(paths.josaa.systemBranchWiseCollege.root(params.row.SystemBranchID));
              }}
            >
              view
            </Button>
          );
        },
      },
    ],
    [t, debouncedSearch, navigate]
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    const s = debouncedSearch.toLowerCase();

    return data.filter(item => item.SystemBranchProperName.toLowerCase().includes(s));
  }, [debouncedSearch, data]);

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
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            size='small'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search branch name...'
            InputProps={{
              startAdornment: (
                <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', mr: 1 }} />
              ),
            }}
            sx={{ width: { xs: '100%', sm: 300 } }}
          />
        </Box>
        <DataGridPro
          rows={filteredData}
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
          onRowClick={params =>
            navigate(paths.josaa.systemBranchWiseCollege.root(params.row.SystemBranchID))
          }
          pageSizeOptions={CONFIG.defaultPageSizeOptions}
          getRowHeight={() => 'auto'}
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
            ...josaaDataGridStyles,
            // '& .MuiDataGrid-row:nth-of-type(even)': {
            //   backgroundColor: theme => theme.palette.action.hover,
            // },
            // '& .MuiTablePagination-root': {
            //   justifyContent: { xs: 'flex-start', md: 'flex-end' },
            // },
            // '& .MuiTablePagination-toolbar': {
            //   paddingLeft: { xs: 0 },
            // },
            // '& .MuiBox-root .css-1shozee': {
            //   display: 'none',
            // },
          }}
        />
      </MainContent>
    </DashboardContent>
  );
};
export default MotherBranchListPage;
