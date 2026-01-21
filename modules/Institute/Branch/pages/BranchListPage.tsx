import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { BranchListRequest, BranchListResponse } from '../types';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import { useBranchListStore } from '../api/store';
import { useBranchListQuery } from '../api/hooks';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { CONFIG } from '@/global-config';
import MainContent from '@core/components/MainContent/MainContent';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { josaaDataGridStyles } from '@core/components/Styles';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Helmet } from 'react-helmet-async';
import { paths } from '@/paths';
import { useTranslate } from '@minimal/utils/locales';
import { toast } from 'sonner';
import { fNumber } from '@core/utils/format-number';
import { Iconify } from '@minimal/components/iconify';
import TextHighlighter from '@modules/Institute/College/view/TextHighlighter';

const BranchListPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

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
        renderHeader: () => (
          <div
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.Branch.BranchName.Label')}
          </div>
        ),
        cellClassName: 'first-column',
        renderCell: params => (
          <Tooltip title={params.row.BranchWebName}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                '&:hover': { cursor: 'pointer', color: 'primary.main' },
              }}
            >
              <Typography
                variant='body2'
                width='100%'
                // onClick={() => navigate(paths.josaa.branchWiseCollege.root(params.row.BranchID))}
                // sx={{ '&:hover': { cursor: 'pointer' } }}
              >
                <TextHighlighter text={params.row.BranchProperName} highlight={debouncedSearch} />
              </Typography>
            </Box>
          </Tooltip>
        ),
      },
      {
        field: 'SystemBranchProperName',
        headerName: t('Institute.Branch.MotherBranch.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.Branch.MotherBranch.Label')}
          </div>
        ),
        cellClassName: 'first-column',
        renderCell: params => (
          <Tooltip title={params.row.SystemBranchName}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                '&:hover': { cursor: 'pointer', color: 'primary.main' },
              }}
            >
              <Typography
                variant='body2'
                width='100%'
                onClick={e => {
                  e.stopPropagation();
                  navigate(paths.josaa.systemBranchWiseCollege.root(params.row.SystemBranchID));
                }}
                sx={{ '&:hover': { cursor: 'pointer' } }}
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
        flex: 0.3,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.IntakeCutoff.Intake.Label')}
          </div>
        ),
        renderCell: params => <span>{fNumber(params.row.Intake)}</span>,
      },
      {
        field: 'Colleges',
        headerName: t('Institute.College.List.Title'),
        minWidth: 120,
        flex: 0.3,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.College.List.Title')}
          </div>
        ),
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
                navigate(paths.josaa.branchWiseCollege.root(params.row.BranchID));
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

  const { postModel, handlePagination, handleSorting } = useBranchListStore();

  const { data, totalRecords, isLoading, error } = useBranchListQuery(postModel);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (!isLoading && data.length === 0) {
      toast.info('No data present');
    }
  }, [data, error, isLoading]);

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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    const s = debouncedSearch.toLowerCase();

    return data.filter(
      item =>
        item.BranchProperName?.toLowerCase().includes(s) ||
        item.SystemBranchProperName.toLowerCase().includes(s)
    );
  }, [debouncedSearch, data]);

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
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            size='small'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search branch ,mother branch ...'
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
          getRowId={row => row.BranchID}
          paginationMode='server'
          sortingMode='server'
          localeText={{ noRowsLabel: 'No Data' }}
          disableColumnMenu={true}
          onRowClick={params => navigate(paths.josaa.branchWiseCollege.root(params.row.BranchID))}
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
            pinnedColumns: { left: ['BranchProperName'] },
          }}
          onPaginationModelChange={handlePagination}
          onSortModelChange={handleSorting}
          rowCount={totalRecords}
          loading={isLoading}
          pageSizeOptions={CONFIG.defaultPageSizeOptions}
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
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
            // '& .MuiDataGrid-cell': {
            //   padding: 1,
            //   display: 'flex',
            //   alignItems: 'center',
            // },
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
export default BranchListPage;
