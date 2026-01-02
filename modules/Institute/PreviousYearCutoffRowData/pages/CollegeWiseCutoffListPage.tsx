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
import { useAdmissionOptions, useCurrentYearQuery } from '@modules/Master/AdmissionYear/api/hooks';
import { useCollegeOptions } from '@modules/Institute/College/api/hooks';
import { useCategoryOptions } from '@modules/Master/Category/api/hooks';
import { useReservationTypeOptions } from '@modules/Master/ReservationType/api/hooks';
import { useCollegeRankWiseCutOffQuery } from '../api/hooks';
import { toast } from 'sonner';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { GridColDef } from '@mui/x-data-grid';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { dataGridStyles } from '@core/components/Styles';
import { Field } from '@gnwebsoft/ui';
import { Grid, Card, CardHeader, CardContent, Box, Button, Typography } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { fNumber } from '@core/utils/format-number';
import { zodResolver } from '@hookform/resolvers/zod';

const CollegeWiseCutoffListPage = () => {
  const { t } = useTranslate();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const columns = useMemo<GridColDef<CollegeWiseCutoffListResponse>[]>(
    () => [
      {
        field: 'BranchProperName',
        headerName: t('Institute.Branch.List.Title'),
        flex: 2,
        minWidth: 120,
        sortable: true,
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

  const { postModel, handlePagination, handleSorting, handleFiltering } =
    useCollegeWiseCutOffListStore();

  const { control, handleSubmit, reset } = useForm<CollegeWiseCutoffListRequest>({
    resolver: zodResolver(CollegeWiseCutoffListSchema),
    shouldUnregister: false,
    mode: 'onSubmit',
  });

  const initializedRef = useRef<boolean>(false);

  const yearOptions = useAdmissionOptions();
  const collegeOptions = useCollegeOptions();
  const categoryOptions = useCategoryOptions();
  const categoryOptionsWithAll = useMemo(() => {
    if (!categoryOptions.data) return [];

    return [{ Value: '', Label: 'All' }, ...categoryOptions.data];
  }, [categoryOptions.data]);
  const reservationTypeOptions = useReservationTypeOptions();
  const roundOptions = useMemo(
    () => [
      { Label: 'Round 1', Value: 1 },
      { Label: 'Round 2', Value: 2 },
      { Label: 'Round 3', Value: 3 },
      { Label: 'Round 4', Value: 4 },
      { Label: 'Round 5', Value: 5 },
      { Label: 'Round 6', Value: 6 },
      { Label: 'Round 7', Value: 7 },
    ],
    []
  );

  const defaultValues = useMemo<CollegeWiseCutoffListRequest | null>(() => {
    if (
      !yearOptions.data?.length ||
      !collegeOptions.data?.length ||
      !categoryOptionsWithAll?.length ||
      !reservationTypeOptions.data?.length ||
      !roundOptions.length
    ) {
      return null;
    }

    return {
      Year: yearOptions.data?.[0].Value,
      College: collegeOptions.data[0].Value,
      Category: categoryOptionsWithAll[0].Value,
      ReservationType: reservationTypeOptions.data[0].Value,
      RoundID: roundOptions?.[0].Value,
    };
  }, [
    yearOptions.data,
    collegeOptions.data,
    categoryOptionsWithAll,
    reservationTypeOptions.data,
    roundOptions,
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

  const { data, totalRecords, isLoading, error } = useCollegeRankWiseCutOffQuery(
    postModel,
    isInitialized
  );
  {
    error && toast.error(error.message);
  }
  const { data: currentYear } = useCurrentYearQuery();

  const toolbarProps: DataGridToolbarProps<
    CollegeWiseCutoffListRequest,
    CollegeWiseCutoffListResponse
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

  const onSubmit = handleSubmit(data => {
    handleFiltering(data);
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
            <CardContent>
              <Box
                component='form'
                onSubmit={onSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
              >
                <Field.Select
                  control={control}
                  size='small'
                  name='College'
                  label={t('Institute.College.List.Title') + '*'}
                  options={collegeOptions.data || []}
                />
                <Field.Select
                  control={control}
                  size='small'
                  name='Category'
                  label={t('Master.Category.Category.Label')}
                  options={categoryOptionsWithAll}
                />
                <Field.Select
                  control={control}
                  size='small'
                  name='ReservationType'
                  label={t('Master.ReservationType.SeatPool.Label') + '*'}
                  options={reservationTypeOptions.data || []}
                />
                <Field.Select
                  control={control}
                  size='small'
                  name='Year'
                  label={t('Institute.PreviousYearCutoffRow.year.Label') + '*'}
                  options={yearOptions.data || []}
                />
                <Field.Select
                  control={control}
                  size='small'
                  name='RoundID'
                  label={t('Institute.PreviousYearCutoffRow.Round.Label') + '*'}
                  options={roundOptions || []}
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
            <CardContent sx={{ height: 700 }}>
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
export default CollegeWiseCutoffListPage;
