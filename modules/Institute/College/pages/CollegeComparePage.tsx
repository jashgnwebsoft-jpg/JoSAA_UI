import { Helmet } from 'react-helmet-async';
import { Paper, Box, Typography } from '@mui/material';

import { CONFIG } from '@/global-config';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { useTranslate } from '@minimal/utils/locales';

import CollegeCompareDialog from '../view/CollegeCompareDialog';
import CollegeColumn from '../view/CollegeColumn';
import { useCollegeCompareStore } from '../api/store';

const CollegeComparePage = () => {
  const { t } = useTranslate();

  const { requests, open, openDialog, closeDialog, saveRequest, activeIndex } =
    useCollegeCompareStore();

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
        <Box sx={{ width: 240, borderRight: '1px solid', borderColor: 'divider' }}>
          {[
            t('Institute.College.CompareDetails.Label'),
            t('Institute.College.CollegeName.Label'),
            t('Institute.College.TuitionFees.Label'),
            t('Institute.College.NIRFRank.Label'),
            `${t('Institute.College.HigherPackage.Label')} (LPA)`,
            `${t('Institute.College.MedianPackage.Label')} (LPA)`,
            `${t('Institute.College.AveragePackage.Label')} (LPA)`,
            `${t('Institute.College.LowerPackage.Label')} (LPA)`,
            t('Institute.College.LastYearOpenClose.Label'),
          ].map((label, i) => (
            <Box
              key={i}
              sx={{
                height: i === 0 ? 160 : 60,
                display: 'flex',
                alignItems: 'center',
                px: 2,
                fontWeight: 600,
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.neutral',
              }}
            >
              <Typography variant='subtitle1'>{label}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flex: 1 }}>
          {requests.map((req, i) => (
            <CollegeColumn key={i} request={req} onAddClick={() => openDialog(i)} />
          ))}
        </Box>
      </Paper>

      <CollegeCompareDialog
        open={open}
        onClose={closeDialog}
        onSave={saveRequest}
        defaultValues={selectedRequest}
      />
    </DashboardContent>
  );
};

export default CollegeComparePage;
