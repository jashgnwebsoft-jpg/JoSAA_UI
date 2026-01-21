import { Button, CardContent } from '@mui/material';
import { useHomeStateListStore } from '../api/store';
import { useCollegeTypeOptions, useHomeStateListQuery } from '../api/hooks';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { paths } from '@/paths';
import { Iconify } from '@minimal/components/iconify';
import { HomeStateListPageRequest, HomeStateListPageResponse } from '../types';
import { CONFIG } from '@/global-config';
import { useTranslate } from '@minimal/utils/locales';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import MainContent from '@core/components/MainContent/MainContent';
import { SimpleTabs } from '@core/components';
import { DataGridPro } from '@mui/x-data-grid-pro';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { josaaDataGridStyles } from '@core/components/Styles';
import CollegeCommanDataGrid from '../view/CollegeCommanDataGrid';

const HomeStateListPage = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { t } = useTranslate();
  const navigate = useNavigate();

  const { postModel, handlePagination, handleFiltering, handleSorting } = useHomeStateListStore();
  const { data, totalRecords, isLoading } = useHomeStateListQuery(postModel);
  const { data: collegeOptions } = useCollegeTypeOptions();

  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;

  const columns = useMemo<GridColDef<HomeStateListPageResponse>[]>(
    () => [
      {
        field: 'CollegeAdmissionCode',
        headerName: t('Institute.College.AdmissionCode.Label'),
        minWidth: 120,
        flex: 0.3,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'CollegeShortName',
        headerName: t('Institute.College.College.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
      },
      {
        field: 'City',
        headerName: t('Institute.College.City.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
      },
      {
        field: 'StateName',
        headerName: t('Institute.College.State.Label'),
        minWidth: 120,
        flex: 0.5,
        sortable: true,
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
            View
          </Button>
        ),
      },
    ],
    []
  );

  const toolbarProps: DataGridToolbarProps<HomeStateListPageRequest, HomeStateListPageResponse> = {
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
      item =>
        item.CollegeShortName?.toLowerCase().includes(s) ||
        item.StateName?.toLowerCase().includes(s) ||
        item.City?.toString().includes(s) ||
        item.CollegeName?.toString().includes(s)
    );
  }, [debouncedSearch, data]);

  useEffect(() => {
    const labelMap: Record<number, string | null> = {
      1: null,
      2: 'NIT',
      3: 'GFTI',
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

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Institute.College.HomeState.Label') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      {/* <SimpleBreadcrumbs
        heading={t('Institute.College.HomeState.Label')}
        links={[{ name: 'Home' }, { name: t('Institute.College.HomeState.Label') }]}
      />
      <MyPage
        totalRecords={totalRecords}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={[
          { label: 'All', value: 1 },
          { label: 'NIT', value: 2 },
          { label: 'GFTI', value: 3 },
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
                xl: 'repeat(6, 1fr)',
              },
            }}
          >
            {filteredData.map((data: HomeStateListPageResponse) => (
              <MyCard
                city={data?.City}
                rank={data?.CollegeAdmissionCode}
                key={data?.CollegeID}
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
            {filteredData.map((data: HomeStateListPageResponse) => (
              <MyCard
                city={data?.City}
                rank={data?.CollegeAdmissionCode}
                key={data?.CollegeID}
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
            {filteredData.map((data: HomeStateListPageResponse) => (
              <MyCard
                city={data?.City}
                rank={data?.CollegeAdmissionCode}
                key={data?.CollegeID}
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
          heading: t('Institute.College.HomeState.Label'),
          links: [{ name: 'Home' }, { name: t('Institute.College.HomeState.Label') }],
        }}
        sx={{ p: 0 }}
      >
        <SimpleTabs
          defaultValue={currentTab}
          onTabChange={setCurrentTab}
          tabs={[
            { label: 'All', value: 1 },
            { label: 'NIT', value: 2 },
            { label: 'GFTI', value: 3 },
          ]}
          // totalRecords={totalRecords}
        >
          {/* <CardContent>
            <DataGridPro
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
                height: 620,
              }}
            />
          </CardContent> */}
          <CollegeCommanDataGrid
            postModel={postModel}
            totalRecords={totalRecords}
            data={data}
            handleFiltering={handleFiltering}
            handlePagination={handlePagination}
            handleSorting={handleSorting}
            isLoading={isLoading}
            boxSxProps={{ p: 2 }}
            sxProps={{ height: 565 }}
          />
        </SimpleTabs>
      </MainContent>
    </DashboardContent>
  );
};
export default HomeStateListPage;
