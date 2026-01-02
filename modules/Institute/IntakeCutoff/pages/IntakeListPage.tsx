import { useListQuery } from '../api/hooks';
import { useIntakeCutoffListStore } from '../api/store';
import { useEffect, useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';
import { IntakeCutoffListRequest, IntakeCutoffListResponse } from '../types';
import { DataGridFooterProps, DataGridToolbarProps } from '@core/components/SimpleDataGrid/types';
import { CONFIG } from '@/global-config';
import ExtendedDataGridFooter from '@core/components/SimpleDataGrid/ExtendedDataGridFooter';
import { dataGridStyles } from '@core/components/Styles';
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
        minWidth: 120,
        flex: 2,
        sortable: true,
        renderCell: params => <span title={params.row.BranchWebName}>{params.row.BranchName}</span>,
      },
      {
        field: 'ReservationType',
        headerName: t('Master.ReservationType.List.Title'),
        minWidth: 120,
        flex: 1,
        sortable: true,
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
        minWidth: 50,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'IntakeOpenPWD',
        headerName: t('Institute.IntakeCutoff.OpenPWD.Label'),
        minWidth: 50,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'IntakeGENEWS',
        headerName: t('Institute.IntakeCutoff.GENEWS.Label'),
        minWidth: 50,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'IntakeGENEWSPWD',
        // headerName: t('Institute.IntakeCutoff.GENEWSPWD.Label'),
        minWidth: 50,
        flex: 0.5,
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
            {t('Institute.IntakeCutoff.GENEWSPWD.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeSC',
        headerName: t('Institute.IntakeCutoff.Sc.Label'),
        minWidth: 50,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'IntakeSCPWD',
        headerName: t('Institute.IntakeCutoff.ScPWD.Label'),
        minWidth: 50,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'IntakeST',
        headerName: t('Institute.IntakeCutoff.St.Label'),
        minWidth: 50,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'IntakeSTPWD',
        headerName: t('Institute.IntakeCutoff.StPWD.Label'),
        minWidth: 50,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'IntakeOBCNCL',
        headerName: t('Institute.IntakeCutoff.OBCNCL.Label'),
        minWidth: 50,
        flex: 0.5,
        sortable: true,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'IntakeOBCNCLPWD',
        // headerName: t('Institute.IntakeCutoff.OBCNCLPWD.Label'),
        minWidth: 50,
        flex: 0.5,
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
            {t('Institute.IntakeCutoff.OBCNCLPWD.Label')}
          </div>
        ),
      },
      {
        field: 'IntakeTotal',
        headerName: t('Institute.IntakeCutoff.Total.Label'),
        minWidth: 50,
        flex: 0.5,
        sortable: true,
        type: 'number',
        align: 'right',
        headerAlign: 'right',
        aggregationFunction: 'sum',
      },
      {
        field: 'IntakeSeatCapacity',
        // headerName: t('Institute.IntakeCutoff.SeatCapacity.Label'),
        minWidth: 50,
        flex: 0.5,
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
    const storedQuotaID = postModel.filterModel?.QuotaID;
    const defaultQuotaID = quotaOptions.data[0].Value;
    const finalQuotaID = storedQuotaID ?? defaultQuotaID;
    setValue('QuotaID', finalQuotaID);

    if (!storedQuotaID) {
      handleFiltering({
        ...postModel.filterModel,
        QuotaID: finalQuotaID,
      });
    }
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
          }}
        />
      </Box>

      <CardContent sx={{ height: 700 }}>
        <DataGridPro
          rows={totalWithRows}
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
            ...dataGridStyles,
            '& .intake-total-row': {
              fontWeight: 700,
              '& .MuiDataGrid-cell': {
                borderTop: '2px solid #00A76F',
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default IntakeListPage;
