import { useListQuery } from '../api/hooks';
import { useIntakeCutoffListStore } from '../api/store';
import { useEffect, useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';
import { IntakeCutoffListRequest, IntakeCutoffListResponse } from '../types';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { CONFIG } from '@/global-config';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { dataGridStyles, josaaDataGridStyles } from '@core/components/Styles';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { Label } from '@minimal/components/label';
import ExtendedDataGridToolbar from '@core/components/SimpleDataGrid/ExtendedDataGridToolbar';
import { Field } from '@gnwebsoft/ui';
import { useForm } from 'react-hook-form';
import { useQuotaOptions } from '@modules/Master/Quota/api/hooks';
import { useTranslate } from '@minimal/utils/locales';

const IntakeListPage = () => {
  const { collegeID } = useParams();
  const { t } = useTranslate();

  const columns = useMemo<GridColDef<IntakeCutoffListResponse>[]>(
    () => [
      {
        field: 'BranchName',
        headerName: t('Institute.Branch.BranchName.Label'),
        minWidth: 130,
        flex: 1.5,
        sortable: true,
        renderCell: params => <span title={params.row.BranchWebName}>{params.row.BranchName}</span>,
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
        field: 'ReservationType',
        headerName: t('Master.ReservationType.List.Title'),
        minWidth: 180,
        flex: 1,
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
            {t('Master.ReservationType.List.Title')}
          </div>
        ),
        renderCell: params =>
          params.row.ReservationType !== null ? (
            params.row.ReservationType === 'Gender-Neutral' ? (
              <Label color='primary' variant='soft'>
                {params.row.ReservationType}
              </Label>
            ) : (
              <Label color='warning' variant='soft'>
                Female-Only
              </Label>
            )
          ) : (
            <Typography variant='subtitle1' pl={0.5}>
              Total
            </Typography>
          ),
      },
      {
        field: 'IntakeOpen',
        headerName: t('Institute.IntakeCutoff.Open.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
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
            {t('Institute.IntakeCutoff.Open.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeOpenPWD',
        headerName: t('Institute.IntakeCutoff.OpenPWD.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
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
            {t('Institute.IntakeCutoff.OpenPWD.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeGENEWS',
        headerName: t('Institute.IntakeCutoff.GENEWS.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
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
            {t('Institute.IntakeCutoff.GENEWS.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeGENEWSPWD',
        // headerName: t('Institute.IntakeCutoff.GENEWSPWD.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {t('Institute.IntakeCutoff.GENEWSPWD.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeSC',
        headerName: t('Institute.IntakeCutoff.Sc.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
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
            {t('Institute.IntakeCutoff.Sc.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeSCPWD',
        headerName: t('Institute.IntakeCutoff.ScPWD.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
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
            {t('Institute.IntakeCutoff.ScPWD.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeST',
        headerName: t('Institute.IntakeCutoff.St.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
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
            {t('Institute.IntakeCutoff.St.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeSTPWD',
        headerName: t('Institute.IntakeCutoff.StPWD.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
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
            {t('Institute.IntakeCutoff.StPWD.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeOBCNCL',
        headerName: t('Institute.IntakeCutoff.OBCNCL.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
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
            {t('Institute.IntakeCutoff.OBCNCL.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeOBCNCLPWD',
        // headerName: t('Institute.IntakeCutoff.OBCNCLPWD.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderHeader: () => (
          <div
            className='gn-grid-header'
            style={{
              whiteSpace: 'break-spaces',
              lineBreak: 'auto',
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {t('Institute.IntakeCutoff.OBCNCLPWD.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeTotal',
        headerName: t('Institute.IntakeCutoff.Total.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        type: 'number',
        align: 'right',
        headerAlign: 'right',
        aggregationFunction: 'sum',
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
            {t('Institute.IntakeCutoff.Total.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeSeatCapacity',
        // headerName: t('Institute.IntakeCutoff.SeatCapacity.Label'),
        minWidth: 90,
        flex: 0.7,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: params => (
          <span style={{ color: '#00a76f' }}>{params.row.IntakeSeatCapacity}</span>
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
            {t('Institute.IntakeCutoff.SeatCapacity.Label')}
          </div>
        ),
      },
    ],
    [t]
  );

  const { postModel, handlePagination, handleSorting, handleFiltering } =
    useIntakeCutoffListStore();

  const { control, handleSubmit, setValue } = useForm<IntakeCutoffListRequest>({
    defaultValues: {
      QuotaID: postModel.filterModel?.QuotaID,
    },
  });

  const quotaOptions = useQuotaOptions(collegeID!);

  useEffect(() => {
    if (!quotaOptions.data?.length) return;
    const defaultQuotaID = quotaOptions.data[0].Value;

    setValue('QuotaID', defaultQuotaID);

    handleFiltering({
      ...postModel.filterModel,
      QuotaID: defaultQuotaID,
    });
  }, [quotaOptions.data]);

  const updateModal = {
    ...postModel,
    CollegeID: collegeID!,
  };

  const { data, totalRecords, isLoading } = useListQuery(updateModal, !!collegeID);

  const totalWithRows = useMemo<IntakeCutoffListResponse[]>(() => {
    if (!data?.length) return [];

    let intakeTotalSum = 0;
    let intakeOpen = 0;
    let intakeOpenPWD = 0;
    let intakeGENEWS = 0;
    let intakeGENEWSPWD = 0;
    let intakeSC = 0;
    let intakeSCPWD = 0;
    let intakeST = 0;
    let intakeSTPWD = 0;
    let intakeOBCNCL = 0;
    let intakeOBCNCLPWD = 0;
    let totalSeatCapacity = 0;

    data.forEach((item: IntakeCutoffListResponse, index: number) => {
      intakeOpen += item.IntakeOpen;
      intakeOpenPWD += item.IntakeOpenPWD;
      intakeGENEWS += item.IntakeGENEWS;
      intakeGENEWSPWD += item.IntakeGENEWSPWD;
      intakeSC += item.IntakeSC;
      intakeSCPWD += item.IntakeSCPWD;
      intakeST += item.IntakeST;
      intakeSTPWD += item.IntakeSTPWD;
      intakeOBCNCL += item.IntakeOBCNCL;
      intakeOBCNCLPWD += item.IntakeOBCNCLPWD;
      intakeTotalSum += item.IntakeTotal;
      if (index % 2 === 0) {
        totalSeatCapacity += item.IntakeSeatCapacity;
      }
    });

    const totalRow: IntakeCutoffListResponse = {
      IntakeCutoffID: 'TOTAL_ROW',
      BranchName: '',
      BranchWebName: '',
      ReservationType: null,
      IntakeOpen: intakeOpen,
      IntakeOpenPWD: intakeOpenPWD,
      IntakeGENEWS: intakeGENEWS,
      IntakeGENEWSPWD: intakeGENEWSPWD,
      IntakeSC: intakeSC,
      IntakeSCPWD: intakeSCPWD,
      IntakeST: intakeST,
      IntakeSTPWD: intakeSTPWD,
      IntakeOBCNCL: intakeOBCNCL,
      IntakeOBCNCLPWD: intakeOBCNCLPWD,
      IntakeTotal: intakeTotalSum,
      IntakeSeatCapacity: totalSeatCapacity,
    };

    return [...data, totalRow];
  }, [data]);

  const toolbarProps: DataGridToolbarProps<IntakeCutoffListRequest, IntakeCutoffListResponse> = {
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
          title={t('Institute.IntakeCutoff.BranchIntake.Label')}
          action={
            <Box sx={{ width: { xs: '70vw', md: '10vw' } }}>
              <Field.Select
                control={control}
                name='QuotaID'
                label={t('Master.Quota.Status.Label')}
                options={quotaOptions.data || []}
                size='small'
                onChange={handleSubmit(data => {
                  handleFiltering({
                    ...postModel.filterModel,
                    QuotaID: data.QuotaID,
                  });
                })}
                gridProps={{ size: { xs: 12, md: 12 } }}
              />
            </Box>
          }
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'flex-start', md: 'space-between' },
            alignItems: { xs: 'flex-start', md: 'center' },
            '& .MuiCardHeader-content': {
              width: { xs: '100%', md: 'auto' },
              marginBottom: { xs: 1, md: 0 },
            },

            '& .MuiCardHeader-action': {
              width: { xs: '100%', md: 'auto' },
              marginTop: { xs: 1, md: 0 },
            },
          }}
        />
      </Box>

      <CardContent sx={{ height: 650 }}>
        <DataGridPro
          rows={totalWithRows}
          density='compact'
          columns={columns}
          getRowId={row => row.IntakeCutoffID}
          getRowClassName={params =>
            params.row.IntakeCutoffID === 'TOTAL_ROW' ? 'intake-total-row' : ''
          }
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
          getRowHeight={() => 'auto'}
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
            '& .intake-total-row': {
              fontWeight: 700,
              '& .MuiDataGrid-cell': {
                borderTop: '2px solid #00A76F',
              },
            },
            // '& .MuiDataGrid-cell': {
            //   padding: 1,
            //   display: 'flex',
            //   alignItems: 'center',
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
  );
};

export default IntakeListPage;
