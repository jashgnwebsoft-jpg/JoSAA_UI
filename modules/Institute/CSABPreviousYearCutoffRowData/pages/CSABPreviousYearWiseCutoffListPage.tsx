import { useParams } from 'react-router';
import {
  CSABPreviousYearWiseCutoffListRequest,
  CSABPreviousYearWiseCutoffRow,
  PivotRow,
} from '../types';
import { useTranslate } from '@minimal/utils/locales';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useMemo, useRef } from 'react';
import { fNumber } from '@core/utils/format-number';
import { useCSABPreviousYearWiseCutoffListStore } from '../api/store';
import { useCategoryOptions } from '@modules/Master/api/query';
import { useReservationTypeOptions } from '@modules/Master/ReservationType/api/hooks';
import { useQuotaOptions } from '@modules/Master/Quota/api/hooks';
import { useSelectBranchByCollegeIDQuery } from '@modules/Institute/Branch/api/hooks';
import { useForm } from 'react-hook-form';
import { useCSABPreviousYearWiseCutoffListQuery } from '../api/hooks';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { CONFIG } from '@/global-config';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { dataGridStyles } from '@core/components/Styles';
import { Field } from '@gnwebsoft/ui';
import { Card, Box, CardHeader, CardContent, Typography } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';

const CSABPreviousYearWiseCutoffListPage = () => {
  const { collegeID } = useParams();
  const { t } = useTranslate();

  const { postModel, handlePagination, handleSorting, handleFiltering } =
    useCSABPreviousYearWiseCutoffListStore();

  const categoryOptions = useCategoryOptions();
  const quotaOptions = useQuotaOptions(collegeID!);

  const { control, handleSubmit, reset } = useForm<CSABPreviousYearWiseCutoffListRequest>({
    shouldUnregister: false,
  });

  const initializedRef = useRef(false);

  const defaultValues = useMemo<CSABPreviousYearWiseCutoffListRequest | null>(() => {
    if (!categoryOptions.data?.length || !quotaOptions.data?.length) {
      return null;
    }

    return {
      CategoryID: categoryOptions.data[0].Value,
      Status: quotaOptions.data[0].Value,
    };
  }, [categoryOptions.data, quotaOptions.data]);

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

  const { rows, columns, totalRecords, isLoading } = useCSABPreviousYearWiseCutoffListQuery(
    requestModel,
    !!defaultValues
  );

  const onFilterChange = (key: keyof CSABPreviousYearWiseCutoffListRequest) =>
    handleSubmit(formData => {
      handleFiltering({
        ...postModel.filterModel,
        [key]: formData[key],
      });
    });

  const toolbarProps: DataGridToolbarProps<
    CSABPreviousYearWiseCutoffListRequest,
    CSABPreviousYearWiseCutoffRow
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
    <Card>
      <Box component='form'>
        <CardHeader
          title={'CSAB : ' + t('Institute.PreviousYearCutoffRow.List.Title')}
          action={
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                gap: 2,
                width: '25vw',
                mb: 2,
              }}
            >
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
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
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
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
      <CardContent sx={{ height: 700, py: 0 }}>
        <DataGridPro
          rows={rows}
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
            pinnedColumns: { left: ['BranchName', 'ReservationType'] },
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
            '& .MuiDataGrid-columnHeaderTitle': {
              whiteSpace: 'nowrap',
              textOverflow: 'unset',
              overflow: 'visible',
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'nowrap',
            },
            '& .MuiDataGrid-main': {
              overflowX: 'auto',
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
export default CSABPreviousYearWiseCutoffListPage;
