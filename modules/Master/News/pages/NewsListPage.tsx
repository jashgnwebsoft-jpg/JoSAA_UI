import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import LatestNewsView from '../view/LatestNewsView';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { Card, CardContent, Paper } from '@mui/material';
import { CONFIG } from '@/global-config';
import { useTranslate } from '@minimal/utils/locales';

const NewsListPage = () => {
  const { t } = useTranslate();
  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Master.News.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <SimpleBreadcrumbs
        heading={t('Master.News.List.Title')}
        links={[{ name: 'Home' }, { name: t('Master.News.List.Title') }]}
      />
      <Card sx={{ height: 700, overflowY: 'scroll' }}>
        <CardContent>
          <LatestNewsView />
        </CardContent>
      </Card>
    </DashboardContent>
  );
};

export default NewsListPage;
