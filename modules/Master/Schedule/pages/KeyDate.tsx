import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';

import { useSelectKeyDateByYearQuery, useSelectKeyDateQuery } from '../api/hooks';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';
import MainContent from '@core/components/MainContent/MainContent';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Iconify } from '@minimal/components/iconify';
import React, { useEffect, useMemo, useState } from 'react';
import { KeyDateResponse } from '../types';
import { useCurrentYearQuery } from '@modules/Master/AdmissionYear/api/hooks';

const KeyDate = () => {
  const { t } = useTranslate();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { data: admissionYear } = useCurrentYearQuery();
  const [year, setYear] = useState<number>(admissionYear?.AdmissionYear!);

  // const { data } = useSelectKeyDateQuery();
  useEffect(() => {
    setYear(admissionYear?.AdmissionYear!);
  }, [admissionYear?.AdmissionYear!]);

  const { data } = useSelectKeyDateByYearQuery(year, !!year);

  const color = ['#8e33ff', '#003768', '#ffab00', '#00b8d9'];
  const bgColor = ['#F7F2FF', '#D8E1E8', '#FFFAF2', '#EAF9FB'];
  const tooltipInfo = [
    'Choice Filling Result',
    'Registration',
    'Choice Filling',
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
        sx={{ p: 0, boxShadow: 3, borderRadius: 2 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '12%',
              justifyContent: 'center',
            }}
          >
            <IconButton
              onClick={() => {
                setYear(year - 1);
              }}
            >
              <Iconify icon='carbon:chevron-left' />
            </IconButton>
            <Typography variant='h6'>Year {year}</Typography>
            <IconButton
              onClick={() => {
                setYear(year + 1);
              }}
            >
              <Iconify icon='carbon:chevron-right' />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row-reverse' },
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
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                alignItems: { xs: 'flex-start', md: 'center' },
                gap: { xs: 0.5, md: 2 },
              }}
            >
              {color.map((item, index) => (
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
                  key={index}
                >
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
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
          {filteredData?.length === 0 ? (
            <Box
              sx={{
                backgroundColor: theme => theme.palette.action.hover,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='subtitle1'>No Data Found</Typography>
            </Box>
          ) : (
            filteredData?.map(item => (
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
                    flexDirection: 'row',
                    alignItems: { xs: 'flex-start', md: 'center' },
                    px: 2,
                    gap: 1,
                  }}
                >
                  <Typography variant='body2' color='textDisabled' width={{ xs: '50%', md: '8%' }}>
                    {dayjs(item.ScheduleStartDate).format(CONFIG.dateTimePatterns.time) +
                      ' - ' +
                      dayjs(item.ScheduleEndDate).format(CONFIG.dateTimePatterns.time)}
                  </Typography>
                  <Tooltip title={tooltipInfo[item?.ColorCode]}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: color[item?.ColorCode],
                      }}
                    />
                  </Tooltip>
                  <Typography variant='body2' width={{ xs: '40%', md: '90%' }}>
                    {item.ScheduleTitle}
                  </Typography>
                </Box>
              </React.Fragment>
            ))
          )}
        </Box>
      </MainContent>
    </DashboardContent>
  );
};

export default KeyDate;
