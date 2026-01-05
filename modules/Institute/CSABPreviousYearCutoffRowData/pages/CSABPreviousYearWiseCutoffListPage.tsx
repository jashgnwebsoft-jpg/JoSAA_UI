import { useParams } from 'react-router';
import {
  CSABPreviousYearWiseCutoffListRequest,
  CSABPreviousYearWiseCutoffListSchema,
  CSABPreviousYearWiseCutoffRow,
} from '../types';
import { useTranslate } from '@minimal/utils/locales';
import { useEffect } from 'react';
import { useCSABPreviousYearWiseCutoffListStore } from '../api/store';
import { useQuotaOptions } from '@modules/Master/Quota/api/hooks';
import { useForm } from 'react-hook-form';
import { useCSABPreviousYearWiseCutoffListQuery } from '../api/hooks';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { Field } from '@gnwebsoft/ui';
import { Card, Box, CardHeader, CardContent } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { LoadingScreen } from '@minimal/components/loading-screen';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryOptions } from '@modules/Master/Category/api/hooks';

const CSABPreviousYearWiseCutoffListPage = () => {
  const { collegeID } = useParams();
  const { t } = useTranslate();

  const { postModel, handlePagination, handleSorting, handleFiltering } =
    useCSABPreviousYearWiseCutoffListStore();

  const categoryOptions = useCategoryOptions();
  const quotaOptions = useQuotaOptions(collegeID!);

  const { control, handleSubmit, setValue } = useForm<CSABPreviousYearWiseCutoffListRequest>({
    resolver: zodResolver(CSABPreviousYearWiseCutoffListSchema),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!categoryOptions.data?.length || !quotaOptions.data?.length) {
      return;
    }

    const defaultValues: CSABPreviousYearWiseCutoffListRequest = {
      CollegeID: collegeID!,
      CategoryID: categoryOptions.data[0].Value,
      Status: quotaOptions.data[0].Value,
    };

    setValue('CategoryID', defaultValues.CategoryID);
    setValue('Status', defaultValues.Status);

    handleFiltering({ ...postModel.filterModel, ...defaultValues });
  }, [categoryOptions.data, quotaOptions.data]);

  const updateModel = {
    ...postModel,
    CollegeID: collegeID!,
  };

  const { rows, columns, totalRecords, isLoading } = useCSABPreviousYearWiseCutoffListQuery(
    updateModel,
    !!collegeID
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

  if (isLoading) {
    <LoadingScreen />;
  }

  return (
    <Card>
      <Box component='form'>
        <CardHeader
          title={'CSAB : ' + t('Institute.PreviousYearCutoffRow.List.Title')}
          action={
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                width: { xs: '70vw', md: '25vw' },
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
      <CardContent sx={{ height: 650, py: 0 }}>
        <DataGridPro
          rows={rows}
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
            pinnedColumns: { left: ['BranchName', 'ReservationType'] },
          }}
          onPaginationModelChange={handlePagination}
          onSortModelChange={handleSorting}
          rowCount={totalRecords}
          loading={isLoading}
          pageSizeOptions={[1000]}
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
              padding: 1,
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-main': {
              overflowX: 'auto',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: theme => theme.palette.action.hover,
            },
            '& .MuiTablePagination-root': {
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
            },
            '& .MuiTablePagination-toolbar': {
              paddingLeft: { xs: 0 },
            },
            '& .MuiBox-root .css-1shozee': {
              display: 'none',
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
export default CSABPreviousYearWiseCutoffListPage;
