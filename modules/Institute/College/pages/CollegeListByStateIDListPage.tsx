import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useCollegeListByStateIDListStore } from '../api/store';
import { useCollegeListByStateIDQuery } from '../api/hooks';
import { useTranslate } from '@minimal/utils/locales';
import { useMemo } from 'react';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import {
  CollegeListByStateIDListPageRequest,
  CollegeListByStateIDListPageResponse,
} from '../types';
import { paths } from '@/paths';
import { Iconify } from '@minimal/components/iconify';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from '@/global-config';
import MainContent from '@core/components/MainContent/MainContent';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { josaaDataGridStyles } from '@core/components/Styles';
import { DataGridPro } from '@mui/x-data-grid-pro';
import CollegeCommanDataGrid from '../view/CollegeCommanDataGrid';

const CollegeListByStateIDListPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { stateID } = useParams();

  const { postModel, handleFiltering, handlePagination, handleSorting } =
    useCollegeListByStateIDListStore();
  const updateModel = { ...postModel, stateID: stateID };
  const { data, isLoading, totalRecords } = useCollegeListByStateIDQuery(updateModel);

  const columns = useMemo<GridColDef<CollegeListByStateIDListPageResponse>[]>(
    () => [
      {
        field: 'CollegeShortName',
        headerName: t('Institute.College.College.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              height: '100%',
            }}
          >
            <Typography
              variant='body2'
              width='100%'
              onClick={() => navigate(paths.josaa.collegeinformation.root(params.row.CollegeID))}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              {params.row.CollegeShortName}
            </Typography>
            <Typography variant='caption'>{params.row.CollegeName}</Typography>
          </Box>
        ),
      },
      {
        field: 'CollegeAdmissionCode',
        headerName: t('Institute.College.AdmissionCode.Label'),
        minWidth: 120,
        flex: 0.3,
        sortable: true,
        renderCell: params => <span>{params.row.CollegeAdmissionCode ?? '-'}</span>,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'NIRFRank',
        headerName: t('Institute.College.NIRFRank.Label'),
        minWidth: 120,
        flex: 0.3,
        sortable: true,
        renderCell: params => <span>{params.row.NIRFRank ?? '-'}</span>,
        align: 'right',
        headerAlign: 'right',
      },
      // {
      //   field: 'StateName',
      //   headerName: t('Institute.College.State.Label'),
      //   minWidth: 120,
      //   flex: 0.5,
      //   sortable: true,
      // },
      {
        field: 'Phone',
        headerName: t('Institute.College.Phone.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <span style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {params.row.Phone.split(',').map((item: string) => (
              <Typography
                variant='body2'
                component='a'
                href={`tel:${item}`}
                color='textPrimary'
                sx={{ textDecoration: 'none' }}
              >
                {item}
              </Typography>
            ))}
          </span>
        ),
      },
      {
        field: 'Email',
        headerName: t('Institute.College.Email.Label'),
        minWidth: 120,
        flex: 0.5,
        cellClassName: 'first-column',
        sortable: true,
        renderCell: params => (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
            {params.row.Email.split(',').map((item: string) => (
              <Typography
                variant='body2'
                component='a'
                color='textPrimary'
                href={`mailto:${item}`}
                sx={{ textDecoration: 'none' }}
              >
                {item}
              </Typography>
            ))}
          </span>
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 220,
        filterable: false,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        renderCell: params => (
          <Button
            variant='text'
            color='primary'
            size='small'
            startIcon={<Iconify icon='solar:eye-bold' height={15} />}
            onClick={() => navigate(paths.josaa.collegeinformation.root(params.row?.CollegeID))}
          >
            View Deatils
          </Button>
        ),
      },
    ],
    []
  );

  const toolbarProps: DataGridToolbarProps<
    CollegeListByStateIDListPageRequest,
    CollegeListByStateIDListPageResponse
  > = {
    toolbar: {
      columns,
      filterModel: (postModel.filterModel ?? updateModel)!,
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
    <DashboardContent sx={{ px: { xs: 0, md: 3 } }}>
      <Helmet>
        <title>{t('Institute.College.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>

      <MainContent
        breadCrumbsProps={{
          heading: t('Institute.College.List.Title') + ' : ' + data?.[0]?.StateName,
          links: [{ name: 'Home' }, { name: t('Institute.College.List.Title') }],
        }}
      >
        {/* <DataGridPro
          rows={data}
          density='compact'
          columns={columns}
          getRowId={row => row.CollegeID}
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
            pinnedColumns: { left: ['CollegeShortName'] },
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
            height: { xs: 530, md: 620 },
          }}
        /> */}
        <CollegeCommanDataGrid
          postModel={postModel}
          totalRecords={totalRecords}
          data={data}
          handleFiltering={handleFiltering}
          handlePagination={handlePagination}
          handleSorting={handleSorting}
          isLoading={isLoading}
        />
      </MainContent>
    </DashboardContent>
  );
};
export default CollegeListByStateIDListPage;
