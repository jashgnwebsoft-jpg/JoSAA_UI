import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';

import { useSelectKeyDateQuery } from '../api/hooks';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';
import MainContent from '@core/components/MainContent/MainContent';
import { Box, TextField, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Iconify } from '@minimal/components/iconify';
import React, { useEffect, useMemo, useState } from 'react';
import { KeyDateResponse } from '../types';

const KeyDate = () => {
  const { t } = useTranslate();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data } = useSelectKeyDateQuery();

  const color = ['#8e33ff', '#003768', '#ffab00', '#22c55e', '#00b8d9'];
  const bgColor = ['#f0eaf8', '#c4d1dd', '#fdf6e8', '#e1f5e9', '#d8edf0'];
  const tooltipInfo = [
    'Choice Filling Result',
    'Registration',
    'Choice Filling',
    'Seat Allocation',
    'Bank Fees Payment',
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    const s = debouncedSearch.toLowerCase();

    return data?.filter(
      (item: KeyDateResponse) =>
        item.ScheduleStartDate?.toLowerCase().includes(s) ||
        item.ScheduleEndDate?.toLowerCase().includes(s) ||
        item.ScheduleTitle?.toLowerCase().includes(s) ||
        dayjs(item.ScheduleStartDate)
          .format(CONFIG.dateTimePatterns.date)
          .toLowerCase()
          .includes(s) ||
        dayjs(item.ScheduleEndDate).format(CONFIG.dateTimePatterns.date).toLowerCase().includes(s)
    );
  }, [debouncedSearch, data]);

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Master.Schedule.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      {/* <SimpleBreadcrumbs
        heading={t('Master.Schedule.List.Title')}
        links={[{ name: 'Home' }, { name: t('Master.Schedule.List.Title') }]}
      /> */}
      {/* <CalendarView events={data} eventsLoading={isLoading} />  */}

      <MainContent
        breadCrumbsProps={{
          heading: t('Master.Schedule.List.Title'),
          links: [{ name: 'Home' }, { name: t('Master.Schedule.List.Title') }],
        }}
        sx={{ p: 0 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            px: 1,
            py: 2,
            position: 'sticky',
            top: 0,
            width: '100%',
            backgroundColor: 'white',
            gap: 2,
          }}
        >
          <TextField
            name='search'
            placeholder='Search...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Iconify icon='eva:search-fill' />,
            }}
            sx={{ width: { xs: '100%', md: '15%' } }}
            size='small'
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {color.map((item, index) => (
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: item,
                  }}
                />
                <Typography variant='subtitle2'>{tooltipInfo[index]}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {filteredData?.map(item => (
            <React.Fragment key={item.ScheduleID}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  p: 1,
                  m: 0,
                  backgroundColor: theme => theme.palette.action.hover,
                }}
              >
                <Typography variant='subtitle2'>
                  {dayjs(item.ScheduleStartDate).format(CONFIG.dateTimePatterns.date) +
                    ' - ' +
                    dayjs(item.ScheduleEndDate).format(CONFIG.dateTimePatterns.date)}
                </Typography>
                <Typography variant='subtitle2'>
                  {dayjs(item.ScheduleStartDate).format('dddd') +
                    ' - ' +
                    dayjs(item.ScheduleEndDate).format('dddd')}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'flex-start', md: 'center' },
                  px: 2,
                  gap: 1,
                }}
              >
                <Typography
                  variant='subtitle2'
                  color='textDisabled'
                  width={{ xs: '100%', md: '8%' }}
                >
                  {dayjs(item.ScheduleStartDate).format(CONFIG.dateTimePatterns.time) +
                    ' - ' +
                    dayjs(item.ScheduleEndDate).format(CONFIG.dateTimePatterns.time)}
                </Typography>
                <Tooltip title={tooltipInfo[item?.ColorCode % color.length]}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: color[item?.ColorCode % color.length],
                    }}
                  />
                </Tooltip>
                <Typography
                  variant='body2'
                  width={{ xs: '100%', md: '90%' }}
                  sx={{ backgroundColor: bgColor[item?.ColorCode % bgColor.length], py: 2, pl: 2 }}
                >
                  {item.ScheduleTitle}
                </Typography>
              </Box>
            </React.Fragment>
          ))}
        </Box>
      </MainContent>
    </DashboardContent>
  );
};

export default KeyDate;
