import { CONFIG } from '@/global-config';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { useTranslate } from '@minimal/utils/locales';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useBranchWiseCutOffListStore } from '../api/store';
import { useForm } from 'react-hook-form';
import {
  BranchWiseCutoffListRequest,
  BranchWiseCutoffListResponse,
  BranchWiseCutoffListSchema,
} from '../types';
import { useCollegeTypeOptions } from '@modules/Institute/College/api/hooks';
import { useSystemBranchOptions } from '@modules/Master/SystemBranch/api/hooks';
import {
  useAdmissionOptions,
  useCSABAdmissionOptions,
} from '@modules/Master/AdmissionYear/api/hooks';
import { useCategoryOptions } from '@modules/Master/Category/api/hooks';
import { useReservationTypeOptions } from '@modules/Master/ReservationType/api/hooks';
import { useBranchWiseCutOffQuery } from '../api/hooks';
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
  CSABBranchWiseCutoffListRequest,
  CSABBranchWiseCutoffListSchema,
} from '@modules/Institute/CSABPreviousYearCutoffRowData/types';
import { useCSABBranchWiseCutOffListStore } from '@modules/Institute/CSABPreviousYearCutoffRowData/api/store';
import { useCSABBranchWiseCutOffQuery } from '@modules/Institute/CSABPreviousYearCutoffRowData/api/hooks';
import { useCSABRoundOptions, useRoundOptions } from '@modules/Institute/Round/api/hooks';
import { josaaDataGridStyles } from '@core/components/Styles';
import { useNavigate } from 'react-router';
import { paths } from '@/paths';

const BranchWiseCutoffListPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const [josaaInitialized, setJosaaInitialized] = useState(false);
  const [csabInitialized, setCsabInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);

  const josaaColumns = useMemo<GridColDef<BranchWiseCutoffListResponse>[]>(
    () => [
      {
        field: 'CollegeShortName',
        headerName: t('Institute.College.List.Title'),
        flex: 2,
        minWidth: 120,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <Tooltip title={params.row.CollegeName}>
            <Typography
              variant='body2'
              width='100%'
              // onClick={() => navigate(paths.josaa.collegeinformation.root(params.row.CollegeID))}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              {params.row.CollegeShortName}
            </Typography>
          </Tooltip>
        ),
      },
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
              onClick={e => {
                e.stopPropagation();
                navigate(paths.josaa.branchWiseCollege.root(params.row.BranchID));
              }}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              {params.row.BranchProperName}
            </Typography>
          </Tooltip>
        ),
      },
      {
        field: 'CollegeTypeShortName',
        headerName: t('Institute.College.CollegeType.Label'),
        flex: 0.5,
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

  const csabColumns = useMemo<GridColDef<BranchWiseCutoffListResponse>[]>(
    () => [
      {
        field: 'CollegeShortName',
        headerName: t('Institute.College.List.Title'),
        flex: 2,
        minWidth: 120,
        sortable: true,
        cellClassName: 'first-column',
        renderCell: params => (
          <Tooltip title={params.row.CollegeName}>
            <Typography
              variant='body2'
              width='100%'
              // onClick={() => navigate(paths.josaa.collegeinformation.root(params.row.CollegeID))}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              {params.row.CollegeShortName}
            </Typography>
          </Tooltip>
        ),
      },
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
              onClick={e => {
                e.stopPropagation();
                navigate(paths.josaa.branchWiseCollege.root(params.row.BranchID));
              }}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              {params.row.BranchProperName}
            </Typography>
          </Tooltip>
        ),
      },
      {
        field: 'CollegeTypeShortName',
        headerName: t('Institute.College.CollegeType.Label'),
        flex: 0.5,
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

  const josaaStore = useBranchWiseCutOffListStore();
  const csabStore = useCSABBranchWiseCutOffListStore();

  const josaaForm = useForm<BranchWiseCutoffListRequest>({
    resolver: zodResolver(BranchWiseCutoffListSchema),
    shouldUnregister: false,
    mode: 'onSubmit',
  });

  const csabForm = useForm<CSABBranchWiseCutoffListRequest>({
    resolver: zodResolver(CSABBranchWiseCutoffListSchema),
    shouldUnregister: false,
    mode: 'onSubmit',
  });

  const josaaInitializedRef = useRef<boolean>(false);
  const csabInitializedRef = useRef<boolean>(false);

  const yearOptions = useAdmissionOptions();
  const CSABYearOptions = useCSABAdmissionOptions();

  const branchOptions = useSystemBranchOptions();
  const reservationTypeOptions = useReservationTypeOptions();

  const collegeTypeOptions = useCollegeTypeOptions();
  const collegeTypeOptionsWithAll = useMemo(() => {
    if (!collegeTypeOptions.data) return [];

    return [{ Value: null, Label: 'All' }, ...collegeTypeOptions.data];
  }, [collegeTypeOptions.data]);

  const categoryOptions = useCategoryOptions();
  const categoryOptionsWithAll = useMemo(() => {
    if (!categoryOptions.data) return [];

    return [{ Value: null, Label: 'All' }, ...categoryOptions.data];
  }, [categoryOptions.data]);

  const JosaaYear = josaaForm.watch('Year');
  const roundOptions = useRoundOptions(JosaaYear, !!JosaaYear);

  const CSABYear = csabForm.watch('Year');
  const CSABRoundOptions = useCSABRoundOptions(CSABYear, !!CSABYear);

  const josaaDefaultValues = useMemo<BranchWiseCutoffListRequest | null>(() => {
    if (
      !yearOptions.data?.length ||
      !branchOptions.data?.length ||
      !collegeTypeOptionsWithAll?.length ||
      !categoryOptionsWithAll.length ||
      !reservationTypeOptions.data?.length ||
      !roundOptions.data?.length
    ) {
      return null;
    }

    return {
      Branch: branchOptions.data?.[0].Value,
      Year: yearOptions.data?.[0].Value,
      RoundID: roundOptions.data?.[0].Value,
      ReservationType: reservationTypeOptions.data[0].Value,
      CollegeType: collegeTypeOptionsWithAll[0].Value,
      Category: categoryOptionsWithAll[0].Value,
    };
  }, [
    branchOptions.data,
    JosaaYear,
    roundOptions.data,
    reservationTypeOptions.data,
    collegeTypeOptionsWithAll,
    categoryOptionsWithAll,
  ]);

  const csabDefaultValues = useMemo<CSABBranchWiseCutoffListRequest | null>(() => {
    if (
      !CSABYearOptions.data?.length ||
      !branchOptions.data?.length ||
      !collegeTypeOptionsWithAll?.length ||
      !categoryOptionsWithAll.length ||
      !reservationTypeOptions.data?.length ||
      !CSABRoundOptions.data?.length
    ) {
      return null;
    }

    return {
      Year: CSABYearOptions.data?.[0].Value,
      Branch: branchOptions.data?.[0].Value,
      CollegeType: collegeTypeOptionsWithAll[0].Value,
      Category: categoryOptionsWithAll[0].Value,
      ReservationType: reservationTypeOptions.data[0].Value,
      RoundID: CSABRoundOptions.data?.[0].Value,
    };
  }, [
    CSABYear,
    branchOptions.data,
    collegeTypeOptionsWithAll,
    categoryOptionsWithAll,
    reservationTypeOptions.data,
    CSABRoundOptions.data,
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
    setJosaaInitialized(true);
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

  const josaaQuery = useBranchWiseCutOffQuery(
    josaaStore.postModel,
    activeTab === 1 && josaaInitialized
  );

  useEffect(() => {
    if (josaaQuery.error) {
      toast.error(josaaQuery.error.message);
    }

    if (josaaQuery.isSuccess && josaaQuery.data.length === 0) {
      toast.info('No Data Present');
    }
  }, [josaaQuery.error, josaaQuery.isSuccess]);

  const csabQuery = useCSABBranchWiseCutOffQuery(
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

  const selectedJosaaYear = yearOptions.data?.find(item => item.Value === JosaaYear)?.Label;
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
    BranchWiseCutoffListRequest,
    BranchWiseCutoffListResponse
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
    CSABBranchWiseCutoffListRequest,
    BranchWiseCutoffListResponse
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
          {t('Institute.PreviousYearCutoffRow.BranchWiseCutoff.Label')} - {CONFIG.appName}
        </title>
      </Helmet>

      <SimpleBreadcrumbs
        heading={t('Institute.PreviousYearCutoffRow.BranchWiseCutoff.Label')}
        links={[
          { name: 'Home' },
          { name: t('Institute.PreviousYearCutoffRow.BranchWiseCutoff.Label') },
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
                      name='Branch'
                      size='small'
                      label={t('Institute.Branch.List.Title') + '*'}
                      placeholder={t('Institute.Branch.List.Title') + '*'}
                      options={branchOptions.data || []}
                    />
                    <Field.Select
                      control={josaaForm.control}
                      size='small'
                      name='Year'
                      label={t('Institute.PreviousYearCutoffRow.year.Label') + '*'}
                      placeholder={t('Institute.PreviousYearCutoffRow.year.Placeholder') + '*'}
                      options={yearOptions.data || []}
                    />
                    <Field.SelectCascade
                      control={josaaForm.control}
                      dependsOn='Year'
                      size='small'
                      name='RoundID'
                      label={t('Institute.PreviousYearCutoffRow.Round.Label') + '*'}
                      placeholder={t('Institute.PreviousYearCutoffRow.Round.Placeholder') + '*'}
                      options={roundOptions.data || []}
                      disabled={roundOptions.data?.length === 0}
                    />
                    <Field.Select
                      control={josaaForm.control}
                      size='small'
                      name='ReservationType'
                      label={t('Master.ReservationType.SeatPool.Label') + '*'}
                      placeholder={t('Master.ReservationType.SeatPool.Placeholder') + '*'}
                      options={reservationTypeOptions.data || []}
                    />
                    <Field.Select
                      control={josaaForm.control}
                      size='small'
                      name='CollegeType'
                      label={t('Institute.College.CollegeType.Label')}
                      placeholder={t('Institute.College.CollegeType.Placeholder')}
                      options={collegeTypeOptionsWithAll}
                    />
                    <Field.Select
                      control={josaaForm.control}
                      size='small'
                      name='Category'
                      label={t('Master.Category.Category.Label')}
                      placeholder={t('Master.Category.Category.Placeholder')}
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
                      name='Branch'
                      size='small'
                      label={t('Institute.Branch.List.Title') + '*'}
                      placeholder={t('Institute.Branch.List.Title') + '*'}
                      options={branchOptions.data || []}
                    />
                    <Field.Select
                      control={csabForm.control}
                      size='small'
                      name='Year'
                      label={t('Institute.PreviousYearCutoffRow.year.Label') + '*'}
                      placeholder={t('Institute.PreviousYearCutoffRow.year.Placeholder') + '*'}
                      options={CSABYearOptions.data || []}
                    />
                    <Field.SelectCascade
                      control={csabForm.control}
                      size='small'
                      name='RoundID'
                      label={t('Institute.PreviousYearCutoffRow.Round.Label') + '*'}
                      placeholder={t('Institute.PreviousYearCutoffRow.Round.Placeholder') + '*'}
                      dependsOn='Year'
                      disabled={CSABRoundOptions.data?.length == 0}
                      options={CSABRoundOptions.data || []}
                    />
                    <Field.Select
                      control={csabForm.control}
                      size='small'
                      name='ReservationType'
                      label={t('Master.ReservationType.SeatPool.Label') + '*'}
                      placeholder={t('Master.ReservationType.SeatPool.Placeholder') + '*'}
                      options={reservationTypeOptions.data || []}
                    />
                    <Field.Select
                      control={csabForm.control}
                      size='small'
                      name='CollegeType'
                      label={t('Institute.College.CollegeType.Label')}
                      placeholder={t('Institute.College.CollegeType.Placeholder')}
                      options={collegeTypeOptionsWithAll}
                    />
                    <Field.Select
                      control={csabForm.control}
                      size='small'
                      name='Category'
                      label={t('Master.Category.Category.Label')}
                      placeholder={t('Master.Category.Category.Placeholder')}
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
                  navigate(paths.josaa.collegeinformation.root(params.row.CollegeID))
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
                    sortModel: josaaStore.postModel.sortModel,
                  },
                  pinnedColumns: { left: ['CollegeShortName'] },
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

export default BranchWiseCutoffListPage;
