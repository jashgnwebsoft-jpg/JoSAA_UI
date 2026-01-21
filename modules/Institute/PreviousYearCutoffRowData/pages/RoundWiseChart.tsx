import { Field } from '@gnwebsoft/ui';
import { useSelectBranchByCollegeIDQuery } from '@modules/Institute/Branch/api/hooks';
import { useCategoryOptions } from '@modules/Master/Category/api/hooks';
import { useQuotaOptions } from '@modules/Master/Quota/api/hooks';
import { useReservationTypeOptions } from '@modules/Master/ReservationType/api/hooks';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

import { RoundWiseChartRequest, RoundWiseChartResponse } from '../types';
import { useRoundWiseChartQuery } from '../api/hooks';
import { useRoundWiseChartStore } from '../api/store';
import { useTranslate } from '@minimal/utils/locales';

const RoundWiseChart = () => {
  const { collegeID } = useParams();
  const { t } = useTranslate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { postModel, handleFiltering } = useRoundWiseChartStore();

  const yearOptions = [
    { Label: 'Current Year', Value: 0 },
    { Label: 'Last 3 Years', Value: 2 },
    { Label: 'Last 5 Years', Value: 4 },
  ];
  const categoryOptions = useCategoryOptions();
  const reservationTypeOptions = useReservationTypeOptions();
  const quotaOptions = useQuotaOptions(collegeID!);
  const branchByCollegeID = useSelectBranchByCollegeIDQuery(collegeID);

  const { control, handleSubmit, setValue, getValues } = useForm<RoundWiseChartRequest>();

  useEffect(() => {
    if (
      !collegeID ||
      !categoryOptions.data?.length ||
      !reservationTypeOptions.data?.length ||
      !quotaOptions.data?.length ||
      !branchByCollegeID.data?.length
    ) {
      return;
    }

    const defaultPayload: RoundWiseChartRequest = {
      CollegeID: collegeID,
      Year: 2,
      CategoryID: categoryOptions.data[0].Value,
      SeatPoolID: reservationTypeOptions.data[0].Value,
      Status: quotaOptions.data[0].Value,
      BranchID: branchByCollegeID.data[0].Value.toString(),
    };

    Object.entries(defaultPayload).forEach(([key, value]) => {
      setValue(key as keyof RoundWiseChartRequest, value);
    });

    handleFiltering(defaultPayload);
  }, [
    collegeID,
    categoryOptions.data,
    reservationTypeOptions.data,
    quotaOptions.data,
    branchByCollegeID.data,
    handleFiltering,
    setValue,
  ]);

  const isQueryEnabled =
    !!postModel?.CollegeID &&
    !!postModel?.CategoryID &&
    !!postModel?.SeatPoolID &&
    !!postModel?.Status &&
    !!postModel?.BranchID;

  const { data } = useRoundWiseChartQuery(postModel, isQueryEnabled);
  const roundTitles = data?.map((item: RoundWiseChartResponse) => item.RoundTitle) ?? [];
  const roundClosingRank = data?.map((item: RoundWiseChartResponse) => item.ClosingRank) ?? [];

  const roundWiseChart = {
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      confine: true,
    },
    dataZoom: isMobile ? [{ show: false }] : [],
    xAxis: {
      type: 'category',
      data: roundTitles,
      axisLabel: {
        rotate: 45,
        fontSize: 10,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: roundClosingRank,
        barMaxWidth: 40,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          show: false,
        },
      },
    ],
  };

  return (
    <Card>
      <Box component='form'>
        <CardHeader
          title={t('Institute.PreviousYearCutoffRow.RoundWiseChart.Label')}
          action={
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                width: { xs: '100%', md: '50vw' },
              }}
            >
              <Field.Select
                control={control}
                name='Year'
                label='Select Year'
                options={yearOptions}
                size='small'
                onChange={handleSubmit(data => {
                  handleFiltering({
                    ...postModel,
                    Year: data.Year,
                  });
                })}
              />
              <Field.Select
                control={control}
                name='BranchID'
                label={t('Institute.Branch.List.Title')}
                placeholder={t('Institute.Branch.List.Title')}
                options={branchByCollegeID.data || []}
                size='small'
                onChange={handleSubmit(data => {
                  handleFiltering({
                    ...postModel,
                    BranchID: data.BranchID,
                  });
                })}
              />
              <Field.Select
                control={control}
                name='CategoryID'
                label={t('Master.Category.Category.Label')}
                placeholder={t('Master.Category.Category.Placeholder')}
                options={categoryOptions.data || []}
                size='small'
                onChange={handleSubmit(data => {
                  handleFiltering({
                    ...postModel,
                    CategoryID: data.CategoryID,
                  });
                })}
              />
              <Field.Select
                control={control}
                name='SeatPoolID'
                label={t('Master.ReservationType.SeatPool.Label')}
                placeholder={t('Master.ReservationType.SeatPool.Placeholder')}
                options={reservationTypeOptions.data || []}
                size='small'
                onChange={handleSubmit(data => {
                  handleFiltering({
                    ...postModel,
                    SeatPoolID: data.SeatPoolID,
                  });
                })}
              />
              <Field.Select
                control={control}
                name='Status'
                label={t('Master.Quota.Status.Label')}
                placeholder={t('Master.Quota.Status.Placeholder')}
                options={quotaOptions.data || []}
                size='small'
                onChange={handleSubmit(data => {
                  handleFiltering({
                    ...postModel,
                    Status: data.Status,
                  });
                })}
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

      <CardContent>
        <Box display='flex' gap={1}>
          <Typography variant='subtitle1'>Selected Branch:</Typography>
          <Typography variant='body1' color='primary'>
            {branchByCollegeID.data?.find(b => b.Value === getValues('BranchID'))?.Label}
          </Typography>
        </Box>
      </CardContent>

      <CardContent>
        <ReactECharts option={roundWiseChart} style={{ height: 390, width: '100%' }} />
      </CardContent>
    </Card>
  );
};

export default RoundWiseChart;
