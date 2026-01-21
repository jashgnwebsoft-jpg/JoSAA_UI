import { useEffect } from 'react';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useParams } from 'react-router';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { Field } from '@gnwebsoft/ui';
import { useForm } from 'react-hook-form';
import { useCategoryOptions } from '@modules/Master/Category/api/hooks';
import { useQuotaOptions } from '@modules/Master/Quota/api/hooks';
import { useTranslate } from '@minimal/utils/locales';
import { usePreviousYearWiseCutoffListModifiedQuery } from '@modules/Institute/PreviousYearCutoffRowData/api/hooks';
import { usePreviousYearWiseCutoffListStore } from '@modules/Institute/PreviousYearCutoffRowData/api/store';
import {
  PreviousYearWiseCutoffRow,
  PreviousYearWiseCutoffListRequest,
} from '@modules/Institute/PreviousYearCutoffRowData/types';
import { josaaDataGridStyles } from '@core/components/Styles';

const PreviousYearWiseCutoffModifiedListPage = () => {
  const { collegeID } = useParams();
  const { t } = useTranslate();

  const { postModel, handlePagination, handleSorting, handleFiltering } =
    usePreviousYearWiseCutoffListStore();

  const categoryOptions = useCategoryOptions();
  const quotaOptions = useQuotaOptions(collegeID!);

  const { control, handleSubmit, setValue } = useForm<PreviousYearWiseCutoffListRequest>({
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!categoryOptions.data?.length || !quotaOptions.data?.length) {
      return;
    }

    const defaultValues: PreviousYearWiseCutoffListRequest = {
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

  const { rows, columns, totalRecords, isLoading } = usePreviousYearWiseCutoffListModifiedQuery(
    updateModel,
    !!collegeID
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
            title={
              <Typography variant='h6'>
                <Typography component='span' color='primary' fontWeight={600}>
                  JoSAA
                </Typography>
                {' : '}
                {t('Institute.PreviousYearCutoffRow.List.Title')}
              </Typography>
            }
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
            getRowHeight={() => 'auto'}
            sx={{
              ...josaaDataGridStyles,
              // '& .MuiDataGrid-columnHeaderTitle': {
              //   whiteSpace: 'nowrap',
              //   textOverflow: 'unset',
              //   overflow: 'visible',
              // },
              // '& .MuiDataGrid-cell': {
              //   padding: 1,
              // },
              // '& .MuiDataGrid-main': {
              //   overflowX: 'auto',
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
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};
export default PreviousYearWiseCutoffModifiedListPage;
