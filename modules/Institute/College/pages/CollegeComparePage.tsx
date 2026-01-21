import { Helmet } from 'react-helmet-async';
import { Paper, Box, Typography } from '@mui/material';

import { CONFIG } from '@/global-config';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { useTranslate } from '@minimal/utils/locales';

import CollegeCompareDialog from '../view/CollegeCompareDialog';
import CollegeColumn from '../view/CollegeColumn';
import { useCollegeCompareStore } from '../api/store';
import { Iconify } from '@minimal/components/iconify';

const CollegeComparePage = () => {
  const { t } = useTranslate();

  const {
    requests,
    open,
    openDialog,
    closeDialog,
    saveRequest,
    defaultFormValues,
    activeIndex,
    saveCollegeDetailsData: saveData,
    saveCollegeRankData: rankData,
    removeDataRequest,
  } = useCollegeCompareStore();

  const selectedRequest = activeIndex !== null ? requests[activeIndex] : null;

  return (
    <DashboardContent>
      <Helmet>
        <title>
          {t('Institute.College.CollegeCompare.Label')} - {CONFIG.appName}
        </title>
      </Helmet>

      <SimpleBreadcrumbs
        heading={t('Institute.College.CollegeCompare.Label')}
        links={[{ name: 'Home' }, { name: t('Institute.College.CollegeCompare.Label') }]}
      />

      <Paper variant='outlined' sx={{ display: 'flex', overflowX: 'auto', mb: 2 }}>
        <Box
          sx={{
            width: { xs: 'auto', md: 240 },
            borderRight: '1px solid',
            borderColor: 'divider',
          }}
        >
          {[
            { label: t('Institute.College.CompareDetails.Label'), icon: 'material-symbols:info' },
            {
              label: t('Institute.College.CollegeName.Label'),
              icon: 'lucide:school',
            },
            { label: t('Institute.College.TuitionFees.Label'), icon: 'eva:credit-card-outline' },
            { label: t('Institute.College.NIRFRank.Label'), icon: 'eva:award-outline' },
            {
              label: `${t('Institute.College.HigherPackage.Label')} (LPA)`,
              icon: 'eva:trending-up-outline',
            },
            {
              label: `${t('Institute.College.MedianPackage.Label')} (LPA)`,
              icon: 'eva:bar-chart-2-outline',
            },
            {
              label: `${t('Institute.College.AveragePackage.Label')} (LPA)`,
              icon: 'eva:activity-outline',
            },
            {
              label: `${t('Institute.College.LowerPackage.Label')} (LPA)`,
              icon: 'eva:trending-down-outline',
            },
            { label: t('Institute.College.LastYearOpenClose.Label'), icon: 'eva:calendar-outline' },
          ].map((item, i) => (
            <Box
              key={i}
              sx={{
                height: i === 0 ? 160 : 60,
                display: 'flex',
                alignItems: 'center',
                width: 240,
                px: 2,
                fontWeight: 600,
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: i % 2 === 0 ? 'grey.100' : 'grey.50',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon={item.icon} width={20} height={20} />
                <Typography variant='subtitle1'>{item.label}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flex: 1 }}>
          {saveData.map((res, index) => (
            <CollegeColumn
              key={index}
              onAddClick={() => openDialog(index)}
              college={res!}
              rankData={rankData[index]!}
              onRemoveData={() => removeDataRequest(index)}
            />
          ))}
        </Box>
      </Paper>

      <CollegeCompareDialog
        open={open}
        onClose={closeDialog}
        onSave={saveRequest}
        defaultValues={defaultFormValues}
        // defaultValues={selectedRequest}
      />
    </DashboardContent>
  );
};

export default CollegeComparePage;
