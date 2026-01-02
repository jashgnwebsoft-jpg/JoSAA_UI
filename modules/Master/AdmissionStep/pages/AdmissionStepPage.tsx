import MainContent from '@core/components/MainContent/MainContent';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Box, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSelectAdmissionStepQuery } from '../api/hooks';
import { AdmissionStepListResponse } from '../types';
import { CONFIG } from '@/global-config';
import { useTranslate } from '@minimal/utils/locales';

const AdmissionStepPage = () => {
  const { data } = useSelectAdmissionStepQuery();
  const { t } = useTranslate();

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('AdmissionStep.AdmissionStep.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <MainContent
        breadCrumbsProps={{
          heading: t('AdmissionStep.AdmissionStep.List.Title'),
          links: [{ name: 'Home' }, { name: t('AdmissionStep.AdmissionStep.List.Title') }],
        }}
      >
        <Box m={2}>
          {data?.map((step: AdmissionStepListResponse, index: number) => (
            <Box key={step.AdmissionStepID} mb={2}>
              <Typography variant='h6' fontWeight={600} gutterBottom>
                {index + 1}. {step.AdmissionStepTitle}
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  '& ul': {
                    pl: 3,
                    m: 0,
                    listStyleType: 'disc',
                  },
                  '& li': {
                    mb: 0.8,
                    display: 'list-item',
                  },
                  '& a': {
                    color: 'primary.main',
                    textDecoration: 'none',
                  },
                }}
                dangerouslySetInnerHTML={{ __html: step.AdmissionStepHTML }}
              />

              {index !== data.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
          
        </Box>
      </MainContent>
    </DashboardContent>
  );
};

export default AdmissionStepPage;
