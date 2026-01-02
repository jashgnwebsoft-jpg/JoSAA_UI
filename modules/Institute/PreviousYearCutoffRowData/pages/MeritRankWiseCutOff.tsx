import { useCategoryOptions } from '@modules/Master/Category/api/hooks';
import { useProgarmOptions } from '@modules/Master/Program/api/hooks';
import { useReservationTypeOptions } from '@modules/Master/ReservationType/api/hooks';
import { useSystemBranchOptions } from '@modules/Master/SystemBranch/api/hooks';
import { useMeritRankWiseCutOffListStore } from '../api/store';
import { useMeritRankWiseCutOffQuery } from '../api/hooks';
import { useForm } from 'react-hook-form';
import { MeritRankCutOffRequest, MeritRankCutOffResponse, MeritRankCutOffSchema } from '../types';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { CONFIG } from '@/global-config';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { dataGridStyles } from '@core/components/Styles';
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Field } from '@gnwebsoft/ui';
import { useTranslate } from '@minimal/utils/locales';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentYearQuery } from '@modules/Master/AdmissionYear/api/hooks';
import { fNumber } from '@core/utils/format-number';
import { useCollegeTypeOptions } from '@modules/Institute/College/api/hooks';

const MeritRankWiseCutOff = () => {
  const { t } = useTranslate();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const columns = useMemo<GridColDef<MeritRankCutOffResponse>[]>(
    () => [
      {
        field: 'CollegeShortName',
        headerName: t('Institute.College.List.Title'),
        flex: 2,
        minWidth: 120,
        sortable: true,
      },
      {
        field: 'BranchProperName',
        headerName: t('Institute.Branch.List.Title'),
        flex: 2,
        minWidth: 120,
        sortable: true,
      },
      {
        field: 'OpenRank',
        headerName: t('Institute.PreviousYearCutoffRow.Open.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
        renderCell: params => <span>{fNumber(params.row.OpenRank)}</span>,
      },
      {
        field: 'ClosingRank',
        headerName: t('Institute.PreviousYearCutoffRow.Close.Label'),
        flex: 1,
        minWidth: 120,
        sortable: true,
        renderCell: params => <span>{fNumber(params.row.ClosingRank)}</span>,
      },
    ],
    []
  );

  const { postModel, handlePagination, handleSorting, handleFiltering } =
    useMeritRankWiseCutOffListStore();

  const { control, handleSubmit, reset, watch } = useForm<MeritRankCutOffRequest>({
    resolver: zodResolver(MeritRankCutOffSchema),
    shouldUnregister: false,
    mode: 'onSubmit',
    defaultValues: {
      AirRank: 1,
    },
  });

  const initializedRef = useRef<boolean>(false);

  const categoryOptions = useCategoryOptions();

  const reservationTypeOptions = useReservationTypeOptions();
  const systemBranchOptions = useSystemBranchOptions();
  const collegeTypeOptions = useCollegeTypeOptions();
  const collegeTypeOptionsWithAll = useMemo(() => {
    if (!collegeTypeOptions.data) return [];

    return [{ Value: '', Label: 'All' }, ...collegeTypeOptions.data];
  }, [collegeTypeOptions.data]);
  const systemBranchOptionsWithAll = useMemo(() => {
    if (!systemBranchOptions.data) return [];

    return [{ Value: '', Label: 'All' }, ...systemBranchOptions.data];
  }, [systemBranchOptions.data]);
  const rankOptions = useMemo(
    () => [
      { Label: 'JEE Advance', Value: 1 },
      { Label: 'JEE Main - I', Value: 2 },
      { Label: 'JEE Main - II', Value: 3 },
    ],
    []
  );
  const AirRank = watch('AirRank');
  const programOptions = useProgarmOptions(AirRank);
  const programOptionsWithAll = useMemo(() => {
    if (!programOptions.data) return [];

    return [{ Value: '', Label: 'All' }, ...programOptions.data];
  }, [programOptions.data]);

  const defaultValues = useMemo<MeritRankCutOffRequest | null>(() => {
    if (
      !categoryOptions.data?.length ||
      !programOptionsWithAll.length ||
      !reservationTypeOptions.data?.length ||
      !systemBranchOptionsWithAll?.length ||
      !collegeTypeOptionsWithAll.length
    ) {
      return null;
    }

    return {
      AirRank: rankOptions[0].Value,
      MeritRank: '1',
      CategoryID: categoryOptions.data[0].Value,
      SeatPoolID: reservationTypeOptions.data[0].Value,
      CourseID: programOptionsWithAll[0].Value,
      BranchID: systemBranchOptionsWithAll[0].Value,
      CollegeType: collegeTypeOptionsWithAll[0].Value,
    };
  }, [
    categoryOptions.data,
    programOptionsWithAll,
    reservationTypeOptions.data,
    systemBranchOptionsWithAll,
    collegeTypeOptionsWithAll,
    rankOptions,
  ]);

  useEffect(() => {
    if (initializedRef.current) return;
    if (!defaultValues) return;

    if (postModel.filterModel && Object.keys(postModel.filterModel).length > 0) {
      reset(postModel.filterModel);
    } else {
      reset(defaultValues);
      handleFiltering(defaultValues);
    }

    initializedRef.current = true;
    setIsInitialized(true);
  }, [defaultValues, postModel.filterModel, reset, handleFiltering]);

  const { data, totalRecords, isLoading, error } = useMeritRankWiseCutOffQuery(
    postModel,
    isInitialized
  );
  {
    error && toast.error(error.message);
  }
  const { data: currentYear } = useCurrentYearQuery();

  const toolbarProps: DataGridToolbarProps<MeritRankCutOffRequest, MeritRankCutOffResponse> = {
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

  const onSubmit = handleSubmit(data => {
    const sanitized = {
      ...data,
      CategoryID: data.CategoryID ?? '',
      SeatPoolID: data.SeatPoolID ?? '',
      CourseID: data.CourseID ?? '',
      BranchID: data.BranchID ?? '',
      CollegeType: data.CollegeType ?? '',
    };

    handleFiltering(sanitized);
  });

  const handleReset = () => {
    if (!defaultValues) return;

    reset(defaultValues);
    handleFiltering(defaultValues);
  };

  return (
    <DashboardContent>
      <Helmet>
        <title>
          {t('Institute.PreviousYearCutoffRow.MeritRankWiseCutOff.Label')} - {CONFIG.appName}
        </title>
      </Helmet>

      <SimpleBreadcrumbs
        heading={t('Institute.PreviousYearCutoffRow.MeritRankWiseCutOff.Label')}
        links={[
          { name: 'Home' },
          { name: t('Institute.PreviousYearCutoffRow.MeritRankWiseCutOff.Label') },
        ]}
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card>
            <CardHeader title={t('Institute.PreviousYearCutoffRow.MeritRankWiseCutOff.Label')} />
            <CardContent>
              <Box
                component='form'
                onSubmit={onSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
              >
                <Field.Select
                  control={control}
                  name='AirRank'
                  size='small'
                  label={t('Institute.PreviousYearCutoffRow.AirRank.Label') + '*'}
                  placeholder={t('Institute.PreviousYearCutoffRow.AirRank.Placeholder') + '*'}
                  options={rankOptions}
                />
                {(AirRank === 2 || AirRank === 3) && (
                  <Field.Select
                    control={control}
                    size='small'
                    name='CollegeType'
                    label={t('Institute.College.CollegeType.Label')}
                    placeholder={t('Institute.College.CollegeType.Placeholder')}
                    options={collegeTypeOptionsWithAll}
                  />
                )}
                <Field.Select
                  control={control}
                  size='small'
                  name='CategoryID'
                  label={t('Master.Category.Category.Label') + '*'}
                  placeholder={t('Master.Category.Category.Placeholder') + '*'}
                  options={categoryOptions.data || []}
                />
                <Field.Text
                  control={control}
                  name='MeritRank'
                  label={t('Institute.PreviousYearCutoffRow.MeritRank.Label') + '*'}
                  placeholder={t('Institute.PreviousYearCutoffRow.MeritRank.Placeholder') + '*'}
                />
                <Field.Select
                  control={control}
                  size='small'
                  name='SeatPoolID'
                  label={t('Master.ReservationType.SeatPool.Label') + '*'}
                  placeholder={t('Master.ReservationType.SeatPool.Placeholder') + '*'}
                  options={reservationTypeOptions.data || []}
                />
                <Field.Select
                  control={control}
                  size='small'
                  name='CourseID'
                  label={t('Master.Program.Course.Label')}
                  placeholder={t('Master.Program.Course.Placeholder')}
                  options={programOptionsWithAll}
                />
                <Field.Select
                  control={control}
                  size='small'
                  name='BranchID'
                  label={t('Institute.Branch.List.Title')}
                  placeholder={t('Institute.Branch.List.Placeholder')}
                  options={systemBranchOptionsWithAll}
                />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button type='submit' variant='contained' color='primary'>
                    Submit
                  </Button>
                  <Button variant='soft' onClick={handleReset}>
                    Reset
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 9 }}>
          <Card>
            <CardHeader
              title={
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Typography variant='h6'>
                    Closings as per Year {currentYear?.AdmissionYear} Round-
                    {currentYear?.RoundNumber}
                  </Typography>
                  <Typography variant='subtitle2' color='error'>
                    Rank represent respective category ranks
                  </Typography>
                </Box>
              }
            />
            <CardContent sx={{ height: 680 }}>
              <DataGridPro
                rows={data}
                columns={columns}
                getRowId={row => row.CutoffID}
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
};

export default MeritRankWiseCutOff;
