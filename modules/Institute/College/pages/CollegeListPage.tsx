import { DashboardContent } from '@minimal/layouts/dashboard';
import {
  Box,
  Button,
  CardContent,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useCollegeListStore } from '../api/store';
import {
  useCollegeCompareForPlacementByCollegeIDQuery,
  useCollegeListQuery,
  useCollegeTypeOptions,
} from '../api/hooks';
import { CollegeListRequest, CollegeListResponse } from '../types';
import { LoadingScreen } from '@minimal/components/loading-screen';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { paths } from '@/paths';
import { Iconify } from '@minimal/components/iconify';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';
import MainContent from '@core/components/MainContent/MainContent';
import { SimpleTabs } from '@core/components';
import { GridColDef } from '@mui/x-data-grid';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { DataGridPro } from '@mui/x-data-grid-pro';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { josaaDataGridStyles } from '@core/components/Styles';
import TextHighlighter from '../view/TextHighlighter';
import { Label } from '@minimal/components/label';
import { EntityId } from '@core/hooks/useListView';
import CollegeCompareForPlacementByCollegeIDView from '../view/CollegeCompareForPlacementByCollegeIDView';
import { fNumber } from '@core/utils/format-number';

const CollegeListPage = () => {
  const { t } = useTranslate();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [collegeID, setCollegeID] = useState<EntityId>();
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const { postModel, handlePagination, handleFiltering, handleSorting } = useCollegeListStore();
  const { data, totalRecords, isLoading } = useCollegeListQuery(postModel);
  const { data: collegeOptions } = useCollegeTypeOptions();
  const { data: rows } = useCollegeCompareForPlacementByCollegeIDQuery(collegeID, !!collegeID);

  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;
  const collegeTypeColorMap: Record<string, 'primary' | 'secondary' | 'info' | 'warning'> = {
    IIT: 'primary',
    NIT: 'secondary',
    IIIT: 'info',
    GFTI: 'warning',
  };

  const columns = useMemo<GridColDef<CollegeListResponse>[]>(
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
            onClick={() => navigate(paths.josaa.collegeinformation.root(params.row.CollegeID))}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              height: '100%',
              '&:hover': { cursor: 'pointer' },
            }}
          >
            <Typography variant='body2'>
              <TextHighlighter text={params.row.CollegeShortName} highlight={debouncedSearch} />
              <Label
                sx={{ mx: 1 }}
                color={collegeTypeColorMap[params.row.CollegeTypeShortName] ?? 'error'}
              >
                {params.row.CollegeTypeShortName}
              </Label>
            </Typography>
            <Typography variant='caption'>
              <TextHighlighter text={params.row.CollegeName} highlight={debouncedSearch} />
            </Typography>
          </Box>
        ),
      },
      {
        field: 'TotalIntake',
        headerName: t('Institute.IntakeCutoff.TotalIntake.Label'),
        minWidth: 120,
        flex: 0.3,
        sortable: true,
        renderCell: params => (
          <span>{params.row.TotalIntake !== null ? fNumber(params.row.TotalIntake) : '-'}</span>
        ),
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'NIRFRank',
        headerName: t('Institute.College.NIRFRank.Label'),
        minWidth: 120,
        flex: 0.3,
        sortable: true,
        renderCell: params => (
          <span>{params.row.NIRFRank !== null ? fNumber(params.row.NIRFRank) : '-'}</span>
        ),
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'HighestPackage',
        headerName: t('Institute.BranchWisePlacement.HigherPackage.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        renderCell: params => (
          // <Box
          //   sx={{
          //     display: 'flex',
          //     flexDirection: 'column',
          //   }}
          // >
          //   <span>{params.row.HighestPackage ?? '-'}</span>
          //   <Button
          //     size='small'
          //     variant='text'
          //     color='error'
          //     startIcon={<Iconify icon='eva:swap-outline' width={15} />}
          //     onClick={() => {
          //       setCollegeID(params.row.CollegeID);
          //       setOpen(true);
          //     }}
          //   >
          //     Compare Placement
          //   </Button>
          // </Box>
          <span>
            {params.row.HighestPackage !== null ? fNumber(params.row.HighestPackage) : '-'}
          </span>
        ),
        // renderHeader: params => (
        //   <div
        //     className='gn-grid-header'
        //     style={{
        //       whiteSpace: 'break-spaces',
        //       lineBreak: 'auto',
        //       textAlign: 'center',
        //       fontSize: 13,
        //       fontWeight: 600,
        //     }}
        //   >
        //     {t('Institute.BranchWisePlacement.HigherPackage.Label')}
        //   </div>
        // ),
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'StateName',
        headerName: t('Institute.College.State.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <span
            onClick={() => navigate(paths.josaa.stateByID.root(params.row.StateID))}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <TextHighlighter text={params.row.StateName} highlight={debouncedSearch} />
          </span>
        ),
      },
      {
        field: 'Phone',
        headerName: t('Institute.College.Phone.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
        headerAlign: 'right',
        cellClassName: 'first-column-right',
        renderCell: params => (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
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
          // style={{
          //   display: 'flex',
          //   flexDirection: 'column',
          //   width: '100%',
          //   height: '100%',
          // }}
          >
            {/* {params.row.Email.split(',').map((item: string) => (
              <Typography
                variant='body2'
                component='a'
                color='textPrimary'
                href={`mailto:${item}`}
                sx={{ textDecoration: 'none' }}
              >
                {item}
              </Typography>
            ))} */}
            <Typography
              variant='body2'
              component='a'
              color='textPrimary'
              href={`mailto:${params.row.Email}`}
              sx={{ textDecoration: 'none' }}
            >
              {params.row.Email}
            </Typography>
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
          // <Button
          //   variant='text'
          //   color='primary'
          //   size='small'
          //   startIcon={<Iconify icon='solar:eye-bold' height={15} />}
          //   onClick={() => navigate(paths.josaa.collegeinformation.root(params.row?.CollegeID))}
          // >
          //   View Deatils
          // </Button>
          <IconButton color='primary'>
            <Iconify icon='solar:eye-bold' />
          </IconButton>
        ),
      },
    ],
    [t, navigate, debouncedSearch]
  );

  const toolbarProps: DataGridToolbarProps<CollegeListRequest, CollegeListResponse> = {
    toolbar: {
      columns,
      search: {
        value: search,
        onSearch: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
      },
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

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    handlePagination({
      page: newPage - 1,
      pageSize: rowsPerPage,
    });
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
      (item: CollegeListResponse) =>
        item.CollegeShortName?.toLowerCase().includes(s) ||
        item.StateName?.toLowerCase().includes(s) ||
        item.CollegeAdmissionCode?.toString().includes(s) ||
        item.NIRFRank?.toString().includes(s) ||
        item.Address?.toLocaleLowerCase().toString().includes(s) ||
        item.CollegeUrlName?.toLocaleLowerCase().toString().includes(s)
    );
  }, [debouncedSearch, data]);

  useEffect(() => {
    const labelMap: Record<number, string | null> = {
      1: null,
      2: 'IIT',
      3: 'NIT',
      4: 'IIIT',
      5: 'GFTI',
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

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent sx={{ px: { xs: 0, md: 3 } }}>
      <Helmet>
        <title>{t('Institute.College.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      {/* <SimpleBreadcrumbs
        heading={t('Institute.College.List.Title')}
        links={[{ name: 'Home' }, { name: t('Institute.College.List.Title') }]}
      /> 
       <MyPage
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={[
          { label: 'All', value: 1 },
          { label: 'IIT', value: 2 },
          { label: 'NIT', value: 3 },
          { label: 'IIIT', value: 4 },
          { label: 'GFTI', value: 5 },
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
        totalRecords={totalRecords}
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
                xl: 'repeat(6, 1fr)',
              },
            }}
          >
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
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
                xl: 'repeat(6, 1fr)',
              },
            }}
          >
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={3} sx={{ p: 0 }}>
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(6, 1fr)',
              },
            }}
          >
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={4} sx={{ p: 0 }}>
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(6, 1fr)',
              },
            }}
          >
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={5} sx={{ p: 0 }}>
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(6, 1fr)',
              },
            }}
          >
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
      </MyPage> */}
      <MainContent
        breadCrumbsProps={{
          heading: t('Institute.College.List.Title'),
          links: [{ name: 'Home' }, { name: t('Institute.College.List.Title') }],
        }}
        sx={{ p: 0, mb: 0 }}
      >
        <SimpleTabs
          defaultValue={currentTab}
          onTabChange={setCurrentTab}
          tabs={[
            { label: 'All', value: 1 },
            { label: 'IIT', value: 2 },
            { label: 'NIT', value: 3 },
            { label: 'IIIT', value: 4 },
            { label: 'GFTI', value: 5 },
          ]}
          totalRecords={totalRecords}
        >
          <Box p={2} mb={0}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                size='small'
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder='Search colleges, state, email...'
                InputProps={{
                  startAdornment: (
                    <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', mr: 1 }} />
                  ),
                }}
                sx={{ width: { xs: '100%', sm: 300 } }}
              />
              <Button
                color='primary'
                variant='contained'
                size='small'
                startIcon={<Iconify icon='hugeicons:balance-scale' />}
                onClick={() => navigate(paths.josaa.colleges.collegeCompare)}
              >
                {!isMobile && t('Institute.College.CollegeCompare.Label')}
              </Button>
            </Box>
            <DataGridPro
              rows={filteredData}
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
                '& .MuiDataGrid-toolbar': {
                  display: 'none',
                },
                height: { xs: 500, md: 570 },
              }}
            />
          </Box>
        </SimpleTabs>
      </MainContent>
      <CollegeCompareForPlacementByCollegeIDView
        open={open}
        onClose={() => setOpen(false)}
        rows={rows!}
      />
    </DashboardContent>
  );
};
export default CollegeListPage;
