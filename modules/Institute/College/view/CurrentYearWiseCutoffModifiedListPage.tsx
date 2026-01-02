import { useEffect, useMemo, useRef } from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { CONFIG } from '@/global-config';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { dataGridStyles } from '@core/components/Styles';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { useParams } from 'react-router';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { Field } from '@gnwebsoft/ui';
import { useForm } from 'react-hook-form';
import { useCategoryOptions } from '@modules/Master/Category/api/hooks';
import { useQuotaOptions } from '@modules/Master/Quota/api/hooks';
import { useReservationTypeOptions } from '@modules/Master/ReservationType/api/hooks';
import { fNumber } from '@core/utils/format-number';
import { useTranslate } from '@minimal/utils/locales';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentYearQuery } from '@modules/Master/AdmissionYear/api/hooks';
import { useCurrentYearWiseCutoffListQuery } from '@modules/Institute/PreviousYearCutoffRowData/api/hooks';
import { useCurrentYearWiseCutoffListStore } from '@modules/Institute/PreviousYearCutoffRowData/api/store';
import {
  CurrentYearWiseCutoffListRequest,
  CurrentYearWiseCutoffListSchema,
  CurrentYearWiseCutoffRow,
} from '@modules/Institute/PreviousYearCutoffRowData/types';

const CurrentYearWiseCutoffModifiedListPage = () => {
  const { collegeID } = useParams();
  const { t } = useTranslate();

  const roundConfigs = [
    { key: 'Round 1', labelKey: 'Institute.PreviousYearCutoffRow.Round1.Label' },
    { key: 'Round 2', labelKey: 'Institute.PreviousYearCutoffRow.Round2.Label' },
    { key: 'Round 3', labelKey: 'Institute.PreviousYearCutoffRow.Round3.Label' },
    { key: 'Round 4', labelKey: 'Institute.PreviousYearCutoffRow.Round4.Label' },
    { key: 'Round 5', labelKey: 'Institute.PreviousYearCutoffRow.Round5.Label' },
    { key: 'Round 6', labelKey: 'Institute.PreviousYearCutoffRow.Round6.Label' },
    { key: 'Round 7', labelKey: 'Institute.PreviousYearCutoffRow.Round7.Label' },
  ];

  const { postModel, handlePagination, handleSorting, handleFiltering } =
    useCurrentYearWiseCutoffListStore();

  const categoryOptions = useCategoryOptions();
  const reservationTypeOptions = useReservationTypeOptions();
  const quotaOptions = useQuotaOptions(collegeID!);

  const { control, handleSubmit, setValue, reset } = useForm<CurrentYearWiseCutoffListRequest>({
    resolver: zodResolver(CurrentYearWiseCutoffListSchema),
    shouldUnregister: false,
  });

  const { data: currentYear } = useCurrentYearQuery();

  const initializedRef = useRef(false);

  const defaultValues = useMemo<CurrentYearWiseCutoffListRequest | null>(() => {
    if (
      !categoryOptions.data?.length ||
      !reservationTypeOptions.data?.length ||
      !quotaOptions.data?.length
    ) {
      return null;
    }

    return {
      CategoryID: categoryOptions.data[0].Value,
      SeatPoolID: reservationTypeOptions.data[0].Value,
      Status: quotaOptions.data[0].Value,
    };
  }, [categoryOptions.data, reservationTypeOptions.data, quotaOptions.data]);

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

  const { data, totalRecords, isLoading } = useCurrentYearWiseCutoffListQuery(
    requestModel,
    !!defaultValues
  );
  const columns = useMemo<GridColDef<CurrentYearWiseCutoffRow>[]>(() => {
    const baseColumns: GridColDef<CurrentYearWiseCutoffRow>[] = [
      {
        field: 'BranchName',
        headerName: t('Institute.Branch.BranchName.Label'),
        minWidth: 120,
        flex: 2,
        sortable: false,
      },
    ];

    if (!data || data.length === 0) return baseColumns;

    const roundColumns = roundConfigs
      .filter(round =>
        data.some(
          row =>
            row[round.key as keyof CurrentYearWiseCutoffRow] !== null &&
            row[round.key as keyof CurrentYearWiseCutoffRow] !== undefined &&
            row[round.key as keyof CurrentYearWiseCutoffRow] !== ''
        )
      )
      .map<GridColDef<CurrentYearWiseCutoffRow>>(round => ({
        field: round.key,
        headerName: t(round.labelKey),
        minWidth: 120,
        flex: 1,
        sortable: false,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => <span>{fNumber(params.row[round.key]) || '-'}</span>,
      }));

    return [...baseColumns, ...roundColumns];
  }, [data, t]);

  const onFilterChange = (key: keyof CurrentYearWiseCutoffListRequest) =>
    handleSubmit(formData => {
      handleFiltering({
        ...postModel.filterModel,
        [key]: formData[key],
      });
    });

  const toolbarProps: DataGridToolbarProps<
    CurrentYearWiseCutoffListRequest,
    CurrentYearWiseCutoffRow
  > = {
    toolbar: {
      columns,
      addNew: () => {},
      filterModel: postModel.filterModel ?? {},
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
            title={'Cutoff : Admission Year ' + currentYear?.AdmissionYear}
            action={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                  width: { xs: '70vw', md: '30vw' },
                }}
              >
                <Box sx={{ width: '100%' }}>
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
                <Box sx={{ width: '100%' }}>
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
                </Box>
                <Box sx={{ width: '100%' }}>
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
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'flex-start', md: 'space-between' },
              alignItems: { xs: 'flex-start', md: 'center' },

              '& .MuiCardHeader-content': {
                width: { xs: '100%', md: 'auto' },
                marginBottom: { xs: 2, md: 0 },
              },

              '& .MuiCardHeader-action': {
                width: { xs: '100%', md: 'auto' },
                marginTop: { xs: 1, md: 0 },
              },
            }}
          />
        </Box>
        <CardContent sx={{ height: 700 }}>
          <DataGridPro
            rows={data}
            columns={columns}
            getRowId={row => row.BranchCode}
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
    </>
  );
};
export default CurrentYearWiseCutoffModifiedListPage;
