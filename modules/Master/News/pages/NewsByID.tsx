import MainContent from '@core/components/MainContent/MainContent';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Box, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useNewsByIDQuery } from '../api/hooks';
import dayjs from 'dayjs';
import { CONFIG } from '@/global-config';
import { useTranslate } from '@minimal/utils/locales';

const NewsByID = () => {
  const { newsID } = useParams();
  const { data } = useNewsByIDQuery(newsID);
  const { t } = useTranslate();

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Master.News.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <MainContent
        breadCrumbsProps={{
          heading: t('Master.News.List.Title'),
          links: [{ name: 'Home' }, { name: t('Master.News.List.Title') }],
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 1 }}>
          <Typography variant='h4'>{data?.NewsTitle}</Typography>
          <Typography>
            {dayjs(data?.FromDate).format(CONFIG.dateTimePatterns.paramCase.date) +
              ' - ' +
              dayjs(data?.ToDate).format(CONFIG.dateTimePatterns.paramCase.date)}
          </Typography>
          <Divider />
          <Typography variant='h5'>Description</Typography>
          <Typography>{data?.Description}</Typography>
          <Typography variant='h5'>Text</Typography>
          <Typography>{data?.NewsText}</Typography>
        </Box>
      </MainContent>
    </DashboardContent>
  );
};
export default NewsByID;
