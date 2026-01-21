import { useEffect, useMemo, useRef } from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { CONFIG } from '@/global-config';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { dataGridStyles, josaaDataGridStyles } from '@core/components/Styles';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useParams } from 'react-router';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { Field } from '@gnwebsoft/ui';
import { useForm } from 'react-hook-form';
import { PreviousYearWiseCutoffListRequest, PreviousYearWiseCutoffRow } from '../types';
import { usePreviousYearWiseCutoffListStore } from '../api/store';
import { usePreviousYearWiseCutoffListQuery } from '../api/hooks';
import { useCategoryOptions } from '@modules/Master/Category/api/hooks';
import { useQuotaOptions } from '@modules/Master/Quota/api/hooks';
import { useReservationTypeOptions } from '@modules/Master/ReservationType/api/hooks';
import { useSelectBranchByCollegeIDQuery } from '@modules/Institute/Branch/api/hooks';
import { fNumber } from '@core/utils/format-number';
import { useTranslate } from '@minimal/utils/locales';

const PreviousYearWiseCutoffListPage = () => {
  const { collegeID } = useParams();
  const { t } = useTranslate();

  const columns = useMemo<GridColDef<PreviousYearWiseCutoffRow>[]>(
    () => [
      {
        field: 'AdmissionYear',
        headerName: t('Master.Schedule.AdmissionYear.Label'),
        minWidth: 120,
        flex: 2,
        sortable: false,
      },
      {
        field: 'Round 1',
        headerName: t('Institute.PreviousYearCutoffRow.Round1.Label'),
        minWidth: 120,
        flex: 1,
        sortable: false,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['Round 1']) || '-'}</span>
          </>
        ),
      },
      {
        field: 'Round 2',
        headerName: t('Institute.PreviousYearCutoffRow.Round2.Label'),
        minWidth: 120,
        flex: 1,
        sortable: false,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['Round 2']) || '-'}</span>
          </>
        ),
      },
      {
        field: 'Round 3',
        headerName: t('Institute.PreviousYearCutoffRow.Round3.Label'),
        minWidth: 120,
        flex: 1,
        sortable: false,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['Round 3']) || '-'}</span>
          </>
        ),
      },
      {
        field: 'Round 4',
        headerName: t('Institute.PreviousYearCutoffRow.Round4.Label'),
        minWidth: 120,
        flex: 1,
        sortable: false,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['Round 4']) || '-'}</span>
          </>
        ),
      },
      {
        field: 'Round 5',
        headerName: t('Institute.PreviousYearCutoffRow.Round5.Label'),
        minWidth: 120,
        flex: 1,
        sortable: false,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['Round 5']) || '-'}</span>
          </>
        ),
      },
      {
        field: 'Round 6',
        headerName: t('Institute.PreviousYearCutoffRow.Round6.Label'),
        minWidth: 120,
        flex: 1,
        sortable: false,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['Round 6']) || '-'}</span>
          </>
        ),
      },
      {
        field: 'Round 7',
        headerName: t('Institute.PreviousYearCutoffRow.Round7.Label'),
        minWidth: 120,
        flex: 1,
        sortable: false,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['Round 7']) || '-'}</span>
          </>
        ),
      },
    ],
    []
  );

  const { postModel, handlePagination, handleSorting, handleFiltering } =
    usePreviousYearWiseCutoffListStore();

  const categoryOptions = useCategoryOptions();
  const reservationTypeOptions = useReservationTypeOptions();
  const quotaOptions = useQuotaOptions(collegeID!);
  const branchByCollegeID = useSelectBranchByCollegeIDQuery(collegeID);

  const { control, handleSubmit, reset, getValues } = useForm<PreviousYearWiseCutoffListRequest>({
    shouldUnregister: false,
  });

  const initializedRef = useRef(false);

  const defaultValues = useMemo<PreviousYearWiseCutoffListRequest | null>(() => {
    if (
      !categoryOptions.data?.length ||
      !reservationTypeOptions.data?.length ||
      !quotaOptions.data?.length ||
      !branchByCollegeID.data?.length
    ) {
      return null;
    }

    return {
      CategoryID: categoryOptions.data[0].Value,
      SeatPoolID: reservationTypeOptions.data[0].Value,
      Status: quotaOptions.data[0].Value,
      BranchID: branchByCollegeID.data[0].Value.toString(),
    };
  }, [
    categoryOptions.data,
    reservationTypeOptions.data,
    quotaOptions.data,
    branchByCollegeID.data,
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
  }, [defaultValues, postModel.filterModel, reset, handleFiltering]);

  const requestModel = useMemo(
    () => ({
      ...postModel,
      CollegeID: collegeID!,
    }),
    [postModel, collegeID]
  );

  const { data, totalRecords, isLoading } = usePreviousYearWiseCutoffListQuery(
    requestModel,
    !!defaultValues
  );

  const onFilterChange = (key: keyof PreviousYearWiseCutoffListRequest) =>
    handleSubmit(formData => {
      handleFiltering({
        ...postModel.filterModel,
        [key]: formData[key],
      });
    });

  const toolbarProps: DataGridToolbarProps<
    PreviousYearWiseCutoffListRequest,
    PreviousYearWiseCutoffRow
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

  return (
    <>
      <Card>
        <Box component='form'>
          <CardHeader
            title={t('Institute.PreviousYearCutoffRow.List.Title')}
            action={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  gap: 2,
                  width: '70vw',
                }}
              >
                {/* <Box sx={{ width: { xs: '100%', md: '40%' } }}>
                  <Field.Select
                    control={control}
                    name='BranchID'
                    label={t('Institute.Branch.List.Title')}
                    placeholder={t('Institute.Branch.List.Title')}
                    options={branchByCollegeID.data || []}
                    onChange={onFilterChange('BranchID')}
                    size='small'
                  />
                </Box> */}
                <Box sx={{ width: { xs: '100%', md: '40%' } }}>
                  <Field.Select
                    control={control}
                    name='CategoryID'
                    label={t('Master.Category.Category.Label')}
                    placeholder={t('Master.Category.Category.Placeholder')}
                    options={categoryOptions.data || []}
                    onChange={onFilterChange('CategoryID')}
                    fullWidth
                    size='small'
                  />
                </Box>
                {/* <Box sx={{ width: { xs: '100%', md: '40%' } }}>
                  <Field.Select
                    control={control}
                    name='SeatPoolID'
                    label={t('Master.ReservationType.SeatPool.Label')}
                    placeholder={t('Master.ReservationType.SeatPool.Placeholder')}
                    options={reservationTypeOptions.data || []}
                    onChange={onFilterChange('SeatPoolID')}
                    fullWidth
                    size='small'
                  />
                </Box> */}
                <Box sx={{ width: { xs: '100%', md: '40%' } }}>
                  <Field.Select
                    control={control}
                    name='Status'
                    label={t('Master.Quota.Status.Label')}
                    placeholder={t('Master.Quota.Status.Placeholder')}
                    options={quotaOptions.data || []}
                    onChange={onFilterChange('Status')}
                    fullWidth
                    size='small'
                  />
                </Box>
              </Box>
            }
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              justifyContent: { xs: 'flex-start', lg: 'space-between' },
              alignItems: { xs: 'flex-start', lg: 'center' },

              '& .MuiCardHeader-content': {
                width: { xs: '100%', lg: 'auto' },
                marginBottom: { xs: 2, lg: 0 },
              },

              '& .MuiCardHeader-action': {
                width: { xs: '100%', lg: 'auto' },
                marginTop: { xs: 1, lg: 0 },
              },
            }}
          />
        </Box>
        {/* <CardContent sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Typography variant='subtitle1'>Select Branch :-</Typography>
            <Typography mb={2} variant='body1' color='primary'>
              {branchByCollegeID.data?.find(temp => temp.Value === getValues('BranchID'))?.Label}
            </Typography>
          </Box>
        </CardContent> */}
        <CardContent sx={{ height: 650, py: 0 }}>
          <DataGridPro
            rows={data}
            density='compact'
            columns={columns}
            getRowId={row => row.id}
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
        </CardContent>
      </Card>
    </>
  );
};
export default PreviousYearWiseCutoffListPage;
