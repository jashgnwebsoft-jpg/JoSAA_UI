import {
  Box,
  Button,
  CardContent,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useReportingCenterListStore } from '../api/store';
import { useReportingCenterListQuery } from '../api/hooks';
import { ReportingCenterListRequest, ReportingCenterListResponse } from '../types';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { paths } from '@/paths';
import { useCollegeTypeOptions } from '@modules/Institute/College/api/hooks';
import { Iconify } from '@minimal/components/iconify';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';
import { GridColDef } from '@mui/x-data-grid';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import MainContent from '@core/components/MainContent/MainContent';
import { SimpleTabs } from '@core/components';
import { DataGridPro } from '@mui/x-data-grid-pro';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { josaaDataGridStyles } from '@core/components/Styles';
import TextHighlighter from '@modules/Institute/College/view/TextHighlighter';

const ReportingCenterListPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { postModel, handlePagination, handleFiltering, handleSorting } =
    useReportingCenterListStore();
  const { data, totalRecords, isLoading } = useReportingCenterListQuery(postModel);
  const { data: collegeOptions } = useCollegeTypeOptions();

  const columns = useMemo<GridColDef<ReportingCenterListResponse>[]>(
    () => [
      // {
      //   field: 'CollegeAdmissionCode',
      //   headerName: t('Institute.College.AdmissionCode.Label'),
      //   minWidth: 120,
      //   flex: 0.5,
      //   sortable: true,
      //   align: 'right',
      //   headerAlign: 'right',
      // },
      {
        field: 'ReportingCentreName',
        headerName: t('Institute.ReportingCenter.ReportingCenterName.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <Tooltip title={params.row.CollegeName}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <Typography variant='body2' width='100%' sx={{ '&:hover': { cursor: 'pointer' } }}>
                <TextHighlighter
                  text={params.row.ReportingCentreName}
                  highlight={debouncedSearch}
                />
              </Typography>
            </Box>
          </Tooltip>
        ),
      },
      {
        field: 'Phone',
        headerName: t('Institute.College.Phone.Label'),
        minWidth: 120,
        flex: 0.7,
        sortable: true,
        renderCell: params => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={e => e.stopPropagation()}
          >
            {params.row.Phone === null
              ? '-'
              : params.row.Phone.split(',').map((item: string) => (
                  <Typography
                    key={item}
                    variant='body2'
                    component='a'
                    href={`tel:${item}`}
                    color='inherit'
                    sx={{ textDecoration: 'none' }}
                  >
                    {item}
                  </Typography>
                ))}
          </Box>
        ),
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'Fax',
        headerName: t('Institute.College.Fax.Label'),
        minWidth: 120,
        flex: 0.7,
        sortable: true,
        renderCell: params => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={e => e.stopPropagation()}
          >
            {params.row.Fax === null
              ? '-'
              : params.row.Fax.split(',').map((item: string) => (
                  <Typography
                    variant='body2'
                    component='a'
                    href={`tel:${item}`}
                    color='inherit'
                    sx={{ textDecoration: 'none' }}
                  >
                    {item}
                  </Typography>
                ))}
          </Box>
        ),
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'Website',
        headerName: t('Institute.College.Website.Label'),
        minWidth: 120,
        flex: 0.7,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <Typography
            component='a'
            href={params.row.Website ? `https://${params.row.Website}` : '#'}
            target='_blank'
            sx={{ textDecoration: 'none', width: '100%', height: '100%' }}
            color='primary'
            onClick={e => e.stopPropagation()}
          >
            <TextHighlighter text={params.row.Website ?? '-'} highlight={debouncedSearch} />
          </Typography>
        ),
      },
      {
        field: 'Address',
        headerName: t('Institute.College.Address.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        renderCell: params => (
          <Box sx={{ width: '100%', '&:hover': { color: 'primary.main' } }}>
            <TextHighlighter text={params.row.Address ?? '-'} highlight={debouncedSearch} />
          </Box>
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
            onClick={e => {
              e.stopPropagation();
              params.row.CollegeID &&
                navigate(paths.josaa.collegeinformation.root(params.row.CollegeID));
            }}
          >
            View
          </Button>
        ),
      },
    ],
    [t, navigate, debouncedSearch]
  );

  const toolbarProps: DataGridToolbarProps<
    ReportingCenterListRequest,
    ReportingCenterListResponse
  > = {
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

  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    handlePagination({
      page: newPage - 1,
      pageSize: rowsPerPage,
    });
  };

  useEffect(() => {
    const labelMap: Record<number, string | null> = {
      1: 'IIT',
      2: null,
    };
    const label = labelMap[currentTab];
    const type = label ? collegeOptions?.find(opt => opt.Label === label)?.Value : null;
    handleFiltering({
      ...postModel.filterModel,
      CollegeTypeID: type,
    });
    handlePagination({
      page: 0,
      pageSize: rowsPerPage,
    });
  }, [collegeOptions, currentTab]);

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
      (item: ReportingCenterListResponse) =>
        item.ReportingCentreName?.toLowerCase().includes(s) ||
        item.Address?.toLowerCase().includes(s) ||
        item.Website?.toString().includes(s)
    );
  }, [debouncedSearch, data]);

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Institute.ReportingCenter.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      {/* <SimpleBreadcrumbs
        heading={t('Institute.ReportingCenter.List.Title')}
        links={[{ name: 'Home' }, { name: t('Institute.ReportingCenter.List.Title') }]}
      />
      <MyPage
        totalRecords={totalRecords}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={[
          { label: 'IIT', value: 1 },
          { label: 'NIT, IIIT & GFTI', value: 2 },
        ]}
        pagination={{
          page: page,
          handleChangePage: handleChangePage,
          totalRecords: totalRecords,
          rowsPerPage: rowsPerPage,
        }}
        action={
          <TextField
            name='search'
            placeholder='Search...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Iconify icon='eva:search-fill' />,
            }}
            size='small'
          />
        }
        contentSx={{
          height: 'calc(100dvh - 310px)',
          overflow: 'auto',
          pt: '1rem',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <TabPanel value={1} sx={{ p: 0 }}>
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {filteredData.map((data: ReportingCenterListResponse) => (
              <MyCard
                city={null}
                rank={data?.CollegeAdmissionCode}
                key={data?.ReportingCentreID}
                shortName={data?.ReportingCentreName}
                location={data?.Address}
                otherElement={
                  <>
                    {data?.Phone && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='bxs:phone-call' />
                        {data?.Phone}
                      </Box>
                    )}
                    {data?.Fax && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='material-symbols:fax' />
                        {data?.Fax}
                      </Box>
                    )}
                    {data?.Website && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='ri:global-fill' />
                        {data?.Website}
                      </Box>
                    )}
                  </>
                }
                onClick={() =>
                  data?.CollegeID && navigate(paths.josaa.collegeinformation.root(data?.CollegeID))
                }
              />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={2} sx={{ p: 0 }}>
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {filteredData.map((data: ReportingCenterListResponse) => (
              <MyCard
                city={null}
                rank={data?.CollegeAdmissionCode}
                key={data?.ReportingCentreID}
                shortName={data?.ReportingCentreName}
                location={data?.Address}
                otherElement={
                  <>
                    {data?.Phone && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='bxs:phone-call' />
                        {data?.Phone}
                      </Box>
                    )}
                    {data?.Fax && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='material-symbols:fax' />
                        {data?.Fax}
                      </Box>
                    )}
                    {data?.Website && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='ri:global-fill' />
                        {data?.Website}
                      </Box>
                    )}
                  </>
                }
                onClick={() =>
                  data.CollegeID && navigate(paths.josaa.collegeinformation.root(data?.CollegeID))
                }
              />
            ))}
          </Box>
        </TabPanel>
      </MyPage> */}
      <MainContent
        breadCrumbsProps={{
          heading: t('Institute.ReportingCenter.List.Title'),
          links: [{ name: 'Home' }, { name: t('Institute.ReportingCenter.List.Title') }],
        }}
        sx={{ p: 0 }}
      >
        <SimpleTabs
          defaultValue={currentTab}
          onTabChange={setCurrentTab}
          tabs={[
            { label: 'IIT', value: 1 },
            { label: 'NIT, IIIT & GFTI', value: 2 },
          ]}
          // totalRecords={totalRecords}
        >
          <CardContent>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                size='small'
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder='Search colleges, website, address...'
                InputProps={{
                  startAdornment: (
                    <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', mr: 0.5 }} />
                  ),
                }}
                sx={{ width: { xs: '100%', sm: 300 } }}
              />
            </Box>
            <DataGridPro
              rows={filteredData}
              density='compact'
              columns={columns}
              getRowId={row => row.ReportingCentreID}
              paginationMode='server'
              sortingMode='server'
              localeText={{ noRowsLabel: 'No Data' }}
              disableColumnMenu={true}
              onRowClick={params =>
                params.row.CollegeID &&
                navigate(paths.josaa.collegeinformation.root(params.row.CollegeID))
              }
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
                pinnedColumns: { left: ['ReportingCentreName'] },
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
                // '& .MuiDataGrid-toolbar': {
                //   display: '',
                // },
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
                height: 565,
              }}
            />
          </CardContent>
        </SimpleTabs>
      </MainContent>
    </DashboardContent>
  );
};
export default ReportingCenterListPage;
