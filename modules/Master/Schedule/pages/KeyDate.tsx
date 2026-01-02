import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';

import { CalendarView } from '@core/components/Calendar/view';
import { useSelectKeyDateQuery } from '../api/hooks';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';

const KeyDate = () => {
  const { data, isLoading } = useSelectKeyDateQuery();
  const { t } = useTranslate();

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Master.Schedule.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <SimpleBreadcrumbs
        heading={t('Master.Schedule.List.Title')}
        links={[{ name: 'Home' }, { name: t('Master.Schedule.List.Title') }]}
      />
      <CalendarView events={data} eventsLoading={isLoading} />
    </DashboardContent>
  );
};

export default KeyDate;
