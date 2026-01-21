import { CONFIG } from '@/global-config';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { useTranslate } from '@minimal/utils/locales';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCollegeWiseCutOffListStore } from '../api/store';
import { useForm } from 'react-hook-form';
import {
  CollegeWiseCutoffListRequest,
  CollegeWiseCutoffListResponse,
  CollegeWiseCutoffListSchema,
} from '../types';
import {
  useAdmissionOptions,
  useCSABAdmissionOptions,
} from '@modules/Master/AdmissionYear/api/hooks';
import { useCollegeOptions } from '@modules/Institute/College/api/hooks';
import { useCategoryOptions } from '@modules/Master/Category/api/hooks';
import { useReservationTypeOptions } from '@modules/Master/ReservationType/api/hooks';
import { useCollegeRankWiseCutOffQuery } from '../api/hooks';
import { toast } from 'sonner';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { GridColDef } from '@mui/x-data-grid';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { Field } from '@gnwebsoft/ui';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { fNumber } from '@core/utils/format-number';
import { zodResolver } from '@hookform/resolvers/zod';
import { SimpleTabs } from '@core/components';
import { TabPanel } from '@mui/lab';
import {
  CSABCollegeWiseCutoffListRequest,
  CSABCollegeWiseCutoffListSchema,
} from '@modules/Institute/CSABPreviousYearCutoffRowData/types';
import { useCSABCollegeWiseCutOffListStore } from '@modules/Institute/CSABPreviousYearCutoffRowData/api/store';
import { useCSABCollegeRankWiseCutOffQuery } from '@modules/Institute/CSABPreviousYearCutoffRowData/api/hooks';
import { useCSABRoundOptions, useRoundOptions } from '@modules/Institute/Round/api/hooks';
import { josaaDataGridStyles } from '@core/components/Styles';
import { useNavigate } from 'react-router';
import { paths } from '@/paths';

const CollegeWiseCutoffListPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const [jossaInitialized, setJossaInitialized] = useState(false);
  const [csabInitialized, setCsabInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);

  const josaaColumns = useMemo<GridColDef<CollegeWiseCutoffListResponse>[]>(
    () => [
      {
        field: 'BranchProperName',
        headerName: t('Institute.Branch.List.Title'),
        flex: 2,
        minWidth: 120,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <Tooltip title={params.row.BranchWebName}>
            <Typography
              variant='body2'
              width='100%'
              // onClick={() => navigate(paths.josaa.branchWiseCollege.root(params.row.BranchID))}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              {params.row.BranchProperName}
            </Typography>
          </Tooltip>
        ),
      },
      {
        field: 'QuotaName',
        headerName: t('Master.Quota.Status.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
      },
      {
        field: 'CategoryName',
        headerName: t('Master.Category.Category.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
      },
      {
        field: 'ReservationType',
        headerName: t('Master.ReservationType.SeatPool.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
      },
      {
        field: 'ClosingRank',
        headerName: t('Institute.PreviousYearCutoffRow.Close.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <Typography variant='body2' color='primary'>
            {fNumber(params.row.ClosingRank)}
          </Typography>
        ),
      },
    ],
    []
  );

  const csabColumns = useMemo<GridColDef<CollegeWiseCutoffListResponse>[]>(
    () => [
      {
        field: 'BranchProperName',
        headerName: t('Institute.Branch.List.Title'),
        flex: 2,
        minWidth: 120,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <Tooltip title={params.row.BranchWebName}>
            <Typography
              variant='body2'
              width='100%'
              // onClick={() => navigate(paths.josaa.branchWiseCollege.root(params.row.BranchID))}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              {params.row.BranchProperName}
            </Typography>
          </Tooltip>
        ),
      },
      {
        field: 'QuotaName',
        headerName: t('Master.Quota.Status.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
      },
      {
        field: 'CategoryName',
        headerName: t('Master.Category.Category.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
      },
      {
        field: 'ReservationType',
        headerName: t('Master.ReservationType.SeatPool.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
      },
      {
        field: 'ClosingRank',
        headerName: t('Institute.PreviousYearCutoffRow.Close.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <Typography variant='body2' color='primary'>
            {fNumber(params.row.ClosingRank)}
          </Typography>
        ),
      },
    ],
    []
  );

  const josaaStore = useCollegeWiseCutOffListStore();
  const csabStore = useCSABCollegeWiseCutOffListStore();

  const josaaForm = useForm<CollegeWiseCutoffListRequest>({
    resolver: zodResolver(CollegeWiseCutoffListSchema),
    shouldUnregister: false,
    mode: 'onSubmit',
  });

  const csabForm = useForm<CSABCollegeWiseCutoffListRequest>({
    resolver: zodResolver(CSABCollegeWiseCutoffListSchema),
    shouldUnregister: false,
    mode: 'onSubmit',
  });

  const josaaInitializedRef = useRef<boolean>(false);
  const csabInitializedRef = useRef<boolean>(false);

  const yearOptions = useAdmissionOptions();
  const CSABYearOptions = useCSABAdmissionOptions();

  const collegeOptions = useCollegeOptions();
  const reservationTypeOptions = useReservationTypeOptions();

  const categoryOptions = useCategoryOptions();
  const categoryOptionsWithAll = useMemo(() => {
    if (!categoryOptions.data) return [];

    return [{ Value: '', Label: 'All' }, ...categoryOptions.data];
  }, [categoryOptions.data]);

  const Year = josaaForm.watch('Year');
  const roundOptions = useRoundOptions(Year, !!Year);

  const CSABYear = csabForm.watch('Year');
  const CSABRoundOptions = useCSABRoundOptions(CSABYear, !!CSABYear);

  const josaaDefaultValues = useMemo<CollegeWiseCutoffListRequest | null>(() => {
    if (
      !yearOptions.data?.length ||
      !collegeOptions.data?.length ||
      !categoryOptionsWithAll?.length ||
      !reservationTypeOptions.data?.length ||
      !roundOptions.data?.length
    ) {
      return null;
    }

    return {
      Year: yearOptions.data?.[0].Value,
      College: collegeOptions.data[0].Value,
      Category: categoryOptionsWithAll[0].Value,
      ReservationType: reservationTypeOptions.data[0].Value,
      RoundID: roundOptions.data?.[0].Value,
    };
  }, [
    yearOptions.data,
    collegeOptions.data,
    categoryOptionsWithAll,
    reservationTypeOptions.data,
    roundOptions.data,
  ]);

  const csabDefaultValues = useMemo<CSABCollegeWiseCutoffListRequest | null>(() => {
    if (
      !CSABYearOptions.data?.length ||
      !collegeOptions.data?.length ||
      !categoryOptionsWithAll?.length ||
      !reservationTypeOptions.data?.length ||
      !CSABRoundOptions.data?.length
    ) {
      return null;
    }

    return {
      Year: CSABYearOptions.data?.[0].Value,
      College: collegeOptions.data[0].Value,
      Category: categoryOptionsWithAll[0].Value,
      ReservationType: reservationTypeOptions.data[0].Value,
      RoundID: CSABRoundOptions?.data?.[0].Value,
    };
  }, [
    CSABYearOptions.data,
    collegeOptions.data,
    categoryOptionsWithAll,
    reservationTypeOptions.data,
    CSABRoundOptions,
  ]);

  useEffect(() => {
    if (josaaInitializedRef.current) return;
    if (!josaaDefaultValues) return;

    if (
      josaaStore.postModel.filterModel &&
      Object.keys(josaaStore.postModel.filterModel).length > 0
    ) {
      josaaForm.reset(josaaStore.postModel.filterModel);
    } else {
      josaaForm.reset(josaaDefaultValues);
      josaaStore.handleFiltering(josaaDefaultValues);
    }

    josaaInitializedRef.current = true;
    setJossaInitialized(true);
  }, [
    josaaDefaultValues,
    josaaStore.postModel.filterModel,
    josaaForm.reset,
    josaaStore.handleFiltering,
  ]);

  useEffect(() => {
    if (csabInitializedRef.current) return;
    if (!csabDefaultValues) return;

    if (
      csabStore.postModel.filterModel &&
      Object.keys(csabStore.postModel.filterModel).length > 0
    ) {
      csabForm.reset(csabStore.postModel.filterModel);
    } else {
      csabForm.reset(csabDefaultValues);
      csabStore.handleFiltering(csabDefaultValues);
    }

    csabInitializedRef.current = true;
    setCsabInitialized(true);
  }, [
    csabDefaultValues,
    csabStore.postModel.filterModel,
    csabForm.reset,
    csabStore.handleFiltering,
  ]);

  const josaaQuery = useCollegeRankWiseCutOffQuery(
    josaaStore.postModel,
    activeTab === 1 && jossaInitialized
  );

  useEffect(() => {
    if (josaaQuery.error) {
      toast.error(josaaQuery.error.message);
    }

    if (josaaQuery.isSuccess && josaaQuery.data.length === 0) {
      toast.info('No Data Present');
    }
  }, [josaaQuery.error, josaaQuery.isSuccess]);

  const csabQuery = useCSABCollegeRankWiseCutOffQuery(
    csabStore.postModel,
    activeTab === 2 && csabInitialized
  );

  useEffect(() => {
    if (csabQuery.error) {
      toast.error(csabQuery.error.message);
    }

    if (csabQuery.isSuccess && csabQuery.data.length === 0) {
      toast.info('No Data Present');
    }
  }, [csabQuery.error, csabQuery.isSuccess]);

  const selectedJosaaYear = yearOptions.data?.find(item => item.Value === Year)?.Label;
  const selectedJosaaRound = roundOptions.data
    ?.find(item => item.Value === josaaForm.getValues('RoundID'))
    ?.Label.split(' ')
    .join(' - ');

  const selectedCsabYear = CSABYearOptions.data?.find(item => item.Value === CSABYear)?.Label;
  const selectedCsabRound = CSABRoundOptions.data
    ?.find(item => item.Value === csabForm.getValues('RoundID'))
    ?.Label.split(' ')
    .join(' - ');

  const josaaToolbarProps: DataGridToolbarProps<
    CollegeWiseCutoffListRequest,
    CollegeWiseCutoffListResponse
  > = {
    toolbar: {
      columns: josaaColumns,
      filterModel: (josaaStore.postModel.filterModel ?? josaaDefaultValues)!,
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

  const csabToolbarProps: DataGridToolbarProps<
    CSABCollegeWiseCutoffListRequest,
    CollegeWiseCutoffListResponse
  > = {
    toolbar: {
      columns: csabColumns,
      filterModel: (csabStore.postModel.filterModel ?? csabDefaultValues)!,
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
      totalCount: activeTab === 1 ? josaaQuery.totalRecords : csabQuery.totalRecords,
    },
  };

  const josaaOnSubmit = josaaForm.handleSubmit(data => {
    josaaStore.handleFiltering(data);
  });

  const csabOnSubmit = csabForm.handleSubmit(data => {
    csabStore.handleFiltering(data);
  });

  const josaaHandleReset = () => {
    if (!josaaDefaultValues) return;

    josaaForm.reset(josaaDefaultValues);
    josaaStore.handleFiltering(josaaDefaultValues);
  };

  const csabHandleReset = () => {
    if (!csabDefaultValues) return;

    csabForm.reset(csabDefaultValues);
    csabStore.handleFiltering(csabDefaultValues);
  };

  return (
    <DashboardContent>
      <Helmet>
        <title>
          {t('Institute.PreviousYearCutoffRow.CollegeWiseCutoff.Label')} - {CONFIG.appName}
        </title>
      </Helmet>

      <SimpleBreadcrumbs
        heading={t('Institute.PreviousYearCutoffRow.CollegeWiseCutoff.Label')}
        links={[
          { name: 'Home' },
          { name: t('Institute.PreviousYearCutoffRow.CollegeWiseCutoff.Label') },
        ]}
      />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card>
            <CardHeader title={t('Institute.PreviousYearCutoffRow.MeritRankWiseCutOff.Label')} />
            <CardContent sx={{ p: 0 }}>
              <SimpleTabs
                onTabChange={(newValue: number) => setActiveTab(newValue)}
                tabs={[
                  { label: 'JoSAA', value: 1 },
                  { label: 'CSAB', value: 2 },
                ]}
              >
                <TabPanel value={1}>
                  <Box
                    component='form'
                    onSubmit={josaaOnSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                  >
                    <Field.Select
                      control={josaaForm.control}
                      size='small'
                      name='College'
                      label={t('Institute.College.List.Title') + '*'}
                      options={collegeOptions.data || []}
                    />
                    <Field.Select
                      control={josaaForm.control}
                      size='small'
                      name='Year'
                      label={t('Institute.PreviousYearCutoffRow.year.Label') + '*'}
                      options={yearOptions.data || []}
                    />
                    <Field.SelectCascade
                      control={josaaForm.control}
                      dependsOn='Year'
                      size='small'
                      name='RoundID'
                      label={t('Institute.PreviousYearCutoffRow.Round.Label') + '*'}
                      options={roundOptions.data || []}
                      disabled={roundOptions.data?.length === 0}
                    />
                    <Field.Select
                      control={josaaForm.control}
                      size='small'
                      name='ReservationType'
                      label={t('Master.ReservationType.SeatPool.Label') + '*'}
                      options={reservationTypeOptions.data || []}
                    />
                    <Field.Select
                      control={josaaForm.control}
                      size='small'
                      name='Category'
                      label={t('Master.Category.Category.Label')}
                      options={categoryOptionsWithAll}
                    />
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                      <Button type='submit' variant='contained' color='primary'>
                        Submit
                      </Button>
                      <Button variant='soft' onClick={josaaHandleReset}>
                        Reset
                      </Button>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={2}>
                  <Box
                    component='form'
                    onSubmit={csabOnSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                  >
                    <Field.Select
                      control={csabForm.control}
                      size='small'
                      name='College'
                      label={t('Institute.College.List.Title') + '*'}
                      options={collegeOptions.data || []}
                    />
                    <Field.Select
                      control={csabForm.control}
                      size='small'
                      name='Year'
                      label={t('Institute.PreviousYearCutoffRow.year.Label') + '*'}
                      options={CSABYearOptions.data || []}
                    />
                    <Field.SelectCascade
                      control={csabForm.control}
                      dependsOn='Year'
                      size='small'
                      name='RoundID'
                      label={t('Institute.PreviousYearCutoffRow.Round.Label') + '*'}
                      options={CSABRoundOptions.data || []}
                      disabled={CSABRoundOptions.data?.length === 0}
                    />
                    <Field.Select
                      control={csabForm.control}
                      size='small'
                      name='ReservationType'
                      label={t('Master.ReservationType.SeatPool.Label') + '*'}
                      options={reservationTypeOptions.data || []}
                    />
                    <Field.Select
                      control={csabForm.control}
                      size='small'
                      name='Category'
                      label={t('Master.Category.Category.Label')}
                      options={categoryOptionsWithAll}
                    />
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                      <Button type='submit' variant='contained' color='primary'>
                        Submit
                      </Button>
                      <Button variant='soft' onClick={csabHandleReset}>
                        Reset
                      </Button>
                    </Box>
                  </Box>
                </TabPanel>
              </SimpleTabs>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 9 }}>
          <Card>
            <CardHeader
              title={
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                  }}
                >
                  {activeTab === 1 ? (
                    <>
                      <Typography variant='h6'>
                        Closings as per Year - {selectedJosaaYear ?? ''} {selectedJosaaRound ?? ''}
                      </Typography>
                      <Typography variant='subtitle2' color='error'>
                        Rank represent respective category ranks
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant='h6'>
                        Closings as per Year - {selectedCsabYear ?? ''} {selectedCsabRound ?? ''}
                      </Typography>
                      <Typography variant='subtitle2' color='error'>
                        Rank represent respective category ranks
                      </Typography>
                    </>
                  )}
                </Box>
              }
            />
            <CardContent sx={{ height: 650 }}>
              <DataGridPro
                density='compact'
                rows={activeTab === 1 ? josaaQuery.data : csabQuery.data}
                columns={activeTab === 1 ? josaaColumns : csabColumns}
                getRowId={row => row.CutoffID}
                paginationMode='server'
                sortingMode='server'
                localeText={{ noRowsLabel: 'No Data' }}
                disableColumnMenu={true}
                onRowClick={params =>
                  navigate(paths.josaa.branchWiseCollege.root(params.row.BranchID))
                }
                initialState={{
                  pagination: {
                    paginationModel: {
                      page:
                        activeTab === 1
                          ? josaaStore.postModel.pageOffset
                          : csabStore.postModel.pageOffset,
                      pageSize:
                        activeTab === 1
                          ? josaaStore.postModel.pageSize
                          : csabStore.postModel.pageSize,
                    },
                  },
                  sorting: {
                    sortModel:
                      activeTab === 1
                        ? josaaStore.postModel.sortModel
                        : csabStore.postModel.sortModel,
                  },
                  pinnedColumns: { left: ['BranchProperName'] },
                }}
                onPaginationModelChange={
                  activeTab === 1 ? josaaStore.handlePagination : csabStore.handlePagination
                }
                onSortModelChange={
                  activeTab === 1 ? josaaStore.handleSorting : csabStore.handleSorting
                }
                rowCount={activeTab === 1 ? josaaQuery.totalRecords : csabQuery.totalRecords}
                loading={activeTab === 1 ? josaaQuery.isLoading : csabQuery.isLoading}
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
                  toolbar: activeTab === 1 ? josaaToolbarProps : csabToolbarProps,
                  footer: footerProps,
                }}
                sx={{
                  ...josaaDataGridStyles,
                  // '& .MuiDataGrid-row:nth-of-type(even)': {
                  //   backgroundColor: theme => theme.palette.action.hover,
                  // },
                  // '& .MuiDataGrid-cell': {
                  //   padding: 1,
                  //   display: 'flex',
                  //   alignItems: 'center',
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
};
export default CollegeWiseCutoffListPage;
