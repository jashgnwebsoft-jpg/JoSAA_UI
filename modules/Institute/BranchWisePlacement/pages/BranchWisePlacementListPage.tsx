import { useTranslate } from '@minimal/utils/locales';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { useParams } from 'react-router';
import { useBranchWisePlacementListStore } from '../api/store';
import {
  useAdmissionOptions,
  useBranchWisePlacementAdmissionYearOptionsByCollegeID,
} from '@modules/Master/AdmissionYear/api/hooks';
import { useForm } from 'react-hook-form';
import { BranchWisePlacementListPageRequest, BranchWisePlacementListPageResponse } from '../types';
import { useBranchWisePlacementListQuery } from '../api/hooks';
import { useEffect, useMemo, useRef } from 'react';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { GridColDef } from '@mui/x-data-grid';
import { fNumber } from '@core/utils/format-number';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { CONFIG } from '@/global-config';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { dataGridStyles, josaaDataGridStyles } from '@core/components/Styles';
import { Field } from '@gnwebsoft/ui';

const BranchWisePlacementListPage = () => {
  const { collegeID } = useParams();
  const { t } = useTranslate();

  const columns = useMemo<GridColDef<BranchWisePlacementListPageResponse>[]>(
    () => [
      // {
      //   field: 'BranchCode',
      //   headerName: t('Institute.Branch.BranchCode.Label'),
      //   minWidth: 120,
      //   flex: 0.5,
      //   sortable: true,
      // },
      {
        field: 'BranchName',
        headerName: t('Institute.Branch.BranchName.Label'),
        minWidth: 120,
        flex: 2,
        sortable: true,
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.Branch.BranchName.Label')}
          </div>
        ),
      },
      {
        field: 'NumberOfStudentRegistered',
        // headerName: t('Institute.BranchWisePlacement.NumberOfStudentRegistered.Label'),
        minWidth: 240,
        flex: 1,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['NumberOfStudentRegistered']) || 'N/A'}</span>
          </>
        ),
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.BranchWisePlacement.NumberOfStudentRegistered.Label')}
          </div>
        ),
      },
      {
        field: 'NumberOfStudentPlaced',
        // headerName: t('Institute.BranchWisePlacement.NumberOfStudentPlaced.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['NumberOfStudentPlaced']) || 'N/A'}</span>
          </>
        ),
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.BranchWisePlacement.NumberOfStudentPlaced.Label')}
          </div>
        ),
      },
      {
        field: 'PlacementRatio',
        // headerName: `${t('Institute.BranchWisePlacement.PlacementRatio.Label')} (%)`,
        minWidth: 120,
        flex: 1,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['PlacementRatio']) || 'N/A'}</span>
          </>
        ),
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.BranchWisePlacement.PlacementRatio.Label')} (%)
          </div>
        ),
      },
      {
        field: 'HigherPackage',
        // headerName: t('Institute.BranchWisePlacement.HigherPackage.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['HigherPackage']) || 'N/A'}</span>
          </>
        ),
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.BranchWisePlacement.HigherPackage.Label')}
          </div>
        ),
      },
      {
        field: 'MedianPackage',
        // headerName: t('Institute.BranchWisePlacement.MedianPackage.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['MedianPackage']) || 'N/A'}</span>
          </>
        ),
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.BranchWisePlacement.MedianPackage.Label')}
          </div>
        ),
      },
      {
        field: 'AveragePackage',
        // headerName: t('Institute.BranchWisePlacement.AveragePackage.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['AveragePackage']) || 'N/A'}</span>
          </>
        ),
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.BranchWisePlacement.AveragePackage.Label')}
          </div>
        ),
      },
      {
        field: 'LowerPackage',
        // headerName: t('Institute.BranchWisePlacement.LowerPackage.Label'),
        minWidth: 120,
        flex: 1,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <>
            <span>{fNumber(params.row['LowerPackage']) || 'N/A'}</span>
          </>
        ),
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('Institute.BranchWisePlacement.LowerPackage.Label')}
          </div>
        ),
      },
    ],
    []
  );

  const { postModel, handlePagination, handleSorting, handleFiltering } =
    useBranchWisePlacementListStore();

  const { control, handleSubmit, setValue, reset } = useForm<BranchWisePlacementListPageRequest>({
    defaultValues: {
      Year: postModel.filterModel?.Year,
    },
  });

  const yearOptions = useBranchWisePlacementAdmissionYearOptionsByCollegeID(collegeID!);

  useEffect(() => {
    if (!yearOptions.data?.length) return;
    const year = postModel.filterModel?.Year;
    const defaultYear = yearOptions.data[0].Value;
    const finalYear = year ?? defaultYear;
    setValue('Year', finalYear);

    if (!year) {
      handleFiltering({
        ...postModel.filterModel,
        Year: finalYear,
      });
    }
  }, [yearOptions.data]);

  const updateModal = {
    ...postModel,
    CollegeID: collegeID!,
  };

  const { data, totalRecords, isLoading } = useBranchWisePlacementListQuery(
    updateModal,
    !!collegeID
  );

  const toolbarProps: DataGridToolbarProps<
    BranchWisePlacementListPageRequest,
    BranchWisePlacementListPageResponse
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
      <CardHeader
        title={t('Institute.BranchWisePlacement.List.Title')}
        action={
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 2,
              width: { xs: '70vw', md: '10vw' },
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Field.Select
                control={control}
                name='Year'
                label={t('Institute.PreviousYearCutoffRow.year.Label')}
                placeholder={t('Institute.PreviousYearCutoffRow.year.Placeholder')}
                options={yearOptions.data || []}
                onChange={handleSubmit(data => {
                  handleFiltering({
                    ...postModel.filterModel,
                    Year: data.Year,
                  });
                })}
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
      <CardContent sx={{ height: 650 }}>
        <DataGridPro
          rows={data}
          density='compact'
          columns={columns}
          getRowId={row => row.BranchWisePlacementID}
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
            pinnedColumns: { left: ['BranchName'] },
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
  );
};
export default BranchWisePlacementListPage;
